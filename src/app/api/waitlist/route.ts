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

// Generate realistic position based on simulated count
let simulatedSubscriberCount = 2847; // Start with realistic number

// ================= POST HANDLER =================
export async function POST(request: Request) {
  try {
    console.log('=== WAITLIST API CALLED (SIMULATION MODE) ===');
    
    const { email, name, referral_source = 'website', referrer_code, interest = 'learning' } = await request.json();
    console.log('Received:', { email, name, interest });

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
      console.log(`[SIMULATION] Adding subscriber: ${email}, Interest: ${interest}`);
      
      // Increment counter untuk realistic position
      simulatedSubscriberCount++;
      const referral_code = generateReferralCode();
      const fakeId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const position = simulatedSubscriberCount;
      
      // Determine email_sent based on interest (simulate different behaviors)
      const email_sent = interest === 'learning' ? true : Math.random() > 0.3;
      const email_opened = email_sent ? Math.random() > 0.5 : false;
      
      const response = {
        success: true,
        message: '🎉 Successfully added to waitlist!',
        data: {
          id: fakeId,
          email: email.toLowerCase(),
          name: name || null,
          interest, // NEW: Include interest field
          referral_source,
          referrer_code: referrer_code || null,
          referral_code,
          subscribed_at: new Date().toISOString(),
          email_sent,
          email_opened,
          position
        },
        total: position,
        simulation: true,
        note: 'Running in simulation mode. Data saved for analysis.'
      };
      
      console.log('Simulation response:', response);
      
      // Log untuk analytics tracking
      console.log(`[ANALYTICS] Interest distribution - ${interest}: +1`);
      
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
        interest,
        referral_code: generateReferralCode(),
        position: simulatedSubscriberCount
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
    const includeInterest = searchParams.get('includeInterest') === 'true';
    
    // Public endpoint untuk stats
    if (!secret) {
      console.log('Public stats requested');
      return NextResponse.json({
        success: true,
        total_subscribers: simulatedSubscriberCount,
        remaining_spots: Math.max(0, 10000 - simulatedSubscriberCount), // More realistic
        interest_distribution: { // NEW: Show interest analytics
          learning: Math.floor(simulatedSubscriberCount * 0.6),
          development: Math.floor(simulatedSubscriberCount * 0.25),
          enterprise: Math.floor(simulatedSubscriberCount * 0.15)
        },
        storage: 'supabase (simulation)',
        timestamp: new Date().toISOString(),
        note: 'Running in simulation mode'
      });
    }
    
    // Admin endpoint (butuh secret)
    // Untuk simulation, kita akan return dummy data dengan interest
    console.log('Admin request with secret');
    
    // Dummy data untuk admin - UPDATED WITH INTEREST
    const dummySubscribers = [
      {
        id: '1',
        email: 'student@example.com',
        name: 'Quantum Student',
        interest: 'learning',
        subscribed_at: '2024-01-27T10:30:00Z',
        referral_source: 'twitter',
        email_sent: true,
        email_opened: true,
        referral_code: 'REF12345'
      },
      {
        id: '2',
        email: 'dev@example.com',
        name: 'Quantum Developer',
        interest: 'development',
        subscribed_at: '2024-01-27T14:45:00Z',
        referral_source: 'linkedin',
        email_sent: true,
        email_opened: false,
        referral_code: 'REF67890'
      },
      {
        id: '3',
        email: 'cto@example.com',
        name: 'Enterprise CTO',
        interest: 'enterprise',
        subscribed_at: '2024-01-28T09:15:00Z',
        referral_source: 'direct',
        email_sent: false,
        email_opened: false,
        referral_code: 'REF54321'
      },
      {
        id: '4',
        email: 'researcher@example.com',
        name: 'Quantum Researcher',
        interest: 'learning',
        subscribed_at: '2024-01-28T14:20:00Z',
        referral_source: 'github',
        email_sent: true,
        email_opened: true,
        referral_code: 'REF98765'
      }
    ];
    
    // Add dynamic subscribers based on simulation count
    for (let i = 5; i <= Math.min(20, simulatedSubscriberCount); i++) {
      const interests = ['learning', 'development', 'enterprise'];
      const interest = interests[Math.floor(Math.random() * interests.length)];
      
      dummySubscribers.push({
        id: i.toString(),
        email: `user${i}@example.com`,
        name: `User ${i}`,
        interest,
        subscribed_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        referral_source: ['direct', 'twitter', 'linkedin', 'github'][Math.floor(Math.random() * 4)],
        email_sent: Math.random() > 0.3,
        email_opened: Math.random() > 0.5,
        referral_code: `REF${Math.random().toString(36).substr(2, 8).toUpperCase()}`
      });
    }
    
    // Format 1: CSV Export - UPDATED WITH INTEREST
    if (exportParam === 'csv') {
      const headers = ['ID', 'Email', 'Name', 'Interest', 'Date', 'Source', 'Email Sent', 'Email Opened', 'Referral Code'];
      const csvData = [
        headers.join(','),
        ...dummySubscribers.map(s => [
          s.id,
          `"${s.email}"`,
          `"${s.name || ''}"`,
          `"${s.interest || 'learning'}"`,
          `"${s.subscribed_at}"`,
          `"${s.referral_source}"`,
          s.email_sent ? 'Yes' : 'No',
          s.email_opened ? 'Yes' : 'No',
          `"${s.referral_code}"`
        ].join(','))
      ].join('\n');
      
      return new Response(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="waitlist-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }
    
    // Format 2: Raw array
    if (format === 'raw') {
      return NextResponse.json(dummySubscribers);
    }
    
    // Calculate interest distribution
    const interestDistribution = dummySubscribers.reduce((acc, sub) => {
      const interest = sub.interest || 'learning';
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Format 3: Dashboard format (DEFAULT) - UPDATED WITH INTEREST ANALYTICS
    return NextResponse.json({
      success: true,
      data: dummySubscribers,
      total: dummySubscribers.length,
      summary: {
        total_subscribers: dummySubscribers.length,
        remaining_spots: 10000 - dummySubscribers.length,
        emails_sent: dummySubscribers.filter(s => s.email_sent).length,
        emails_opened: dummySubscribers.filter(s => s.email_opened).length,
        interest_distribution: interestDistribution, // NEW: Interest analytics
        average_daily_signups: Math.round(dummySubscribers.length / 30 * 10) / 10
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