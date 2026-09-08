"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { C } from "@/lib/app-content/theme";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const afterSignIn = () => router.push("/app");

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!auth) throw new Error();
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (name.trim()) await updateProfile(user, { displayName: name.trim() });
      afterSignIn();
    } catch (err: unknown) {
      setError(friendlyError((err as { code?: string })?.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      if (!auth) throw new Error();
      await signInWithPopup(auth, new GoogleAuthProvider());
      afterSignIn();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code !== "auth/popup-closed-by-user") setError(friendlyError(code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: 34 }}>
          <div style={{ width: 58, height: 58, borderRadius: 16, margin: "0 auto 16px", background: `linear-gradient(135deg, ${C.f1}, ${C.f2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🔥</div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 29, color: C.text, marginBottom: 6 }}>Join FaithSpark</h1>
          <p style={{ fontSize: 15, color: C.muted }}>Start growing deeper in your faith today</p>
        </div>

        <div className="fs-card" style={{ padding: "28px 26px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
            <button onClick={handleGoogle} disabled={loading} className="fs-btn" style={{ width: "100%", padding: "13px 0", fontSize: 15, fontWeight: 600, gap: 9, opacity: loading ? 0.6 : 1 }}>
              <GoogleIcon />
              Continue with Google
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div className="fs-divider" style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: C.dim, fontWeight: 600 }}>OR</span>
            <div className="fs-divider" style={{ flex: 1 }} />
          </div>

          <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <div>
              <label className="fs-label" style={{ marginBottom: 7 }}>Full name</label>
              <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="fs-input" />
            </div>
            <div>
              <label className="fs-label" style={{ marginBottom: 7 }}>Email</label>
              <input id="signup-email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="fs-input" />
            </div>
            <div>
              <label className="fs-label" style={{ marginBottom: 7 }}>Password</label>
              <input id="new-password" name="new-password" type="password" required minLength={6} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" className="fs-input" />
            </div>

            {error && <p style={{ fontSize: 13, color: C.red, textAlign: "center", marginTop: 2 }}>{error}</p>}

            <button type="submit" disabled={loading} className="fs-btn-primary" style={{ width: "100%", marginTop: 4, padding: "15px 0", fontSize: 15 }}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>
        </div>

        <p style={{ fontSize: 14, color: C.muted, textAlign: "center", marginTop: 24 }}>
          Already have an account?{" "}
          <Link href="/app/login" style={{ color: C.f1, fontWeight: 700, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

function friendlyError(code?: string) {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with a different sign-in method.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized. Add it in Firebase Console → Authentication → Settings → Authorized domains.";
    default:
      return "Something went wrong. Please try again.";
  }
}
