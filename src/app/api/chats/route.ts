import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import UserChats from "@/models/UserChats";
import { authenticateApp } from "@/app/middleware/authMiddleware";
import { ChatDocument } from "@/models/Chat";

export const GET = authenticateApp(async (req: NextRequest) => {
    try {
        const userId = req.user.userId;

        await connectToDatabase();

        const userChats = await UserChats.findOne({ userId }).populate('chats');

        if (!userChats) {
            return NextResponse.json({ message: "Nie znaleziono czatów dla tego użytkownika." }, { status: 404 });
        }

        if (userChats && userChats.chats && userChats.chats.length > 0) {
            const chats = userChats.chats.map((chat: ChatDocument) => {
                const history = chat.history.map(item => ({
                    role: item.role,
                    text: item.text,
                    _id: item._id?.toString(),
                }));

                return {
                    _id: chat._id.toString(),
                    userId: chat.userId.toString(),
                    title: chat.title,
                    history: history,
                    createdAt: chat.createdAt.toISOString(), // Konwertujemy datę na string w formacie ISO
                    updatedAt: chat.updatedAt.toISOString(), // Konwertujemy datę na string w formacie ISO
                    __v: chat.__v
                };
            });

            return NextResponse.json(chats);
        } else {
            return NextResponse.json([]);
        }

    } catch (error) {
        console.error("Błąd w GET /api/chats:", error);
        return NextResponse.json({ error: "Wystąpił błąd serwera." }, { status: 500 });
    }
});