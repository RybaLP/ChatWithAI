import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' 
    },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }], // Zmieniono na listę ObjectId i ref do Chat
  },
  { timestamps: true }
);

export default mongoose.models.UserChats || mongoose.model("UserChats", userChatsSchema);