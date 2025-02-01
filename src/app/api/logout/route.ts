import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const response = new NextResponse(JSON.stringify({ message: 'Logout successful' }), {
      status: 200,
    });

    response.cookies.set('token', '', { // Nazwa ciasteczka 'token' -  dostosuj!
      expires: new Date(0), // Ustaw datę ważności na przeszłość
      httpOnly: true, // Ważne dla bezpieczeństwa
      secure: process.env.NODE_ENV === 'production', // Tylko dla HTTPS w produkcji
      sameSite: 'strict', // Opcjonalnie, dodaje dodatkową ochronę przed CSRF
      path: '/', // Dostosuj ścieżkę ciasteczka
    });

    return response;


  } catch (error) {
    console.error('Błąd wylogowywania:', error);
    return NextResponse.json({ message: 'Error during logout' }, { status: 500 });
  }
}