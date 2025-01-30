import Groq from "groq-sdk";
import dotenv from "dotenv"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ""   ///////////////////////////////////////////////////
});

export const getChatCompletion = async (message: string) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    return response.choices[0]?.message?.content || "Brak odpowiedzi.";
  } catch (error) {
    console.error("Błąd Groq API:", error);
    return "Wystąpił błąd podczas komunikacji z AI.";
  }
};
