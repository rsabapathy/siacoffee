"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://siacoffee.co.uk";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
  try {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      credentials: "include",
    });

    if (res.status === 401) {
      setUser(null);
      return null;
    }

    if (!res.ok) {
      setUser(null);
      return null;
    }

    const data = await res.json();
    setUser(data);
    return data;
  } catch (err) {
    console.error("Auth refresh failed:", err);
    setUser(null);
    return null;
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    setMounted(true);
    refreshUser();
  }, []);

  function saveAuth(_tokenValue, userValue) {
    setUser(userValue);
    setLoading(false);
    setMounted(true);
  }

  async function logout() {
    await fetch(`${API_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setLoading(false);
    setMounted(true);
  }

  return {
    user,
    mounted,
    loading,
    saveAuth,
    logout,
    refreshUser,
  };
}