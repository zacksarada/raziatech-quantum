// Pastikan ini isi email.ts - PAKAI FETCH, BUKAN RESEND PACKAGE
export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: email,
        subject: '🚀 Welcome to RaziaTech Quantum Waitlist!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; font-size: 32px;">Welcome to the Quantum Revolution!</h1>
            </div>
            <div style="padding: 30px; background: #f9fafb;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for joining the RaziaTech Quantum waitlist.</p>
              <p>You're now part of an exclusive group preparing for the quantum era.</p>
              <p>We'll notify you when early access becomes available.</p>
              <p>Best regards,<br><strong>The RaziaTech Quantum Team</strong></p>
            </div>
          </div>
        `,
        text: `Welcome ${name}!\n\nThank you for joining the RaziaTech Quantum waitlist.\n\nWe'll notify you when early access becomes available.\n\nBest,\nThe RaziaTech Quantum Team`
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent to:', email);
      return { success: true, data };
    } else {
      console.error('❌ Email API error:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('❌ Email fetch error:', error);
    return { success: false, error };
  }
}
