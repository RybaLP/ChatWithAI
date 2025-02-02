import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  throw new Error("Brak URI do bazy danych. Upewnij się, że MONGO_URI jest ustawione w pliku .env.");
}

let isConnected = false; // Flaga do śledzenia statusu połączenia

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Już połączono z bazą danych.");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("Połączono z bazą danych!");
  } catch (error) {
    console.error("Błąd podczas łączenia z bazą danych:", error);
    throw new Error("Nie udało się połączyć z bazą danych.");
  }
};

export default connectToDatabase;
