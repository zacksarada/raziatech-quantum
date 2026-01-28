import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '@/lib/email'; // ✅ IMPORT YANG BENAR

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { email, name, referral_source = 'direct', referrer_code } = await request.json();

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check existing
    const { data: existing } = await supabase
      .from('waitlist_subscribers')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Email already registered', code: 'DUPLICATE' },
        { status: 200 }
      );
    }

    // Generate referral code
    const referral_code = generateReferralCode();

    // Insert to database
    const { data, error } = await supabase
      .from('waitlist_subscribers')
      .insert([{
        email: email.toLowerCase(),
        name: name || null,
        referral_source,
        referrer_code: referrer_code || null,
        referral_code,
        subscribed_at: new Date().toISOString(),
        email_sent: false,
        email_opened: false,
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save subscription' },
        { status: 500 }
      );
    }

    // ✅ GANTI FUNCTION CALL DI SINI
    sendWelcomeEmail(email, name || '')  // ✅ NAMA FUNCTION YANG BENAR
      .then(async (result) => {
        if (result.success) {
          await supabase
            .from('waitlist_subscribers')
            .update({ email_sent: true })
            .eq('id', data.id);
        }
      })
      .catch(console.error);

    // If referrer exists, update their count
    if (referrer_code) {
      await supabase
        .from('waitlist_subscribers')
        .update({
          referral_count: supabase.rpc('increment', { x: 1 })
        })
        .eq('referral_code', referrer_code);
    }

    // Get waitlist position
    const position = await getWaitlistPosition(data.id);

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      data: {
        ...data,
        referral_code,
        position
      },
      total: position + 1
    }, { status: 201 });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const format = searchParams.get('format');
    const exportParam = searchParams.get('export');
    
    // Public endpoint untuk stats (tanpa secret)
    if (!secret) {
      const { count, error: countError } = await supabase
        .from('waitlist_subscribers')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        console.error('Count error:', countError);
        return NextResponse.json(
          { success: false, error: 'Failed to get count' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        total_subscribers: count || 0,
        remaining_spots: 1000 - (count || 0),
        storage: 'supabase',
        timestamp: new Date().toISOString()
      });
    }
    
    // Admin endpoint (butuh secret)
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    // Get all subscribers for admin
    const { data, error } = await supabase
      .from('waitlist_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });
    
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch data' },
        { status: 500 }
      );
    }
    
    // Format 1: CSV Export
    if (exportParam === 'csv') {
      const headers = ['ID', 'Email', 'Name', 'Referral Source', 'Referral Code', 'Referrer Code', 'Subscribed At', 'Email Sent', 'Email Opened', 'Referral Count'];
      const csvData = [
        headers.join(','),
        ...data.map(sub => [
          sub.id,
          `"${sub.email}"`,
          `"${sub.name || ''}"`,
          `"${sub.referral_source || ''}"`,
          `"${sub.referral_code || ''}"`,
          `"${sub.referrer_code || ''}"`,
          `"${sub.subscribed_at}"`,
          sub.email_sent ? 'Yes' : 'No',
          sub.email_opened ? 'Yes' : 'No',
          sub.referral_count || 0
        ].join(','))
      ].join('\n');
      
      return new Response(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="waitlist-subscribers.csv"'
        }
      });
    }
    
    // Format 2: Raw array (backward compatibility)
    if (format === 'raw') {
      return NextResponse.json(data);
    }
    
    // Format 3: Dashboard format (DEFAULT) - dengan metadata
    return NextResponse.json({
      success: true,
      data: data || [],
      total: data?.length || 0,
      summary: {
        total_subscribers: data?.length || 0,
        remaining_spots: 1000 - (data?.length || 0),
        emails_sent: data?.filter(s => s.email_sent).length || 0,
        emails_opened: data?.filter(s => s.email_opened).length || 0
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE handler untuk admin
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const id = searchParams.get('id');
    
    // Verify admin secret
    if (!secret || secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' }, 
        { status: 401 }
      );
    }
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID is required' }, 
        { status: 400 }
      );
    }
    
    // Delete subscriber
    const { error } = await supabase
      .from('waitlist_subscribers')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions
function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function getWaitlistPosition(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('waitlist_subscribers')
    .select('id', { count: 'exact', head: true })
    .lt('subscribed_at', new Date().toISOString());

  if (error || count === null) return 0;
  return count;
}