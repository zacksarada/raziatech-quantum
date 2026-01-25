// src/app/api/waitlist/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    // Get total count
    const { count, error: countError } = await supabase
      .from('waitlist_subscribers')
      .select('*', { count: 'exact', head: true })

    if (countError) throw countError

    return NextResponse.json({
      total_subscribers: count || 0,
      remaining_spots: Math.max(0, 1000 - (count || 0))
    })

  } catch (error) {
    console.error('Error fetching waitlist stats:', error)
    return NextResponse.json(
      { total_subscribers: 0, remaining_spots: 1000 },
      { status: 200 }
    )
  }
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

    // Check for duplicate
    const { data: existing } = await supabase
      .from('waitlist_subscribers')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json(
        { 
          error: 'Email already registered',
          message: 'You are already on our waitlist!' 
        },
        { status: 409 }
      )
    }

    // Insert to database
    const { data, error: insertError } = await supabase
      .from('waitlist_subscribers')
      .insert({
        email: email.toLowerCase(),
        name,
        company,
        role,
        industry,
        status: 'confirmed'
      })
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save to database' },
        { status: 500 }
      )
    }

    // Get position
    const { count } = await supabase
      .from('waitlist_subscribers')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      data,
      position: count
    })

  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
