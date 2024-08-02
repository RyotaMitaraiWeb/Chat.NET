import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookie = cookies();
  const body = await request.json();

  const animations = body.animation;

  cookie.set('animations', animations);
  return NextResponse.json({ animations });
}
