"use client";

import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      if (response.ok) {
        setSuccess("Rejestracja zakończona sukcesem! Możesz się teraz zalogować.");
      } else {
        const data = await response.json();
        console.log("Server response:", data);
        setError(data.message || "Coś poszło nie tak.");
      }
    } catch (err) {
      setError("Błąd podczas rejestracji.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Rejestracja</h1>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nazwa użytkownika</label>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded bg-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Hasło</label>
          <input
            placeholder="podaj haslo (jebac jaslo)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-black"
            required
          />
        </div>
        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Zarejestruj się
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
