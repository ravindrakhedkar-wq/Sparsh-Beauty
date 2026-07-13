import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(submissions)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, mobile, subject, message } = body

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    const submission = await db.contactSubmission.create({
      data: { name, email, mobile, subject, message },
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}