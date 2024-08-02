import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookie = cookies();
  const body = await request.json();
  const theme = body.theme;

  cookie.set('theme', theme);

  return NextResponse.json({ theme });
}
