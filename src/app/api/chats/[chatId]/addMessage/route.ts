import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Chat from '@/models/Chat';
import { authenticateApp } from '../../../../middleware/authMiddleware';

export const POST = authenticateApp(async (req: NextRequest) => {
  try {
    const { message } = await req.json();
    const chatId = req.nextUrl.pathname.split('/')[3]; // Pobieramy chatId z URL
    const userId = req.user.userId;

    if (!message) {
      return NextResponse.json({ message: 'Missing message' }, { status: 400 });
    }

    await connectToDatabase();

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    }

    // Dodajemy wiadomość do historii rozmowy
    chat.history.push({
      role: 'user', // Użytkownik wysłał wiadomość
      text: message,
    });

    await chat.save();

    return NextResponse.json({ message: 'Message added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json({ message: 'Error adding message' }, { status: 500 });
  }
});