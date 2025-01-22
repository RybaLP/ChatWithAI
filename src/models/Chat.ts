import mongoose, { Schema, Document, Model } from "mongoose";

interface IMessage {
  content: string;
  sender: "user" | "bot";
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  messages: IMessage[];
}

const ChatSchema = new mongoose.Schema({
  userId: {
    type: String, // Zmiana z ObjectId na String
    required: true,
  },
  messages: [
    {
      content: { type: String, required: true },
      sender: { type: String, enum: ["user", "bot"], required: true },
    },
  ],
});
const Chat: Model<IChat> = mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);

export default Chat;
