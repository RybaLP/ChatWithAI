"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Chat App</h1>
      <p className="text-lg mb-4">Start chatting with your friends now!</p>
      <button
        onClick={handleLoginRedirect}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Login
      </button>
    </main>
  );
}