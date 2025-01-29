// src/app/api/chats/route.ts
import { NextResponse , NextRequest} from "next/server";
import connectToDatabase from "@/lib/mongodb";
import UserChats from "@/models/UserChats";
import { authenticateApp } from "@/app/middleware/authMiddleware";

export const GET = authenticateApp(async (req: NextRequest) => {
  try {
    const userId = req.user.userId;

    await connectToDatabase();

    const userChats = await UserChats.findOne({ userId }).populate('chats');

    if (!userChats) {
      return NextResponse.json({ message: "Nie znaleziono czatów dla tego użytkownika." }, { status: 404 });
    }

    return NextResponse.json(userChats.chats);
  } catch (error) {
    console.error("Błąd w GET /api/chats:", error);
    return NextResponse.json({ error: "Wystąpił błąd serwera." }, { status: 500 });
  }
});