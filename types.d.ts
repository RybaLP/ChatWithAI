// types.d.ts
import type { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';

declare module 'next' {
  interface NextApiRequest {
    user: {
      userId: string;
    };
  }
}

declare module 'next/server' {
  interface NextRequest {
    user: {
      userId: string;
    };
  }
}