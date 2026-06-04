const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export async function registerUser(name, email, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
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

export async function updateProfile(token, name, email) {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
}

export async function getMyOrders(token) {
  const res = await fetch(`${API_BASE}/api/orders/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to load orders");
  }

  return data;
}
