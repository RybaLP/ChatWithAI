import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Zapisujemy użytkownika

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 }); // Status 201 i wiadomość

  } catch (error) {
    console.error('Błąd rejestracji:', error);
    return NextResponse.json({ message: 'Error creating user', error }, { status: 500 });
  }
}