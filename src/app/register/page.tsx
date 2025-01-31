"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface StarProps {
  x: number;
  y: number;
  size: number;
}

const Star = ({ x, y, size }: StarProps) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.random() * 2, duration: 0.5 }}
    />
  );
};

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stars, setStars] = useState<StarProps[]>([]);

  const generateStars = () => {
    const newStars = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 2,
    }));
    setStars(newStars);
  };

  useEffect(() => {
    generateStars();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, []);

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
        // Resetuj formularz po udanej rejestracji (opcjonalne)
        setEmail("");
        setPassword("");
        setUsername("");
      } else {
        const data = await response.json();
        setError(data.message || "Coś poszło nie tak.");
      }
    } catch (err) {
      console.error("Błąd rejestracji:", err);
      setError("Błąd podczas rejestracji.");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-40 blur-2xl" />
      </motion.div>

      {/* Stars */}
      <div className="absolute inset-0 z-10">
        {stars.map((star, i) => (
          <Star key={i} x={star.x} y={star.y} size={star.size} />
        ))}
      </div>

      {/* Register Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-20 bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
          Rejestracja
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Nazwa użytkownika</label>
            <input
              type="text"
              placeholder="Wpisz nazwę użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">E-mail</label>
            <input
              type="email"
              placeholder="Wpisz swój e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-300">Hasło</label>
            <input
              type="password"
              placeholder="Wpisz swoje hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-pink-600 transition-all"
          >
            Zarejestruj się
          </button>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-4 text-center">{success}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;