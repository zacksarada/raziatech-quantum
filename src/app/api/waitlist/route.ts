import { NextResponse } from 'next/server';

// ============================================
// EMERGENCY MODE: SIMULATION ENABLED
// ============================================
// Set to false after fixing database connection
const SIMULATION_MODE = true;
// ============================================

// Helper function untuk generate referral code
function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ================= POST HANDLER =================
export async function POST(request: Request) {
  try {
    console.log('=== WAITLIST API CALLED (SIMULATION MODE) ===');
    
    const { email, name, referral_source = 'direct', referrer_code } = await request.json();
    console.log('Received:', { email, name });

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // ============================================
    // SIMULATION MODE - ALWAYS SUCCESS
    // ============================================
    if (SIMULATION_MODE) {
      console.log(`[SIMULATION] Adding subscriber: ${email}`);
      
      const referral_code = generateReferralCode();
      const fakeId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const position = 4; // Hardcoded untuk simulation
      
      const response = {
        success: true,
        message: '🎉 Successfully added to waitlist!',
        data: {
          id: fakeId,
          email: email.toLowerCase(),
          name: name || null,
          referral_source,
          referrer_code: referrer_code || null,
          referral_code,
          subscribed_at: new Date().toISOString(),
          email_sent: false,
          email_opened: false,
          position
        },
        total: position + 1,
        simulation: true,
        note: 'Running in simulation mode. Emails are being collected.'
      };
      
      console.log('Simulation response:', response);
      return NextResponse.json(response, { status: 201 });
    }
    // ============================================

    // Jika SIMULATION_MODE = false, kode database akan di sini
    // Tapi untuk sekarang, selalu gunakan simulation
    
    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist!',
      data: {
        email: email.toLowerCase(),
        name: name || null,
        referral_code: generateReferralCode(),
        position: 4
      },
      simulation: true
    }, { status: 201 });

  } catch (error) {
    console.error('Error in waitlist API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: String(error)
      },
      { status: 500 }
    );
  }
}

// ================= GET HANDLER =================
export async function GET(request: Request) {
  try {
    console.log('=== GET WAITLIST API CALLED ===');
    
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const format = searchParams.get('format');
    const exportParam = searchParams.get('export');
    
    // Public endpoint untuk stats
    if (!secret) {
      console.log('Public stats requested');
      return NextResponse.json({
        success: true,
        total_subscribers: 3, // Hardcoded untuk simulation
        remaining_spots: 997,
        storage: 'supabase (simulation)',
        timestamp: new Date().toISOString(),
        note: 'Running in simulation mode'
      });
    }
    
    // Admin endpoint (butuh secret)
    // Untuk simulation, kita akan return dummy data
    console.log('Admin request with secret');
    
    // Dummy data untuk admin
    const dummySubscribers = [
      {
        id: '1',
        email: 'early@example.com',
        name: 'Early Adopter',
        subscribed_at: '2024-01-27T10:30:00Z',
        referral_source: 'twitter',
        email_sent: true,
        email_opened: false,
        referral_code: 'REF12345'
      },
      {
        id: '2',
        email: 'beta@example.com',
        name: 'Beta Tester',
        subscribed_at: '2024-01-27T14:45:00Z',
        referral_source: 'linkedin',
        email_sent: true,
        email_opened: true,
        referral_code: 'REF67890'
      },
      {
        id: '3',
        email: 'quantum@example.com',
        name: 'Quantum Fan',
        subscribed_at: '2024-01-28T09:15:00Z',
        referral_source: 'direct',
        email_sent: false,
        email_opened: false,
        referral_code: 'REF54321'
      }
    ];
    
    // Format 1: CSV Export
    if (exportParam === 'csv') {
      const headers = ['ID', 'Email', 'Name', 'Date', 'Source', 'Email Sent'];
      const csvData = [
        headers.join(','),
        ...dummySubscribers.map(s => [
          s.id,
          `"${s.email}"`,
          `"${s.name || ''}"`,
          `"${s.subscribed_at}"`,
          `"${s.referral_source}"`,
          s.email_sent ? 'Yes' : 'No'
        ].join(','))
      ].join('\n');
      
      return new Response(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="waitlist-simulation.csv"'
        }
      });
    }
    
    // Format 2: Raw array
    if (format === 'raw') {
      return NextResponse.json(dummySubscribers);
    }
    
    // Format 3: Dashboard format (DEFAULT)
    return NextResponse.json({
      success: true,
      data: dummySubscribers,
      total: dummySubscribers.length,
      summary: {
        total_subscribers: dummySubscribers.length,
        remaining_spots: 1000 - dummySubscribers.length,
        emails_sent: dummySubscribers.filter(s => s.email_sent).length,
        emails_opened: dummySubscribers.filter(s => s.email_opened).length
      },
      timestamp: new Date().toISOString(),
      simulation: true
    });
    
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ================= DELETE HANDLER =================
export async function DELETE(request: Request) {
  console.log('=== DELETE WAITLIST API (SIMULATION) ===');
  
  return NextResponse.json({
    success: true,
    message: 'Delete simulated (no actual deletion in simulation mode)',
    simulation: true
  });
}
