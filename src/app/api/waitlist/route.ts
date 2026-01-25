import { NextResponse } from 'next/server'

export async function GET() {
  // Log environment variables status (without exposing actual keys)
  const envStatus = {
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL 
      ? `✅ (length: ${process.env.NEXT_PUBLIC_SUPABASE_URL.length})` 
      : '❌ MISSING',
    supabase_anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
      ? `✅ (length: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length})` 
      : '❌ MISSING',
    supabase_service: process.env.SUPABASE_SERVICE_ROLE_KEY 
      ? `✅ (length: ${process.env.SUPABASE_SERVICE_ROLE_KEY.length})` 
      : '❌ MISSING',
    node_env: process.env.NODE_ENV || 'not set',
    vercel: process.env.VERCEL ? '✅' : '❌'
  }
  
  console.log('🔍 Environment Status:', envStatus)
  
  // Try Supabase with service role key first, then anon key
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  
  if (supabaseUrl) {
    // Try service role key first (more permissions)
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (supabaseKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        console.log('🔄 Attempting Supabase connection...')
        
        // Simple test query
        const { data, error } = await supabase
          .from('waitlist_subscribers')
          .select('id')
          .limit(1)
        
        if (error) {
          console.error('❌ Supabase query error:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          })
          
          // Try count as alternative
          const { count, error: countError } = await supabase
            .from('waitlist_subscribers')
            .select('*', { count: 'exact', head: true })
          
          if (countError) {
            console.error('❌ Count also failed:', countError)
            throw error
          }
          
          console.log('✅ Count successful:', count)
          
          return NextResponse.json({
            success: true,
            total_subscribers: count || 0,
            remaining_spots: Math.max(0, 1000 - (count || 0)),
            storage: 'supabase',
            method: 'count',
            env_check: envStatus
          })
        }
        
        console.log('✅ Supabase connection successful!')
        
        // Get total count
        const { count } = await supabase
          .from('waitlist_subscribers')
          .select('*', { count: 'exact', head: true })
        
        return NextResponse.json({
          success: true,
          total_subscribers: count || 0,
          remaining_spots: Math.max(0, 1000 - (count || 0)),
          storage: 'supabase',
          method: 'query',
          env_check: envStatus
        })
        
      } catch (error) {
        console.error('❌ Supabase initialization failed:', error)
      }
    }
  }
  
  console.log('⚠️ Using fallback - Supabase not available')
  return NextResponse.json({
    success: true,
    total_subscribers: 0,
    remaining_spots: 1000,
    storage: 'memory',
    env_check: envStatus,
    message: 'Supabase connection failed'
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

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    
    if (!supabaseUrl) {
      console.error('❌ SUPABASE_URL missing!')
      throw new Error('Supabase URL not configured')
    }

    // Try service key first, then anon key
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseKey) {
      console.error('❌ No Supabase key available!')
      throw new Error('No Supabase key configured')
    }

    console.log('🔄 Starting Supabase insert process...')
    console.log('📧 Email:', email)
    console.log('🔑 Key type:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service' : 'anon')

    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)
      
      // Test connection first
      const { error: testError } = await supabase
        .from('waitlist_subscribers')
        .select('id')
        .limit(1)
      
      if (testError) {
        console.error('❌ Supabase test query failed:', {
          code: testError.code,
          message: testError.message,
          details: testError.details
        })
        
        // Check if table exists
        if (testError.code === '42P01') {
          console.error('❌ TABLE DOES NOT EXIST! Need to create waitlist_subscribers')
        }
        
        throw testError
      }
      
      console.log('✅ Supabase connection test passed')
      
      // Check for duplicate
      const { data: existing, error: checkError } = await supabase
        .from('waitlist_subscribers')
        .select('id')
        .eq('email', email.toLowerCase())
        .maybeSingle()
      
      if (checkError) {
        console.error('❌ Duplicate check error:', checkError)
      }
      
      if (existing) {
        console.log('ℹ️ Duplicate found:', existing.id)
        return NextResponse.json({
          success: true,
          message: 'You are already on our waitlist!',
          duplicate: true,
          storage: 'supabase'
        })
      }
      
      // Insert data
      console.log('📝 Inserting data to Supabase...')
      
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
        console.error('❌ INSERT FAILED!', {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint
        })
        
        // Common errors and solutions
        if (insertError.code === '42501') {
          console.error('🔒 RLS (Row Level Security) BLOCKING!')
          console.error('Solution: Run in Supabase SQL Editor:')
          console.error(`
            -- Option 1: Disable RLS
            ALTER TABLE waitlist_subscribers DISABLE ROW LEVEL SECURITY;
            
            -- Option 2: Create insert policy
            CREATE POLICY "Allow insert" ON waitlist_subscribers
            FOR INSERT WITH CHECK (true);
          `)
        }
        
        if (insertError.code === '23505') {
          console.error('🔑 UNIQUE VIOLATION - email already exists')
        }
        
        throw insertError
      }
      
      console.log('🎉 SUCCESS! Inserted with ID:', data?.id)
      
      return NextResponse.json({
        success: true,
        message: 'Successfully added to waitlist!',
        storage: 'supabase',
        data: { id: data?.id, email: data?.email }
      })
      
    } catch (supabaseError) {
      console.error('❌ Supabase operation failed completely:', supabaseError)
      throw supabaseError
    }
    
  } catch (error) {
    console.error('💥 API ERROR:', error)
    
    // Fallback - at least log it
    const { email, name, company, role, industry } = await request.json().catch(() => ({}))
    console.log('📝 Fallback logging submission:', { email, name, company })
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for joining!',
      storage: 'log-only',
      error: error instanceof Error ? error.message : 'Unknown error',
      note: 'Will retry database save later'
    })
  }
}
