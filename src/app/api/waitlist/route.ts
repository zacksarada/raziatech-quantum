// src/app/api/waitlist/route.ts
import { NextResponse } from 'next/server'

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabase: any = null

if (supabaseUrl && supabaseKey) {
  try {
    const { createClient } = require('@supabase/supabase-js')
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('✅ Supabase initialized')
  } catch (error) {
    console.log('❌ Supabase init failed:', error)
  }
}

export async function GET() {
  try {
    if (supabase) {
      const { count, error } = await supabase
        .from('waitlist_subscribers')
        .select('*', { count: 'exact', head: true })
      
      if (!error) {
        return NextResponse.json({
          success: true,
          total_subscribers: count || 0,
          remaining_spots: Math.max(0, 1000 - (count || 0)),
          storage: 'supabase'
        })
      }
    }
  } catch (error) {
    console.log('Supabase GET failed')
  }
  
  return NextResponse.json({
    success: true,
    total_subscribers: 0,
    remaining_spots: 1000,
    storage: 'none'
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, company, role, industry } = body

    // Validation
    if (!email || !name || !company || !role || !industry) {
      return NextResponse.json(
        { success: false, error: 'All fields required' },
        { status: 400 }
      )
    }

    // Try Supabase
    if (supabase) {
      try {
        // Check duplicate
        const { data: existing } = await supabase
          .from('waitlist_subscribers')
          .select('id')
          .eq('email', email.toLowerCase())
          .single()

        if (existing) {
          return NextResponse.json({
            success: true,
            message: 'Already on waitlist!',
            duplicate: true
          })
        }

        // Insert
        const { error } = await supabase
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

        if (error) throw error

        console.log('✅ Saved to Supabase:', email)
        return NextResponse.json({
          success: true,
          message: 'Successfully added!',
          storage: 'supabase'
        })

      } catch (error) {
        console.log('Supabase save failed:', error)
        // Fall through to success response
      }
    }

    // Log to console (will appear in Vercel logs)
    console.log('📝 Waitlist submission:', { email, name, company, role, industry })

    return NextResponse.json({
      success: true,
      message: 'Thank you for joining!',
      storage: 'log-only'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest!'
    })
  }
}
