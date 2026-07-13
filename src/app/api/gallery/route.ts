import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: Record<string, unknown> = {}
    if (category) where.category = category

    const items = await db.galleryItem.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 })
  }
}