"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminLogin from "@/components/AdminLogin";
import AdminEditor from "@/components/AdminEditor";

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
