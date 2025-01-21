import { NextRequest, NextResponse } from "next/server";
import { getChatCompletion } from "@/utils/groqClient";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const reply = await getChatCompletion(message);
  return NextResponse.json({ reply });
}
