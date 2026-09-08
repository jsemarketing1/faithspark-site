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

// Only initialize in the browser. Next.js still executes "use client"
// component code once on the server to produce the prerendered HTML, and
// getAuth() throws immediately when the config is missing/invalid — which
// would otherwise take down every statically-generated page's build.
if (typeof window !== "undefined") {
  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { auth };
