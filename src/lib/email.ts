// src/lib/email.ts - MINIMAL WORKING VERSION
export async function sendWelcomeEmail(email: string, name: string) {
  try {
    console.log(\`[EMAIL] Would send welcome email to: \${email}, Name: \${name}\`);
    
    // Simulation mode jika tidak ada API key
    if (!process.env.RESEND_API_KEY) {
      console.log('[EMAIL SIMULATION] RESEND_API_KEY not set');
      return { success: true, simulated: true };
    }
    
    // HTML email content (sederhana)
    const htmlContent = \`
    <div style="font-family: sans-serif; padding: 20px;">
      <h2>Welcome to RaziaTech Quantum!</h2>
      <p>Hi \${name || 'there'},</p>
      <p>Thank you for joining our waitlist.</p>
      <p>We'll notify you when we launch!</p>
      <p>Best,<br>The RaziaTech Team</p>
    </div>\`;
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${process.env.RESEND_API_KEY}\`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
        to: email,
        subject: 'Welcome to RaziaTech Quantum Waitlist!',
        html: htmlContent,
        text: \`Welcome \${name || 'there'} to RaziaTech Quantum! We'll notify you when we launch.\`
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent:', data.id);
      return { success: true, data };
    } else {
      console.error('❌ Email error:', data);
      return { success: false, error: data };
    }
  } catch (error) {
    console.error('❌ Email exception:', error);
    return { success: false, error };
  }
}

// Alias functions
export const sendWaitlistEmail = sendWelcomeEmail;
export const sendWaitlistConfirmation = sendWelcomeEmail;
