const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://admin.siacoffee.co.uk/";

export async function registerUser(name, email, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    let data = {};
    try {
      data = await res.json();
    } catch {
      // ignore
    }
    throw new Error(data.message || "Registration failed");
  }

  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let data = {};
    try {
      data = await res.json();
    } catch {
      // ignore
    }
    throw new Error(data.message || "Login failed");
  }

  return res.json();
}
