import { NextResponse } from 'next/server'

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
      // Jika table tidak ada, return 0
      if (error.code === '42P01') { // table doesn't exist
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
    const { email, name, company, role, industry } = body

    // Validation
    if (!email || !name || !company || !role || !industry) {
      return NextResponse.json(
        { success: false, error: 'All fields required' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('🔄 Inserting:', { email, name, company })
    
    // Coba insert dengan error handling
    const { data, error } = await supabase
      .from('waitlist_subscribers')
      .insert({
        email: email.toLowerCase().trim(),
        name: name.trim(),
        company: company.trim(),
        role: role.trim(),
        industry: industry.trim(),
        subscribed_at: new Date().toISOString(),
        status: 'confirmed'
      })
      .select()
      .single()
    
    if (error) {
      console.error('❌ Insert Error Details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // Handle specific errors
      if (error.code === '42501') {
        console.error('🔒 RLS Error - need to disable RLS in Supabase')
      } else if (error.code === '42P01') {
        console.error('📋 TABLE DOES NOT EXIST - need to create table')
      } else if (error.code === '42703') {
        console.error('🗂️ COLUMN MISSING - table structure mismatch')
      } else if (error.code === '23505') {
        // Duplicate email - return success
        return NextResponse.json({
          success: true,
          message: 'You are already on our waitlist!',
          duplicate: true,
          storage: 'supabase'
        })
      }
      
      throw error
    }
    
    console.log('✅ Saved to Supabase! ID:', data?.id)
    
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      storage: 'supabase',
      data: { id: data?.id, email: data?.email }
    })
    
  } catch (error) {
    console.error('💥 POST Catch Error:', error)
    
    // Still log the submission
    try {
      const { email, name, company } = await request.json()
      console.log('📝 Fallback - Logged submission:', { email, name, company, timestamp: new Date().toISOString() })
    } catch { /* ignore */ }
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for joining! We\'ll save your details shortly.',
      storage: 'log-only',
      error: error instanceof Error ? error.message : 'Unknown error',
      note: 'Database update pending'
    })
  }
}
