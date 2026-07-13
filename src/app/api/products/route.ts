import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    const where: Record<string, unknown> = {}
    if (category) where.category = category
    if (search) where.name = { contains: search }
    if (featured === 'true') where.featured = true

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}