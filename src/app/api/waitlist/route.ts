import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Debug info
  const debugInfo = {
    supabase_url_exists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_key_exists: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    url_length: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
    key_length: process.env.SUPABASE_SERVICE_ROLE_KEY?.length || 0,
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV
  }
  
  console.log('🔍 Debug info:', debugInfo)

  try {
    // Coba init Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)
      
      console.log('✅ Supabase client created')
      
      // Test query
      const { count, error } = await supabase
        .from('waitlist_subscribers')
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        console.error('❌ Supabase query error:', error)
        throw error
      }
      
      console.log('✅ Supabase query successful, count:', count)
      
      return NextResponse.json({
        success: true,
        total_subscribers: count || 0,
        remaining_spots: Math.max(0, 1000 - (count || 0)),
        storage: 'supabase',
        debug: debugInfo
      })
    } else {
      console.log('⚠️ Missing Supabase environment variables')
    }
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error)
  }
  
  // Fallback
  return NextResponse.json({
    success: true,
    total_subscribers: 0,
    remaining_spots: 1000,
    storage: 'memory',
    debug: debugInfo,
    message: 'Supabase not configured'
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

    // Debug env vars
    console.log('🔍 Checking Supabase env vars...')
    console.log('URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Try Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (supabaseUrl && supabaseKey) {
      console.log('🔄 Attempting Supabase connection...')
      
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseKey)
        
        console.log('✅ Supabase client created for POST')
        
        // Check duplicate
        const { data: existing, error: checkError } = await supabase
          .from('waitlist_subscribers')
          .select('id')
          .eq('email', email.toLowerCase())
          .maybeSingle()
        
        if (checkError) {
          console.error('❌ Duplicate check error:', checkError)
        }
        
        if (existing) {
          console.log('ℹ️ Duplicate email detected')
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
          console.error('❌ Supabase insert error:', insertError)
          console.error('Error details:', {
            code: insertError.code,
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint
          })
          throw insertError
        }
        
        console.log('🎉 Successfully saved to Supabase:', { email, id: data?.id })
        
        return NextResponse.json({
          success: true,
          message: 'Successfully added to waitlist!',
          storage: 'supabase',
          data
        })
        
      } catch (error) {
        console.error('❌ Supabase operation failed:', error)
        console.error('Full error:', JSON.stringify(error, null, 2))
      }
    } else {
      console.log('⚠️ Supabase env vars missing:', {
        has_url: !!supabaseUrl,
        has_key: !!supabaseKey,
        url: supabaseUrl ? '*** set ***' : 'missing',
        key: supabaseKey ? '*** set ***' : 'missing'
      })
    }
    
    // Fallback - log to console
    console.log('📝 Fallback logging:', { email, name, company, role, industry })
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for joining!',
      storage: 'log-only',
      note: 'Supabase not configured properly'
    })
    
  } catch (error) {
    console.error('❌ API error:', error)
    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest!',
      storage: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
