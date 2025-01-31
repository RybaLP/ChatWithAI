import mongoose, { Document, Types } from 'mongoose';

interface HistoryItem {
    role: 'user' | 'model';
    text: string;
    _id?: Types.ObjectId;
}

export interface ChatDocument extends Document {
    userId: Types.ObjectId;
    title: String,
    history: HistoryItem[];
    _id: Types.ObjectId;
    createdAt: Date; // Dodajemy createdAt
    updatedAt: Date; // Dodajemy updatedAt
    __v: number;    // Dodajemy __v
}

const chatSchema = new mongoose.Schema<ChatDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {  // Dodajemy pole title
        type: String,
        required: true,
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
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: new mongoose.Types.ObjectId()
            }
        },
    ],
}, { timestamps: true });

const Chat = mongoose.models.Chat || mongoose.model<ChatDocument>("Chat", chatSchema);

export default Chat;