import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, role, companySize: company_size, useCase: use_case } = body

    // Validasi dasar
    if (!name || !email || !role) {
      return NextResponse.json(
        { error: 'Name, email, and role are required' },
        { status: 400 }
      )
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = createRouteHandlerClient({ cookies })

    // Cek apakah email sudah terdaftar
    const { data: existing } = await supabase
      .from('waitlist_subscribers')
      .select('id')
      .eq('email', email)
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

    // Insert data ke database
    const { data, error } = await supabase
      .from('waitlist_subscribers')
      .insert([
        {
          name,
          email,
          role,
          company_size,
          use_case,
          status: 'confirmed'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save data' },
        { status: 500 }
      )
    }

    // **OPTIONAL: Kirim email konfirmasi**
    // (Kita bisa setup nanti dengan Resend.com)

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      data
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    const supabase = createRouteHandlerClient({ cookies })

    if (email) {
      // Cek status spesifik email
      const { data } = await supabase
        .from('waitlist_subscribers')
        .select('id, email, subscribed_at, status')
        .eq('email', email)
        .single()

      return NextResponse.json({
        exists: !!data,
        data
      })
    }

    // Get total count (admin only - buta auth dulu)
    const { count } = await supabase
      .from('waitlist_subscribers')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      total_subscribers: count
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
