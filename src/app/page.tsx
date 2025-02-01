"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const RocketIcon = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C12 2 15 2 16 3C17 4 17 6 17 6L12 11L7 6C7 6 7 4 8 3C9 2 12 2 12 2Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 11V22"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 22H16"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 6L12 11L17 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 22V18H14V22"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const LazyImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "100px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (ref.current) {
          ref.current.src = src;
          setIsLoaded(true);
        }
      };
    }
  }, [isInView, src]);

  return (
    <motion.img
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isLoaded ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      alt={alt}
      className={className}
      style={{ transition: "opacity 0.5s ease-in-out" }}
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
      size: Math.random() * 3 + 2,
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
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-40 blur-2xl" />
        </motion.div>

        <div className="absolute inset-0 z-10" ref={containerRef}>
          {stars.map((star, i) => (
            <Star key={i} x={star.x} y={star.y} size={star.size} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative z-20 text-center text-white"
        >
          <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            COSMIC AI
          </h1>
          <p className="text-2xl md:text-3xl mb-8">Zwiększ swoją kreatywność i produktywność</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
        className="bg-black text-white flex flex-col md:flex-row items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 max-w-2xl"
        >
          <h3 className="text-4xl pt-10 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            Jaki model AI?
          </h3>
          <p className="text-lg md:text-xl mb-4">
            Korzystam z modelu <strong>Groq</strong>, który jest jednym z najszybszych i najbardziej
            wydajnych modeli AI dostępnych obecnie na rynku.
          </p>
          <p className="text-lg md:text-xl">
            Groq to przyszłość sztucznej inteligencji, łącząca zaawansowane algorytmy z
            niezwykłą łatwością integracji.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex-1 max-w-2xl"
        >
          <LazyImage
            src="/groq.jpg"
            alt="Groq AI"
            className="rounded-xl shadow-2xl mt-10 ml-5"
          />
        </motion.div>
      </article>

      <article className="min-h-screen bg-black text-white p-8 flex flex-col md:flex-row items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 max-w-2xl"
        >
          <LazyImage
            src="/rocket.webp"
            alt="Cosmic AI"
            className="rounded-xl shadow-2xl"
          />
        </motion.div>

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
          <ul className="list-disc list-inside text-lg md:text-xl mb-4">
            <li><strong>Niezawodność</strong> – zawsze dostępny i gotowy do działania.</li>
            <li><strong>Szybkość</strong> – generowanie wyników w czasie rzeczywistym.</li>
            <li><strong>Precyzję</strong> – dokładne i spersonalizowane odpowiedzi.</li>
            <li><strong>Łatwość użycia</strong> – intuicyjny interfejs dostosowany do Twoich potrzeb.</li>
          </ul>
        </motion.div>
      </article>

      <article className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full"
      >
        {[
          { src: "nextt.jpg", alt: "Next.js", title: "Next.js", 
            text: "Framework React do szybkiego renderowania stron i optymalizacji SEO" },
          { src: "/typescript.png", alt: "TypeScript", title: "TypeScript", 
            text: "Typowany JavaScript dla bezpieczeństwa kodu i lepszej skalowalności" },
          { src: "/mongodba.png", alt: "MongoDB", title: "MongoDB", 
            text: "NoSQL baza danych zapewniająca elastyczność i skalowalność" },
          { src: "/jwt.png", alt: "JWT", title: "JWT", 
            text: "Standard bezpiecznego przesyłania informacji poprzez tokeny" },
          { src: "/tailwind.png", alt: "Tailwind CSS", title: "Tailwind CSS", 
            text: "Utility-first framework do szybkiego tworzenia interfejsów" },
          { src: "/bct.png", alt: "Bcrypt", title: "Bcrypt", 
            text: "Biblioteka do bezpiecznego hashowania haseł" },
        ].map((tech, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-gray-800 rounded-xl shadow-2xl cursor-pointer"
            whileHover={{
              scale: 1.05,
              rotate: 2,
              boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.2)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-24 h-24 mb-4 bg-gray-700 rounded-lg overflow-hidden">
              <LazyImage src={tech.src} alt={tech.alt} className="w-full h-full object-contain" />
            </div>
            <h4 className="text-2xl font-bold mb-2">{tech.title}</h4>
            <p className="text-lg">{tech.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </article>
    </>
  );
}