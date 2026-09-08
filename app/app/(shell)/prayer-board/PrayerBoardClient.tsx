"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addDoc, collection, deleteDoc, doc, getDocs,
  increment, onSnapshot, orderBy, query, serverTimestamp,
  updateDoc, where, limit, type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { C } from "@/lib/app-content/theme";
import { LOCAL_SEED_PRAYERS, LOCAL_SEED_COMMENTS, LOCAL_SEED_REACTIONS } from "@/lib/app-content/prayerSeed";

const PRAYER_CATS = ["All", "Health", "Family", "Marriage", "Financial", "Strength", "Grief", "Work", "Salvation", "Praise", "General"];
const CAT_COLORS: Record<string, string> = { Health: "#E05252", Family: "#4A9EE8", Marriage: "#E85CA0", Financial: "#2BAD6E", Strength: "#D4A017", Grief: "#8B7ED8", Work: "#F47820", Salvation: "#1A7CC1", Praise: "#E6A817", General: "#7A8A9A", All: "#7A8A9A" };
const REACT_ICONS: Record<string, string> = { pray: "🙏", love: "❤️", strong: "💪" };

function lsGet(k: string) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

function timeAgo(ts?: Timestamp | null) {
  if (!ts) return "just now";
  const date = ts.toDate ? ts.toDate() : new Date();
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function getInitial(name?: string) { return (name ?? "A").trim().charAt(0).toUpperCase(); }
function avatarColor(name?: string) {
  const colors = ["#E05252", "#4A9EE8", "#2BAD6E", "#D4A017", "#8B7ED8", "#F47820", "#1A7CC1", "#E85CA0"];
  let h = 0;
  for (const c of name || "A") h = c.charCodeAt(0) + ((h << 5) - h);
  return colors[Math.abs(h) % colors.length];
}

function Avatar({ name, size = 40, fontSize = 16 }: { name?: string; size?: number; fontSize?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: avatarColor(name), color: "#fff", fontWeight: 700, fontSize }}>
      {getInitial(name)}
    </div>
  );
}

type Prayer = {
  id: string; uid?: string; userId?: string; name: string; anonymous?: boolean; text: string; cat: string;
  pray: number; love: number; strong: number; createdAt: Timestamp | null; _timeLabel?: string; _isSeed?: boolean;
};
type Comment = { id: string; author: string; text: string; createdAt: Timestamp | null; _timeLabel?: string };
type Group = { id: string; name: string; description?: string; inviteCode?: string; memberCount?: number; emoji?: string };

function seedToPrayer(seed: (typeof LOCAL_SEED_PRAYERS)[number]): Prayer {
  const rxn = LOCAL_SEED_REACTIONS[Number(seed.id)] ?? { pray: 0, love: 0, strong: 0 };
  return {
    id: String(seed.id), uid: "seed", userId: "seed",
    name: seed.anonymous ? "Anonymous" : seed.name, anonymous: seed.anonymous ?? false,
    text: seed.text, cat: seed.cat ?? "General",
    pray: rxn.pray ?? seed.hearts ?? 0, love: rxn.love ?? 0, strong: rxn.strong ?? 0,
    createdAt: null, _timeLabel: seed.time, _isSeed: true,
  };
}
const SEED_PRAYERS = LOCAL_SEED_PRAYERS.map(seedToPrayer);

