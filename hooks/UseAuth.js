"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const stored = window.localStorage.getItem("aurora_auth");

      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || null);
        setToken(parsed.token || null);
      }
    } catch (err) {
      console.error("Failed to load auth:", err);
    }
  }, []);

  function saveAuth(tokenValue, userValue) {
    window.localStorage.setItem(
      "aurora_auth",
      JSON.stringify({
        token: tokenValue,
        user: userValue,
      })
    );

    setToken(tokenValue);
    setUser(userValue);
    setMounted(true);
  }

  function logout() {
    window.localStorage.removeItem("aurora_auth");
    setToken(null);
    setUser(null);
    setMounted(true);
  }

  return {
    user,
    token,
    mounted,
    saveAuth,
    logout,
  };
}
