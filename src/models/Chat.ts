import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  userId: { // ID użytkownika, który rozpoczął rozmowę
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  history: [
    {
      role: {
        type: String,
        enum: ["user", "model"],
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;