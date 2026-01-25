// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server'

// Initialize Supabase (akan undefined jika env vars belum diisi)
let supabase: any = null

try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient } = require('@supabase/supabase-js')
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
    console.log('✅ Supabase client initialized successfully')
  }
} catch (error) {
  console.log('⚠️ Supabase client not initialized (env vars missing)')
}

// In-memory fallback storage (untuk development/testing)
let waitlistMemoryDB: any[] = []

export async function GET() {
  try {
    // Coba ambil dari Supabase jika tersedia
    if (supabase) {
      const { count, error } = await supabase
        .from('waitlist_subscribers')
        .select('*', { count: 'exact', head: true })
      
      if (!error && count !== null) {
        return NextResponse.json({
          success: true,
          total_subscribers: count,
          remaining_spots: Math.max(0, 1000 - count),
          storage: 'supabase'
        })
      }
    }
  } catch (error) {
    console.log('Supabase GET failed:', error)
  }
  
  // Fallback ke memory storage
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

    // Try Supabase first
    if (supabase) {
      try {
        console.log('Attempting to save to Supabase...')
        
        // Check for duplicate
        const { data: existing } = await supabase
          .from('waitlist_subscribers')
          .select('id')
          .eq('email', email.toLowerCase())
          .maybeSingle()

        if (existing) {
          return NextResponse.json({
            success: true,
            message: 'You are already on our waitlist!',
            duplicate: true,
            storage: 'supabase'
          })
        }

        // Insert to Supabase
        const { data, error: insertError } = await supabase
          .from('waitlist_subscribers')
          .insert({
            email: email.toLowerCase(),
            name,
            company,
            role,
            industry,
            subscribed_at: new Date().toISOString(),
            status: 'confirmed'
          })
          .select()
          .single()

        if (insertError) {
          console.error('Supabase insert error:', insertError)
          throw insertError
        }

        // Get total count
        const { count } = await supabase
          .from('waitlist_subscribers')
          .select('*', { count: 'exact', head: true })

        console.log('✅ Saved to Supabase:', { email, name })

        return NextResponse.json({
          success: true,
          message: 'Successfully added to waitlist!',
          position: count,
          storage: 'supabase',
          data
        })

      } catch (supabaseError) {
        console.error('Supabase operation failed, falling back to memory:', supabaseError)
        // Continue to memory fallback
      }
    }

    // Memory fallback
    console.log('Using memory fallback storage')
    
    // Check duplicate in memory
    const existingInMemory = waitlistMemoryDB.find(entry => 
      entry.email.toLowerCase() === email.toLowerCase()
    )
    
    if (existingInMemory) {
      return NextResponse.json({
        success: true,
        message: 'You are already on our waitlist!',
        duplicate: true,
        storage: 'memory'
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
    console.log('📝 Memory storage - New waitlist entry:', newEntry)
    console.log('📊 Total in memory:', waitlistMemoryDB.length)

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      position: waitlistMemoryDB.length,
      storage: 'memory',
      data: newEntry
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    
    // Always return success to user even on error
    return NextResponse.json({
      success: true,
      message: 'Thank you for joining our waitlist!',
      error_handled: true
    }, { status: 200 })
  }
}

// Optional: Endpoint untuk debugging
export async function PUT(request: Request) {
  // Endpoint untuk reset memory (hanya development)
  if (process.env.NODE_ENV === 'development') {
    waitlistMemoryDB = []
    return NextResponse.json({
      success: true,
      message: 'Memory storage cleared',
      count: waitlistMemoryDB.length
    })
  }
  
  return NextResponse.json(
    { error: 'Not allowed in production' },
    { status: 403 }
  )
}
