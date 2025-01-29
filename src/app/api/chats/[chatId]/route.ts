import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Chat from '@/models/Chat';
import { authenticateApp } from '../../../middleware/authMiddleware';

export const GET = authenticateApp(async (req: NextRequest) => {
  try {
    const chatId = req.nextUrl.pathname.split('/')[3]; // Pobieramy chatId z URL

    await connectToDatabase();

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(chat.history); // Zwracamy historię rozmowy
  } catch (error) {
    console.error('Error getting chat history:', error);
    return NextResponse.json({ message: 'Error getting chat history' }, { status: 500 });
  }
});