export default function PrayerBoardClient() {
  const router = useRouter();
  const { user, uid } = useAuth();
  const { profile } = useProfile();
  const displayName = profile?.firstName || profile?.name || user?.displayName || "Friend";

  const [tab, setTab] = useState<"community" | "my-prayers" | "groups">("community");
  const [filter, setFilter] = useState("All");
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  const [composerOpen, setComposerOpen] = useState(false);
  const [composerText, setComposerText] = useState("");
  const [composerCat, setComposerCat] = useState("General");
  const [anonymous, setAnonymous] = useState(false);
  const [posting, setPosting] = useState(false);

  const [myReactions, setMyReactions] = useState<Record<string, boolean>>({});

  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const [groups, setGroups] = useState<Group[]>([]);
  const [myGroupIds, setMyGroupIds] = useState<string[]>([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joiningGroup, setJoiningGroup] = useState(false);

  useEffect(() => {
    const raw = lsGet("faithspark_my_reactions");
    if (raw) try { setMyReactions(JSON.parse(raw)); } catch { /* ignore */ }
    const raw2 = lsGet("faithspark_joined_group_ids");
    if (raw2) try { setMyGroupIds(JSON.parse(raw2)); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!db) return;
    setLoading(true);
    const q = query(collection(db, "prayerRequests"), orderBy("createdAt", "desc"), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      const loaded = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Prayer));
      setPrayers([...loaded, ...SEED_PRAYERS]);
      setLoading(false);
    }, () => { setPrayers(SEED_PRAYERS); setLoading(false); });
    return unsub;
  }, []);

  useEffect(() => {
    if (!db) return;
    getDocs(collection(db, "prayerGroups")).then((snap) => setGroups(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Group)))).catch(() => {});
  }, []);

  const requireSignIn = () => {
    alert("Please sign in to post a prayer request.");
    router.push("/app/login");
    return false;
  };

  const openComposer = () => {
    if (!uid || !user) { requireSignIn(); return; }
    setComposerOpen(true);
  };

  const postPrayer = async () => {
    const text = composerText.trim();
    if (!text || posting || !db) return;
    if (!uid || !user) { requireSignIn(); return; }
    setPosting(true);
    try {
      await addDoc(collection(db, "prayerRequests"), {
        uid: user.uid, userId: user.uid,
        name: anonymous ? "Anonymous" : displayName,
        anonymous, text, cat: composerCat,
        pray: 0, love: 0, strong: 0,
        createdAt: serverTimestamp(), createdBy: user.uid,
      });
      setComposerText(""); setComposerOpen(false);
    } catch {
      alert("Could not post your prayer. Please try again.");
    }
    setPosting(false);
  };

  const react = async (prayerId: string, type: "pray" | "love" | "strong") => {
    if (!db || prayers.find((p) => p.id === prayerId)?._isSeed) return;
    const key = `${prayerId}_${type}`;
    const already = myReactions[key];
    const updated = { ...myReactions };
    if (already) delete updated[key]; else updated[key] = true;
    setMyReactions(updated);
    lsSet("faithspark_my_reactions", JSON.stringify(updated));
    try { await updateDoc(doc(db, "prayerRequests", prayerId), { [type]: increment(already ? -1 : 1) }); } catch { /* ignore */ }
  };

  const loadComments = async (id: string) => {
    const seedList = LOCAL_SEED_COMMENTS[id];
    if (seedList?.length) {
      setComments((prev) => ({ ...prev, [id]: seedList.map((c) => ({ id: c.id, author: c.author, text: c.text, createdAt: null, _timeLabel: c.time })) }));
      return;
    }
    if (!db) return;
    const snap = await getDocs(query(collection(db, "prayerRequests", id, "comments"), orderBy("createdAt", "asc")));
    setComments((prev) => ({ ...prev, [id]: snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment)) }));
  };

  const toggleComments = (id: string) => {
    const next = !expandedComments[id];
    setExpandedComments((prev) => ({ ...prev, [id]: next }));
    if (next && !comments[id]) loadComments(id);
  };

  const postComment = async (id: string) => {
    const text = (commentInputs[id] ?? "").trim();
    if (!text || !db) return;
    if (!uid || !user) { requireSignIn(); return; }
    if (prayers.find((p) => p.id === id)?._isSeed) return;
    await addDoc(collection(db, "prayerRequests", id, "comments"), { author: displayName, text, userId: user.uid, createdAt: serverTimestamp() });
    setCommentInputs((prev) => ({ ...prev, [id]: "" }));
    loadComments(id);
  };

  const deletePost = async (id: string) => {
    if (!db || prayers.find((p) => p.id === id)?._isSeed) return;
    if (!window.confirm("Delete this prayer request?")) return;
    await deleteDoc(doc(db, "prayerRequests", id));
  };

  const createGroup = async () => {
    if (!newGroupName.trim() || creatingGroup || !db) return;
    setCreatingGroup(true);
    const code = Math.random().toString(36).slice(2, 8).toUpperCase();
    const ref = await addDoc(collection(db, "prayerGroups"), {
      name: newGroupName.trim(), description: newGroupDesc.trim(),
      createdBy: user?.uid, inviteCode: code, memberCount: 1, emoji: "🙏", createdAt: serverTimestamp(),
    });
    const newGroup: Group = { id: ref.id, name: newGroupName.trim(), description: newGroupDesc.trim(), inviteCode: code, memberCount: 1, emoji: "🙏" };
    setGroups((prev) => [...prev, newGroup]);
    const joined = [...myGroupIds, ref.id];
    setMyGroupIds(joined); lsSet("faithspark_joined_group_ids", JSON.stringify(joined));
    setNewGroupName(""); setNewGroupDesc(""); setShowCreateGroup(false); setCreatingGroup(false);
  };

  const joinGroup = async () => {
    const code = joinCode.trim().toUpperCase();
    if (!code || !db) return;
    setJoiningGroup(true);
    const snap = await getDocs(query(collection(db, "prayerGroups"), where("inviteCode", "==", code)));
    if (snap.empty) { alert("Group not found. Check the invite code."); setJoiningGroup(false); return; }
    const grp = { id: snap.docs[0].id, ...snap.docs[0].data() } as Group;
    if (!myGroupIds.includes(grp.id)) {
      const joined = [...myGroupIds, grp.id];
      setMyGroupIds(joined); lsSet("faithspark_joined_group_ids", JSON.stringify(joined));
      if (!groups.find((g) => g.id === grp.id)) setGroups((prev) => [...prev, grp]);
    }
    setJoinCode(""); setJoiningGroup(false);
  };

  const leaveGroup = (id: string) => {
    const updated = myGroupIds.filter((x) => x !== id);
    setMyGroupIds(updated); lsSet("faithspark_joined_group_ids", JSON.stringify(updated));
  };

  const filtered = filter === "All" ? prayers : prayers.filter((p) => p.cat === filter);
  const myPrayers = prayers.filter((p) => p.uid === user?.uid || p.userId === user?.uid);
  const myGroups = groups.filter((g) => myGroupIds.includes(g.id));
  const discoverGroups = groups.filter((g) => !myGroupIds.includes(g.id));

  return (
    <div style={{ minHeight: "100%", backgroundColor: C.bg }}>
      <div className="fs-app-hero" style={{ height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, color: "#fff", margin: "0 0 4px" }}>Prayer Board</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.88)", margin: 0 }}>Lift each other up in prayer</p>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
          {([
            { key: "community", label: "🌍 Community" },
            { key: "my-prayers", label: "🙏 My Prayers" },
            { key: "groups", label: "👥 My Groups" },
          ] as const).map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ flex: 1, padding: "12px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", background: "none", border: "none", borderBottom: tab === t.key ? `2px solid ${C.f1}` : "2px solid transparent", color: tab === t.key ? C.f1 : C.muted, marginBottom: -1 }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: "14px 16px 60px" }}>
          {tab === "community" && (
            <>
              <div style={{ backgroundColor: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: 14, marginBottom: 14 }}>
                {!composerOpen ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={openComposer}>
                    <Avatar name={displayName} size={38} fontSize={15} />
                    <div style={{ flex: 1, backgroundColor: C.hi, borderRadius: 20, padding: "10px 16px", fontSize: 14, color: C.dim }}>Share a prayer request…</div>
                  </div>
                ) : (
                  <>
                    <textarea value={composerText} onChange={(e) => setComposerText(e.target.value)} placeholder="Share a prayer request with the community…" autoFocus rows={4} style={{ width: "100%", backgroundColor: C.hi, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: 12, color: C.text, fontSize: 14, outline: "none", resize: "none", marginBottom: 10, boxSizing: "border-box", lineHeight: 1.6 }} />
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                      {PRAYER_CATS.filter((c) => c !== "All").map((c) => (
                        <button key={c} onClick={() => setComposerCat(c)} style={{ padding: "4px 12px", borderRadius: 16, fontSize: 12, fontWeight: 700, cursor: "pointer", backgroundColor: composerCat === c ? CAT_COLORS[c] + "22" : C.hi, border: `1.5px solid ${composerCat === c ? CAT_COLORS[c] : C.border}`, color: composerCat === c ? CAT_COLORS[c] : C.muted }}>{c}</button>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                        <div onClick={() => setAnonymous(!anonymous)} style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${C.border}`, backgroundColor: anonymous ? C.f1 : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {anonymous && <span style={{ color: "#fff", fontSize: 11 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 13, color: C.muted }}>Post anonymously</span>
                      </label>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setComposerOpen(false)} style={{ padding: "7px 14px", borderRadius: 20, border: `1.5px solid ${C.border}`, color: C.muted, fontSize: 13, cursor: "pointer", background: "none" }}>Cancel</button>
                        <button onClick={postPrayer} disabled={!composerText.trim() || posting} style={{ padding: "7px 18px", borderRadius: 20, background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, fontWeight: 700, fontSize: 13, cursor: "pointer", border: "none", opacity: composerText.trim() ? 1 : 0.5 }}>{posting ? "…" : "Post"}</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 12, WebkitOverflowScrolling: "touch" }}>
                {PRAYER_CATS.map((c) => (
                  <button key={c} onClick={() => setFilter(c)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0, backgroundColor: filter === c ? (CAT_COLORS[c] || C.f1) : C.surface, border: `1.5px solid ${filter === c ? "transparent" : C.border}`, color: filter === c ? "#fff" : C.muted }}>{c}</button>
                ))}
              </div>

              {loading && <div style={{ display: "flex", justifyContent: "center", padding: 32 }}><div style={{ width: 24, height: 24, border: `3px solid ${C.f1}`, borderTopColor: "transparent", borderRadius: 12, animation: "prayspin 0.8s linear infinite" }} /><style>{`@keyframes prayspin{to{transform:rotate(360deg)}}`}</style></div>}

              {filtered.map((p) => (
                <PrayerCard key={p.id} prayer={p} userId={user?.uid} myReactions={myReactions} onReact={react} onDelete={deletePost}
                  commentsExpanded={!!expandedComments[p.id]} onToggleComments={toggleComments} commentsList={comments[p.id] ?? []}
                  commentInput={commentInputs[p.id] ?? ""} onCommentChange={(id, val) => setCommentInputs((prev) => ({ ...prev, [id]: val }))}
                  onPostComment={postComment} />
              ))}
            </>
          )}

          {tab === "my-prayers" && (
            <>
              {myPrayers.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 48 }}>
                  <p style={{ fontSize: 40, margin: "0 0 12px" }}>🙏</p>
                  <p style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: C.text, margin: "0 0 6px" }}>No prayer requests yet</p>
                  <p style={{ fontSize: 13, color: C.muted, margin: "0 0 20px" }}>Post a request to the community board</p>
                  <button onClick={() => { setTab("community"); setComposerOpen(true); }} className="fs-btn-primary">Share a Prayer Request</button>
                </div>
              ) : myPrayers.map((p) => (
                <PrayerCard key={p.id} prayer={p} userId={user?.uid} myReactions={myReactions} onReact={react} onDelete={deletePost}
                  commentsExpanded={!!expandedComments[p.id]} onToggleComments={toggleComments} commentsList={comments[p.id] ?? []}
                  commentInput={commentInputs[p.id] ?? ""} onCommentChange={(id, val) => setCommentInputs((prev) => ({ ...prev, [id]: val }))}
                  onPostComment={postComment} />
              ))}
            </>
          )}

          {tab === "groups" && (
            <div>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <button onClick={() => setShowCreateGroup(true)} className="fs-btn-primary" style={{ flex: 1 }}>＋ Create Group</button>
                <div style={{ flex: 1, display: "flex", gap: 6 }}>
                  <input value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} placeholder="Enter invite code" style={{ flex: 1, backgroundColor: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", color: C.text, fontSize: 13, outline: "none" }} />
                  <button onClick={joinGroup} disabled={!joinCode.trim() || joiningGroup} style={{ padding: "10px 14px", borderRadius: 12, backgroundColor: C.surface, border: `1.5px solid ${C.border}`, color: C.f1, fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0 }}>Join</button>
                </div>
              </div>

              {myGroups.length > 0 && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, margin: "0 0 10px" }}>My Groups</p>
                  {myGroups.map((g) => <GroupCard key={g.id} group={g} joined onLeave={() => leaveGroup(g.id)} />)}
                </>
              )}

              {discoverGroups.length > 0 && (
                <>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.2, margin: "16px 0 10px" }}>Discover Groups</p>
                  {discoverGroups.map((g) => (
                    <GroupCard key={g.id} group={g} joined={false} onJoin={() => {
                      const updated = [...myGroupIds, g.id];
                      setMyGroupIds(updated); lsSet("faithspark_joined_group_ids", JSON.stringify(updated));
                    }} />
                  ))}
                </>
              )}

              {groups.length === 0 && (
                <div style={{ textAlign: "center", paddingTop: 40 }}>
                  <p style={{ fontSize: 36, margin: "0 0 12px" }}>👥</p>
                  <p style={{ fontFamily: "Playfair Display, serif", fontSize: 18, color: C.text, margin: "0 0 6px" }}>No groups yet</p>
                  <p style={{ fontSize: 13, color: C.muted }}>Create a group and invite your family or friends to pray together</p>
                </div>
              )}

              {showCreateGroup && (
                <div style={{ position: "fixed", inset: 0, zIndex: 50, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={() => setShowCreateGroup(false)}>
                  <div style={{ width: "100%", maxWidth: 560, backgroundColor: C.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: "24px 24px 40px" }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: C.border, margin: "0 auto 20px" }} />
                    <p style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: C.text, margin: "0 0 6px" }}>Create a Prayer Group</p>
                    <p style={{ fontSize: 14, color: C.muted, margin: "0 0 24px" }}>Invite family or friends with a code</p>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Group Name</label>
                    <input value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="e.g. Smith Family Prayer Group" style={{ width: "100%", backgroundColor: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "13px 16px", color: C.text, fontSize: 15, outline: "none", marginBottom: 16, boxSizing: "border-box" }} />
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>Description (optional)</label>
                    <textarea value={newGroupDesc} onChange={(e) => setNewGroupDesc(e.target.value)} placeholder="What is this group about?" rows={3} style={{ width: "100%", backgroundColor: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "13px 16px", color: C.text, fontSize: 14, outline: "none", marginBottom: 24, boxSizing: "border-box", resize: "none", lineHeight: 1.5 }} />
                    <button onClick={createGroup} disabled={!newGroupName.trim() || creatingGroup} className="fs-btn-primary" style={{ width: "100%" }}>{creatingGroup ? "Creating…" : "Create Group"}</button>
                    <button onClick={() => setShowCreateGroup(false)} style={{ width: "100%", padding: "12px 0", background: "none", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PrayerCard({ prayer, userId, myReactions, onReact, onDelete, commentsExpanded, onToggleComments, commentsList, commentInput, onCommentChange, onPostComment }: {
  prayer: Prayer; userId?: string; myReactions: Record<string, boolean>;
  onReact: (id: string, type: "pray" | "love" | "strong") => void; onDelete: (id: string) => void;
  commentsExpanded: boolean; onToggleComments: (id: string) => void; commentsList: Comment[];
  commentInput: string; onCommentChange: (id: string, val: string) => void; onPostComment: (id: string) => void;
}) {
  const [showFull, setShowFull] = useState(false);
  const catColor = CAT_COLORS[prayer.cat] || "#7A8A9A";
  const isLong = (prayer.text?.length ?? 0) > 220;
  const isSeed = prayer._isSeed;
  const isOwner = !isSeed && userId && (prayer.uid === userId || prayer.userId === userId);
  const posterName = prayer.name || (prayer.anonymous ? "Anonymous" : "Friend");

  return (
    <div style={{ backgroundColor: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: "14px 16px", marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
        <Avatar name={posterName} size={40} fontSize={16} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{posterName}</span>
            <span style={{ backgroundColor: catColor, borderRadius: 8, padding: "2px 8px", fontSize: 11, fontWeight: 700, color: "#fff" }}>{prayer.cat}</span>
          </div>
          <p style={{ fontSize: 11, color: C.dim, margin: "2px 0 0" }}>{prayer._timeLabel || timeAgo(prayer.createdAt)}</p>
        </div>
        {isOwner && <button onClick={() => onDelete(prayer.id)} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 13, flexShrink: 0, padding: "0 4px" }}>✕</button>}
      </div>

      <p style={{ fontSize: 14, color: C.text, lineHeight: 1.65, margin: "0 0 6px" }}>{showFull || !isLong ? prayer.text : prayer.text.slice(0, 220) + "…"}</p>
      {isLong && <button onClick={() => setShowFull(!showFull)} style={{ background: "none", border: "none", color: C.f1, fontWeight: 700, fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 8 }}>{showFull ? "Show less" : "Read more"}</button>}

      <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 10, borderTop: `1px solid ${C.border}`, flexWrap: "wrap" }}>
        {(["pray", "love", "strong"] as const).map((type) => {
          const key = `${prayer.id}_${type}`;
          const active = myReactions[key];
          const count = prayer[type] ?? 0;
          return (
            <button key={type} onClick={() => onReact(prayer.id, type)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, height: 30, border: `1.5px solid ${active ? "transparent" : C.border}`, background: active ? `linear-gradient(135deg, ${C.f1}, ${C.f2})` : C.hi, color: active ? "#fff" : C.muted, fontWeight: 700, fontSize: 12, cursor: "pointer", flexShrink: 0 }}>
              <span style={{ fontSize: 12, lineHeight: 1 }}>{REACT_ICONS[type]}</span>
              {count > 0 && <span>{count}</span>}
            </button>
          );
        })}
        <button onClick={() => onToggleComments(prayer.id)} style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", padding: "5px 10px", borderRadius: 20, height: 30, border: `1.5px solid ${C.border}`, background: C.hi, color: C.muted, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
          <span style={{ fontSize: 12, lineHeight: 1 }}>💬</span>
          <span>{commentsList.length > 0 ? commentsList.length : "Pray"}</span>
        </button>
      </div>

      {commentsExpanded && (
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.border}` }}>
          {commentsList.length === 0 && <p style={{ fontSize: 12, color: C.dim, fontStyle: "italic", margin: "0 0 10px" }}>Be the first to encourage!</p>}
          {commentsList.map((c) => (
            <div key={c.id} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <Avatar name={c.author || "A"} size={26} fontSize={11} />
              <div style={{ flex: 1, backgroundColor: C.hi, borderRadius: 12, padding: "8px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: C.text }}>{c.author}</span>
                  <span style={{ fontSize: 10, color: C.dim }}>{c._timeLabel || timeAgo(c.createdAt)}</span>
                </div>
                <p style={{ fontSize: 13, color: C.text, margin: 0, lineHeight: 1.5 }}>{c.text}</p>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <input type="text" value={commentInput} onChange={(e) => onCommentChange(prayer.id, e.target.value)} onKeyDown={(e) => e.key === "Enter" && onPostComment(prayer.id)} placeholder="Add a comment…" style={{ flex: 1, backgroundColor: C.hi, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: "8px 14px", fontSize: 13, color: C.text, outline: "none" }} />
            <button onClick={() => onPostComment(prayer.id)} disabled={!commentInput.trim()} style={{ padding: "8px 16px", borderRadius: 20, background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, fontWeight: 700, fontSize: 12, cursor: "pointer", border: "none", opacity: commentInput.trim() ? 1 : 0.5 }}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GroupCard({ group, joined, onJoin, onLeave }: { group: Group; joined: boolean; onJoin?: () => void; onLeave?: () => void }) {
  return (
    <div style={{ backgroundColor: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: 16, marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: C.hi2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{group.emoji || "🙏"}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{group.name}</span>
            {joined && <span style={{ fontSize: 10, fontWeight: 700, backgroundColor: C.f1 + "22", color: C.f1, borderRadius: 8, padding: "2px 7px" }}>JOINED</span>}
          </div>
          {!!group.memberCount && <p style={{ fontSize: 12, color: C.muted, margin: "0 0 4px" }}>{group.memberCount} member{group.memberCount !== 1 ? "s" : ""}</p>}
          {group.description && <p style={{ fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5 }}>{group.description}</p>}
          {group.inviteCode && <p style={{ fontSize: 11, color: C.dim, margin: "6px 0 0", fontFamily: "monospace" }}>Invite code: <strong>{group.inviteCode}</strong></p>}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
        {joined
          ? <button onClick={onLeave} style={{ padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${C.border}`, color: C.muted, fontSize: 12, fontWeight: 700, cursor: "pointer", background: "none" }}>Leave</button>
          : <button onClick={onJoin} style={{ padding: "7px 16px", borderRadius: 20, background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, color: C.onPrimary, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none" }}>Join</button>}
      </div>
    </div>
  );
}
