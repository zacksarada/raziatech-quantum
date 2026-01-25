import { NextResponse } from 'next/server'

// Mock database - sementara pakai ini dulu
let waitlistDB: any[] = []
let totalSubscribers = 753

export async function GET() {
  return NextResponse.json({
    total_subscribers: totalSubscribers,
    remaining_spots: Math.max(0, 1000 - totalSubscribers)
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, company, role, industry } = body

    // Validation
    if (!email || !name || !company || !role || !industry) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check for duplicate email
    const existing = waitlistDB.find(entry => entry.email === email)
    if (existing) {
      return NextResponse.json(
        { 
          error: 'Email already registered',
          message: 'This email is already on our waitlist!' 
        },
        { status: 409 }
      )
    }

    // Add to database
    const newEntry = {
      id: Date.now().toString(),
      email,
      name,
      company,
      role,
      industry,
      subscribedAt: new Date().toISOString(),
      status: 'pending'
    }

    waitlistDB.push(newEntry)
    totalSubscribers++

    console.log('New waitlist entry:', newEntry)
    console.log('Total subscribers:', totalSubscribers)

    // Simulate database save
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      data: newEntry,
      position: totalSubscribers
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
