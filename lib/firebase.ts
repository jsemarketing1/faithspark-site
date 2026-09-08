import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let auth: Auth | undefined;

// Only initialize in the browser, and only with a real config. Next.js
// still executes "use client" component code once on the server to
// produce the prerendered HTML, and getAuth() throws synchronously
// whenever the config is missing/invalid — uncaught, that crashes the
// build server-side and crashes React hydration client-side, breaking
// the whole page rather than just the Google sign-in button.
if (typeof window !== "undefined" && firebaseConfig.apiKey) {
  try {
    const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (e) {
    console.error("[firebase] Failed to initialize:", e);
  }
}

export { auth };
