import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Chat from '@/models/Chat';
import { authenticateApp } from '../../../../middleware/authMiddleware';
import mongoose from 'mongoose'; // Importujemy mongoose

export const POST = authenticateApp(async (req: NextRequest) => {
    try {
        const { message } = await req.json();
        const chatId = req.nextUrl.pathname.split('/')[3];
        const userId = req.user.userId;

        if (!message) {
            return NextResponse.json({ message: 'Missing message' }, { status: 400 });
        }

        await connectToDatabase();

        const chat = await Chat.findById(chatId);

        if (!chat) {
            return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
        }

        // Generujemy unikalne ID dla wiadomości
        const messageId = new mongoose.Types.ObjectId();

        // Dodajemy wiadomość do historii rozmowy, wraz z ID
        chat.history.push({
            _id: messageId, // Dodajemy _id do wiadomości
            role: 'user',
            text: message,
        });

        await chat.save();

        // Zwracamy dodaną wiadomość z ID
        return NextResponse.json({ 
            _id: messageId, // Zwracamy _id w odpowiedzi
            role: 'user',
            text: message,
        }, { status: 201 });

    } catch (error) {
        console.error('Error adding message:', error);
        return NextResponse.json({ message: 'Error adding message' }, { status: 500 });
    }
});