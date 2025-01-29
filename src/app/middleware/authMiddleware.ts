// src/middleware/authMiddlewareApp.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const authenticateApp = (handler: (req: NextRequest) => Promise<NextResponse>) => {
  return async (req: NextRequest) => {
    const token = req.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return new NextResponse(JSON.stringify({ error: 'Brak tokenu' }), { status: 401 });
    }

    try {
      const secretKey = process.env.JWT_SECRET || 'your_secret_key';
      if (!secretKey) {
        return new NextResponse(JSON.stringify({ error: 'JWT_SECRET is not defined.' }), { status: 500 });
      }
      console.log(secretKey);
      const decoded = jwt.verify(token, secretKey) as { userId: string };
      console.log("Zweryfikowany token (decoded):", decoded);

      // Dodajemy user do req (wcześniej typy.d.ts)
      req.user = decoded;

      return handler(req); // Wywołujemy handler z req
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: 'Nieprawidłowy token' }), { status: 401 });
    }
  };
};