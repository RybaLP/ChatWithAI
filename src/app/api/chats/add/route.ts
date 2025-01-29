import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Chat from '@/models/Chat';
import UserChats from '@/models/UserChats';
import { authenticateApp } from "../../../middleware/authMiddleware"

export const POST = authenticateApp(async (req: NextRequest) => {
  try {
    const { title } = await req.json();
    const userId = req.user.userId;

    if (!title) {
      return NextResponse.json({ message: 'Missing title' }, { status: 400 });
    }

    await connectToDatabase();

    // 1. Tworzymy nowy czat z tytułem i userId
    const newChat = new Chat({
      userId,
      history: [],
    });

    await newChat.save();


    // 2. Dodajemy czat (tylko ID) do UserChats
    const userChats = await UserChats.findOne({ userId });

    if (!userChats) {
      const newUserChats = new UserChats({
        userId,
        chats: [{ _id: newChat._id, title }], // Dodajemy _id i tytuł czatu
      });
      await newUserChats.save();
    } else {
      userChats.chats.push({ _id: newChat._id, title }); // Dodajemy _id i tytuł czatu
      await userChats.save();
    }

    return NextResponse.json({ message: 'Chat added successfully', chatId: newChat._id }, { status: 201 });
  } catch (error) {
    console.error('Error adding chat:', error);
    return NextResponse.json({ message: 'Error adding chat' }, { status: 500 });
  }
});