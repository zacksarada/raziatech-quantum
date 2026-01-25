import { NextResponse } from 'next/server'

// Simple in-memory storage untuk testing
let waitlistMemoryDB: any[] = []

export async function GET() {
  return NextResponse.json({
    success: true,
    total_subscribers: waitlistMemoryDB.length,
    remaining_spots: Math.max(0, 1000 - waitlistMemoryDB.length),
    storage: 'memory'
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, company, role, industry } = body

    // Validation
    if (!email || !name || !company || !role || !industry) {
      return NextResponse.json(
        { 
          success: false,
          error: 'All fields are required' 
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }

    // Check for duplicate
    const existing = waitlistMemoryDB.find(entry => 
      entry.email.toLowerCase() === email.toLowerCase()
    )
    
    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'You are already on our waitlist!',
        duplicate: true
      })
    }

    // Add to memory storage
    const newEntry = {
      id: Date.now(),
      email: email.toLowerCase(),
      name,
      company,
      role,
      industry,
      timestamp: new Date().toISOString()
    }

    waitlistMemoryDB.push(newEntry)
    
    // Log ke console (bisa dilihat di Vercel logs)
    console.log('📝 New waitlist entry:', newEntry)

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      position: waitlistMemoryDB.length
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for joining our waitlist!'
    }, { status: 200 })
  }
}
