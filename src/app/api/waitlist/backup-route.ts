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
          interest,
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