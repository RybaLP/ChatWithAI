"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/chat");
      } else {
        const data = await response.json();
        setError(data.error || "Nieprawidłowe dane logowania.");
      }
    } catch (err) {
      setError("Błąd podczas logowania.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Logowanie</h1>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Hasło</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-black"
            required
          />
        </div>
        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Zaloguj się
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
