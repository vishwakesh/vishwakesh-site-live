"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminLogin from "@/components/AdminLogin";
import AdminEditor from "@/components/AdminEditor";

// Prevent Next.js from trying to statically pre-render this page at build
// time — Firebase Auth only makes sense in the browser, and initializing it
// during the build (with env vars that may not be present in that context)
// throws `auth/invalid-api-key` and fails the whole deployment.
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const [user, setUser] = useState(undefined); // undefined = loading, null = logged out

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (user === undefined) {
    return <p className="px-6 py-20 text-center text-inksoft">Checking login…</p>;
  }

  if (!user) {
    return <AdminLogin onLoggedIn={() => {}} />;
  }

  return <AdminEditor onLogout={() => signOut(auth)} />;
}
