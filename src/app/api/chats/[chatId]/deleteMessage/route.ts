import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Chat from '@/models/Chat';
import UserChats from '@/models/UserChats';
import { authenticateApp } from '../../../../middleware/authMiddleware';

export const DELETE = authenticateApp(async (req: NextRequest) => {
  try {
    const chatId = req.nextUrl.pathname.split('/')[3];
    const userId = req.user.userId;

    if (!chatId) {
      return NextResponse.json({ message: 'Chat ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    // Usuwamy czat z kolekcji Chat
    const deletedChat = await Chat.findOneAndDelete({ _id: chatId, userId });

    if (!deletedChat) {
      return NextResponse.json({ message: 'Chat not found or unauthorized' }, { status: 404 });
    }

    // Usuwamy czat z listy użytkownika
    await UserChats.findOneAndUpdate(
      { userId },
      { $pull: { chats: { _id: chatId } } }
    );

    return NextResponse.json({ message: 'Chat deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting chat:', error);
    return NextResponse.json({ message: 'Error deleting chat' }, { status: 500 });
  }
});
