"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);       // { id, name, email } or null
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("aurora_auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setToken(parsed.token || null);
        setUser(parsed.user || null);
      } catch {
        // ignore bad JSON
      }
    }
    setLoading(false);
  }, []);

  function saveAuth(nextToken, nextUser) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "aurora_auth",
        JSON.stringify({ token: nextToken, user: nextUser })
      );
    }
    setToken(nextToken);
    setUser(nextUser);
  }

  function logout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("aurora_auth");
    }
    setToken(null);
    setUser(null);
  }

  return { user, token, loading, saveAuth, logout };
}

