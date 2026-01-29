import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper untuk generate referral code
function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ================= GET HANDLER =================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const admin = searchParams.get('admin');

    console.log('API Called with:', { 
      hasSecret: !!secret, 
      isAdmin: !!admin,
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    });

    // Check admin secret (only for admin requests)
    const adminSecret = process.env.ADMIN_SECRET;
    
    if (admin === 'true' && secret !== adminSecret) {
      console.log('Unauthorized admin access attempt');
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid admin secret' },
        { status: 401 }
      );
    }

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase configuration:', {
        url: supabaseUrl ? 'Set' : 'Missing',
        key: supabaseKey ? 'Set' : 'Missing'
      });
      return NextResponse.json(
        { 
          error: 'Configuration Error',
          message: 'Supabase environment variables are not properly configured.',
          details: {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseKey
          }
        },
        { status: 500 }
      );
    }

    console.log('Connecting to Supabase with URL:', supabaseUrl.substring(0, 30) + '...');

    // FIXED: Gunakan type assertion karena sudah divalidasi
    const supabase = createClient(
      supabaseUrl as string, 
      supabaseKey as string
    );
    
    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('waitlist')
      .select('count', { count: 'exact', head: true });

    if (testError) {
      console.error('Supabase connection error:', testError);
      return NextResponse.json(
        { 
          error: 'Database Error',
          message: 'Failed to connect to Supabase database',
          details: testError.message
        },
        { status: 500 }
      );
    }

    console.log('Supabase connection successful, fetching data...');
    
    // Fetch all subscribers
    const { data: subscribers, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    console.log(`Fetched ${subscribers?.length || 0} subscribers`);
    
    return NextResponse.json({ 
      success: true,
      subscribers: subscribers || [],
      count: subscribers?.length || 0,
      timestamp: new Date().toISOString(),
      demo: false
    });
    
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: error.message || 'An unexpected error occurred',
        demo: true
      },
      { status: 500 }
    );
  }
}

// ================= POST HANDLER =================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, company, role, industry, interest, referral_source, referrer_code } = body;

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // FIXED: Gunakan type assertion karena sudah divalidasi
    const supabase = createClient(
      supabaseUrl as string, 
      supabaseKey as string
    );
    
    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (checkError) {
      console.error('Check email error:', checkError);
    }

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Get total count for position
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    // Generate referral code
    const referral_code = generateReferralCode();
    const position = (count || 0) + 1;
    
    // Insert new subscriber
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          name: name || null,
          company: company || null,
          role: role || null,
          industry: industry || null,
          interest: interest || 'learning',
          referral_source: referral_source || 'website',
          referrer_code: referrer_code || null,
          referral_code,
          subscribed_at: new Date().toISOString(),
          status: 'pending',
          position: position
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      // Check if it's a duplicate email error
      if (error.code === '23505') { // PostgreSQL unique violation
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }
      throw error;
    }

    console.log(`Added subscriber: ${email}, Position: ${position}`);

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      data: {
        ...data[0],
        position,
        total: position
      }
    }, { status: 201 });
    
  } catch (error: any) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to add to waitlist' },
      { status: 500 }
    );
  }
}

// ================= DELETE HANDLER =================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const secret = searchParams.get('secret');

    // Check admin secret
    const adminSecret = process.env.ADMIN_SECRET;
    if (secret !== adminSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // FIXED: Gunakan type assertion
    const supabase = createClient(
      supabaseUrl as string, 
      supabaseKey as string
    );

    const { error } = await supabase
      .from('waitlist')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: 'Failed to delete subscriber' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
    
  } catch (error: any) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}