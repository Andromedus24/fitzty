import { NextRequest, NextResponse } from 'next/server'

// Temporarily disable for deployment
export async function GET(request: NextRequest) {
  return NextResponse.json({ error: 'API temporarily disabled for deployment' }, { status: 503 })
} 