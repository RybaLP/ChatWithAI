import Groq from "groq-sdk";
import dotenv from "dotenv";
import connectToDatabase from '@/lib/mongodb';
import Chat from '@/models/Chat';
import { authenticateApp } from '../../../../middleware/authMiddleware';
import mongoose from 'mongoose'; // Importujemy mongoose
import { NextRequest, NextResponse } from "next/server";


export const POST = authenticateApp(async (req: NextRequest) => {
  try {
    const { message } = await req.json();
    const chatId = req.nextUrl.pathname.split('/')[3];
    const userId = req.user.userId;

    if (!message) {
      return NextResponse.json({ message: 'Brak wiadomości' }, { status: 400 });
    }

    await connectToDatabase();

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ message: 'Czat nie znaleziony' }, { status: 404 });
    }

    // Generujemy unikalne ID dla wiadomości użytkownika
    const userMessageId = new mongoose.Types.ObjectId();

    // Dodajemy wiadomość użytkownika do historii rozmowy
    chat.history.push({
      _id: userMessageId,
      role: 'user',
      text: message,
    });

    await chat.save();

    // Wywołujemy API Groq, aby otrzymać odpowiedź bota
    const botResponse = await getChatCompletion(message);

    // Generujemy unikalne ID dla wiadomości bota
    const botMessageId = new mongoose.Types.ObjectId();

    // Dodajemy odpowiedź bota do historii rozmowy
    chat.history.push({
      _id: botMessageId,
      role: 'model',
      text: botResponse,
    });

    await chat.save();

    // Zwracamy pełną historię rozmowy, w tym wiadomość użytkownika i odpowiedź bota
    return NextResponse.json(chat.history, { status: 200 });

  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ message: 'Błąd podczas dodawania wiadomości' }, { status: 500 });
  }
});

// Implementacja funkcji getChatCompletion (zakładam, że już ją masz)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "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",
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