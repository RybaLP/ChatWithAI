// src/utils/auth.ts
import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Klucz tajny (zmienne środowiskowe!)

  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined. Please set it in .env.local file.");
  }

  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); // Ważność tokenu: 1 godzina
  return token;
};