"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Profile = Record<string, any>;

type ProfileContextValue = {
  profile: Profile | null;
  isLoading: boolean;
  saveProfile: (p: Profile) => Promise<void>;
  updateProfile: (partial: Profile) => Promise<void>;
  clearProfile: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

function profileKey(uid: string | null) {
  return uid ? `faithspark_profile_${uid}` : "faithspark_profile";
}

async function backupToFirestore(uid: string, p: Profile) {
  if (!db) return;
  try {
    const { photo, ...rest } = p;
    void photo;
    await setDoc(doc(db, "users", uid, "profile", "data"), rest, { merge: true });
  } catch {
    // best-effort backup only
  }
}

async function restoreFromFirestore(uid: string): Promise<Profile | null> {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, "users", uid, "profile", "data"));
    if (snap.exists()) return snap.data();
  } catch {
    // best-effort restore only
  }
  return null;
}

function lsGet(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsSet(key: string, val: string) {
  try {
    localStorage.setItem(key, val);
  } catch {
    // ignore
  }
}
function lsRemove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const uidRef = useRef<string | null>(null);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUid = user?.uid ?? null;
      if (newUid === uidRef.current) return;
      uidRef.current = newUid;

      setProfile(null);
      setIsLoading(true);

      try {
        const key = profileKey(newUid);
        let raw = lsGet(key);

        if (!raw && newUid) {
          raw = lsGet("faithspark_profile");
          if (raw) {
            lsSet(key, raw);
            lsRemove("faithspark_profile");
          }
        }

        if (raw) {
          setProfile(JSON.parse(raw));
        } else if (newUid && !user?.isAnonymous) {
          const restored = await restoreFromFirestore(newUid);
          if (restored) {
            setProfile(restored);
            lsSet(key, JSON.stringify(restored));
          }
        }
      } catch {
        // ignore malformed local cache
      }

      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const saveProfile = useCallback(async (p: Profile) => {
    setProfile(p);
    const key = profileKey(uidRef.current);
    lsSet(key, JSON.stringify(p));
    if (uidRef.current) backupToFirestore(uidRef.current, p);
  }, []);

  const updateProfile = useCallback(async (partial: Profile) => {
    setProfile((prev) => {
      const updated = { ...(prev ?? {}), ...partial };
      const key = profileKey(uidRef.current);
      lsSet(key, JSON.stringify(updated));
      if (uidRef.current) backupToFirestore(uidRef.current, updated);
      return updated;
    });
  }, []);

  const clearProfile = useCallback(async () => {
    setProfile(null);
    const key = profileKey(uidRef.current);
    lsRemove(key);
    lsRemove("faithspark_profile");
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, saveProfile, updateProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
