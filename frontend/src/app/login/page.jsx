"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [role, setRole] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const response = await fetch(`http://127.0.0.1:8000/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username, password }),
    });
    const data = await response.json();
    setToken(data.access_token);
    setRefreshToken(data.refresh_token);
    setRole(data.role);
    console.log(data);
    if (data.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  }

  async function handleRefresh() {
    const response = await fetch("http://127.0.0.1:8000/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });
    const data = response.json();
    setToken(data.access_token);
    console.log("New Access Token: ", data.access_token);
  }
  return (
    <div>
      <div>
        <h1>Authentication</h1>
        <input
          type="text"
          placeholder="User name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRefresh}>Refresh</button>
      <p>
        Access token: <span>{token}</span>
      </p>
    </div>
  );
}
