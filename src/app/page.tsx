"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";


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

export default function LandingPage() {
  const router = useRouter();
  const [stars, setStars] = useState<StarProps[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const generateStars = () => {
    const newStars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 2, // Większe gwiazdy
    }));
    setStars(newStars);
  };

  useEffect(() => {
    generateStars();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, []);

  return (
    <>
      <main className="relative h-[80vh] flex flex-col items-center justify-center bg-black overflow-hidden">
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
        <div className="absolute inset-0 z-10" ref={containerRef}>
          {stars.map((star, i) => (
            <Star key={i} x={star.x} y={star.y} size={star.size} />
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-20 text-center text-white"
        >
          <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            COSMIC AI
          </h1>
          <p className="text-2xl md:text-3xl mb-8">Supercharge your creativity and productivity</p>
          <div className="flex gap-6">
            <motion.button
              whileHover={{ scale: 1.2, boxShadow: "0 0 12px rgba(0, 0, 0, 0.4)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/login")}
              className="px-8 py-4 text-xl bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2, boxShadow: "0 0 12px rgba(0, 0, 0, 0.4)" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={() => router.push("/register")}
              className="px-8 py-4 text-xl bg-purple-500 text-white rounded-xl hover:bg-purple-600"
            >
              Register
            </motion.button>
          </div>
        </motion.div>
      </main>
      <article
        ref={sectionRef}
        className=" bg-black text-white flex flex-col md:flex-row items-center justify-center"
      >
        {/* Tekst po lewej stronie */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 max-w-2xl"
        >
          <h3 className="text-4xl pt-10 md:text-5xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            Jaki model AI?
          </h3>
          <p className="text-lg md:text-xl mb-4">
            Korzystam z modelu <strong>Groq</strong>, który jest jednym z najszybszych i najbardziej
            wydajnych modeli AI dostępnych obecnie na rynku. Dzięki niemu mogę zapewnić Ci
            niesamowitą szybkość i precyzję w generowaniu treści.
          </p>
          <p className="text-lg md:text-xl">
            Groq to przyszłość sztucznej inteligencji, łącząca zaawansowane algorytmy z
            niezwykłą łatwością integracji.
          </p>
        </motion.div>

        {/* Zdjęcie po prawej stronie */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-1 max-w-2xl"
        >
          <img
             src={'/groq.jpg'}
            alt="Groq AI"
            className="rounded-xl shadow-2xl mt-10 ml-5"
          />
        </motion.div>
      </article>
            {/* Sekcja "Dlaczego Cosmic AI?" */}
            <article
        className="min-h-screen bg-black text-white p-8 flex flex-col md:flex-row items-center justify-center gap-8"
      >
        {/* Miejsce na zdjęcie po lewej stronie */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 max-w-2xl"
        >
          <img
            src="./assets/cosmic-ai.jpg" // Tutaj wstaw ścieżkę do zdjęcia Cosmic AI
            alt="Cosmic AI"
            className="rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* Tekst po prawej stronie */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 max-w-2xl"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            Dlaczego Cosmic AI?
          </h3>
          <p className="text-lg md:text-xl mb-4">
            <strong>Cosmic AI</strong> to narzędzie, które łączy w sobie niesamowitą szybkość, niezawodność i intuicyjność.
            Dzięki zaawansowanym algorytmom i optymalizacji, Cosmic AI zapewnia:
          </p>
          <ul className="list-disc list-inside text-lg md:text-xl mb-4">
            <li><strong>Niezawodność</strong> – zawsze dostępny i gotowy do działania.</li>
            <li><strong>Szybkość</strong> – generowanie wyników w czasie rzeczywistym.</li>
            <li><strong>Precyzję</strong> – dokładne i spersonalizowane odpowiedzi.</li>
            <li><strong>Łatwość użycia</strong> – intuicyjny interfejs dostosowany do Twoich potrzeb.</li>
          </ul>
          <p className="text-lg md:text-xl">
            Cosmic AI to nie tylko narzędzie, to Twoja przewaga w świecie technologii.
          </p>
        </motion.div>
      </article>
            {/* Sekcja "Użyte technologie" */}
            <article
        className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            Użyte technologie
          </h3>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Wykorzystujemy najnowocześniejsze technologie, które zapewniają szybkość, wydajność i niezawodność. Oto narzędzia, które napędzają Cosmic AI:
          </p>
        </motion.div>

        {/* Grid z technologiami */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full"
        >
          {/* Next.js */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src="./assets/nextjs.png" // Wstaw ścieżkę do zdjęcia Next.js
              alt="Next.js"
              className="w-24 h-24 mb-4"
            />
            <h4 className="text-2xl font-bold mb-2">Next.js</h4>
            <p className="text-lg">
              Next.js to framework React, który zapewnia szybkie renderowanie stron, optymalizację SEO oraz wsparcie dla SSR i statycznych stron.
            </p>
          </div>

          {/* TypeScript */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src="./assets/typescript.png" // Wstaw ścieżkę do zdjęcia TypeScript
              alt="TypeScript"
              className="w-24 h-24 mb-4"
            />
            <h4 className="text-2xl font-bold mb-2">TypeScript</h4>
            <p className="text-lg">
              TypeScript dodaje typowanie do JavaScript, co zwiększa bezpieczeństwo kodu i ułatwia pracę w większych projektach.
            </p>
          </div>

          {/* MongoDB */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src={'/groq.jpg'}
              alt="MongoDB"
              className="w-24 h-24 mb-4"
            />
            <h4 className="text-2xl font-bold mb-2">MongoDB</h4>
            <p className="text-lg">
              MongoDB to baza danych NoSQL, która zapewnia elastyczność i skalowalność, idealna do przechowywania dużych ilości danych.
            </p>
          </div>

          {/* JWT */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src="./assets/jwt.png" // Wstaw ścieżkę do zdjęcia JWT
              alt="JWT"
              className="w-24 h-24 mb-4"
            />
            <h4 className="text-2xl font-bold mb-2">JWT</h4>
            <p className="text-lg">
              JSON Web Token to standard bezpiecznego przesyłania informacji między stronami w formie zaszyfrowanego tokenu.
            </p>
          </div>

          {/* Tailwind CSS */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src="./assets/tailwind.png" // Wstaw ścieżkę do zdjęcia Tailwind CSS
              alt="Tailwind CSS"
              className="w-24 h-24 mb-4"
            />
            <h4 className="text-2xl font-bold mb-2">Tailwind CSS</h4>
            <p className="text-lg">
              Tailwind CSS to utility-first framework, który pozwala na szybkie tworzenie responsywnych i spójnych interfejsów.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src="./assets/tailwind.png" // Wstaw ścieżkę do zdjęcia Tailwind CSS
              alt="Tailwind CSS"
              className="w-24 h-24 mb-4"
            />
            <h4 className="text-2xl font-bold mb-2">Bcrypt</h4>
            <p className="text-lg">
              Tailwind CSS to utility-first framework, który pozwala na szybkie tworzenie responsywnych i spójnych interfejsów.
            </p>
          </div>

        </motion.div>
      </article>
    </>
  );
}