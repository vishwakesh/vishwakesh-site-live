"use client";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function DebugPage() {
  const [result, setResult] = useState("Checking…");

  useEffect(() => {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    const missing = Object.entries(config)
      .filter(([, v]) => !v)
      .map(([k]) => k);

    let firebaseError = null;
    try {
      // Only attempt this in the browser, mirroring lib/firebase.js
      const { initializeApp } = require("firebase/app");
      const { getAuth } = require("firebase/auth");
      const app = initializeApp(config, "debug-check");
      getAuth(app);
    } catch (e) {
      firebaseError = e.message;
    }

    setResult(
      JSON.stringify(
        {
          missingEnvVars: missing.length ? missing : "none — all six are present",
          apiKeyPreview: config.apiKey ? config.apiKey.slice(0, 8) + "…" : "MISSING",
          authDomain: config.authDomain || "MISSING",
          projectId: config.projectId || "MISSING",
          firebaseInitError: firebaseError || "none — Firebase initialized fine"
        },
        null,
        2
      )
    );
  }, []);

  return (
    <pre style={{ padding: 24, whiteSpace: "pre-wrap", fontSize: 13 }}>{result}</pre>
  );
}
