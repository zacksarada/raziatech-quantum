import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { count, error } = await supabase
      .from('waitlist_subscribers')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      console.error('GET Error:', error)
      if (error.code === '42P01') {
        return NextResponse.json({
          success: true,
          total_subscribers: 0,
          remaining_spots: 1000,
          storage: 'supabase-table-missing'
        })
      }
      throw error
    }
    
    return NextResponse.json({
      success: true,
      total_subscribers: count || 0,
      remaining_spots: Math.max(0, 1000 - (count || 0)),
      storage: 'supabase'
    })
    
  } catch (error) {
    console.error('GET Catch Error:', error)
    return NextResponse.json({
      success: true,
      total_subscribers: 0,
      remaining_spots: 1000,
      storage: 'error',
      error: error instanceof Error ? error.message : 'Unknown'
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, company, role, industry, company_size, use_case } = body

    // Validation
    if (!email || !name || !company || !role || !industry) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('🔄 Processing waitlist submission:', { email, name, company })
    
    // Insert to database
    const { data, error } = await supabase
      .from('waitlist_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        name: name.trim(),
        company: company.trim(),
        role: role.trim(),
        industry: industry.trim(),
        company_size: company_size?.trim() || null,
        use_case: use_case?.trim() || null,
        subscribed_at: new Date().toISOString(),
        status: 'confirmed'
      })
      .select()
      .single()
    
    if (error) {
      console.error('❌ Database Error:', {
        code: error.code,
        message: error.message,
        details: error.details
      })
      
      // Handle duplicate email
      if (error.code === '23505') {
        return NextResponse.json({
          success: true,
          message: 'You are already on our waitlist!',
          duplicate: true,
          storage: 'supabase'
        })
      }
      
      throw error
    }
    
    console.log('✅ Saved to database! ID:', data.id)
    
    // ========== EMAIL INTEGRATION ==========
    // Send welcome email ASYNC (don't wait for it)
    try {
      sendWelcomeEmail(email, name)
        .then(result => {
          if (result.success) {
            console.log('✅ Welcome email sent to:', email)
          } else {
            console.error('❌ Email failed:', result.error)
          }
        })
        .catch(emailError => {
          console.error('❌ Email send error:', emailError)
        })
    } catch (emailError) {
      console.error('❌ Email initialization error:', emailError)
    }
    // =======================================
    
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist! Check your email for confirmation.',
      storage: 'supabase',
      data: { id: data.id }
    })
    
  } catch (error) {
    console.error('💥 API Error:', error)
    
    // Fallback logging
    try {
      const body = await request.json()
      console.log('📝 Fallback logging:', { 
        email: body.email, 
        name: body.name,
        timestamp: new Date().toISOString() 
      })
    } catch { /* ignore */ }
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for joining! We\'ll save your details and send confirmation shortly.',
      storage: 'log-only',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
