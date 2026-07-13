import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, mobile, email, service, date, timeSlot, stylist, notes } = body

    if (!name || !mobile || !service || !date || !timeSlot) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const appointment = await db.appointment.create({
      data: { name, mobile, email, service, date, timeSlot, stylist, notes },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}