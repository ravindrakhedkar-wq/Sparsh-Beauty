import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const courses = await db.course.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}