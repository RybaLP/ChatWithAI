import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Chat from "@/models/Chat";
import { getChatCompletion } from "@/utils/groqClient";
import mongoose from "mongoose";

export const POST = async (req: Request) => {
  try {
    const { chatId, message, userId } = await req.json();
    console.log("chatId:", chatId, "userId:", userId, "message:", message); // Debugowanie

    // Sprawdzamy wymagane pola
    if (!userId || !message) {
      return NextResponse.json({ error: "Brak userId lub wiadomości." }, { status: 400 });
    }

    await connectToDatabase();

    // Walidacja i tworzenie chatId
    let chat;
    if (chatId && mongoose.isValidObjectId(chatId)) {
      chat = await Chat.findById(chatId);
    } else {
      chat = await Chat.create({ userId, messages: [] });
    }

    if (!chat) {
      return NextResponse.json(
        { error: "Nie udało się znaleźć ani stworzyć czatu." },
        { status: 404 }
      );
    }

    // Dodanie wiadomości użytkownika
    chat.messages.push({ content: message, sender: "user" });

    // Uzyskanie odpowiedzi od AI
    const aiReply = await getChatCompletion(message);

    // Dodanie odpowiedzi AI
    chat.messages.push({ content: aiReply, sender: "bot" });

    // Zapis czatu
    await chat.save();

    return NextResponse.json({ reply: aiReply, chatId: chat._id });
  } catch (error) {
    console.error("Błąd w API /api/chats:", error);
    return NextResponse.json({ error: "Wystąpił błąd serwera." }, { status: 500 });
  }
};
