import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: email,
      subject: '🚀 Welcome to RaziaTech Quantum Waitlist!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
            .header { background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); color: white; padding: 40px 20px; text-align: center; }
            .content { padding: 40px 30px; }
            .footer { padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .feature { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 32px;">Welcome to the Quantum Revolution!</h1>
              <p style="opacity: 0.9; margin-top: 10px;">You're now part of an exclusive group</p>
            </div>
            
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              
              <p>Thank you for joining the RaziaTech Quantum waitlist. You've taken the first step toward securing your organization's future in the quantum computing era.</p>
              
              <h3>What to expect:</h3>
              
              <div class="feature">
                <h4 style="margin-top: 0; color: #06b6d4;">🎯 Priority Access</h4>
                <p>Be among the first to experience our quantum-ready networking platform with exclusive early access.</p>
              </div>
              
              <div class="feature">
                <h4 style="margin-top: 0; color: #8b5cf6;">💰 Special Pricing</h4>
                <p>Lock in early-bird pricing with lifetime benefits reserved for our first supporters.</p>
              </div>
              
              <div class="feature">
                <h4 style="margin-top: 0; color: #10b981;">🗣️ Influence Development</h4>
                <p>Your feedback will directly shape our product roadmap and feature prioritization.</p>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="https://raziatech-quantum.vercel.app" class="cta-button">Visit Our Website</a>
              </div>
              
              <p>We're currently in active development and will keep you updated on our progress. The next email you receive will be when early access becomes available.</p>
              
              <p>In the meantime, connect with us:</p>
              <ul>
                <li><a href="https://linkedin.com/company/raziaquantum">LinkedIn</a> - Industry insights and updates</li>
                <li><a href="https://twitter.com/raziaquantum">Twitter</a> - Daily developments</li>
                <li><a href="https://raziatech-quantum.vercel.app/blog">Blog</a> - Technical deep dives</li>
              </ul>
              
              <p>Building the future,<br>
              <strong>The RaziaTech Quantum Team</strong></p>
            </div>
            
            <div class="footer">
              <p>RaziaTech Quantum &copy; ${new Date().getFullYear()}<br>
              Enterprise-grade quantum-ready networking infrastructure</p>
              <p style="font-size: 12px; color: #9ca3af;">
                You're receiving this email because you joined our waitlist at raziatech-quantum.vercel.app<br>
                <a href="https://raziatech-quantum.vercel.app/unsubscribe?email=${encodeURIComponent(email)}" style="color: #6b7280;">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to RaziaTech Quantum Waitlist!

Hi ${name},

Thank you for joining the RaziaTech Quantum waitlist. You've taken the first step toward securing your organization's future in the quantum computing era.

WHAT TO EXPECT:
• Priority Access: Be among the first to experience our quantum-ready networking platform
• Special Pricing: Lock in early-bird pricing with lifetime benefits
• Influence Development: Your feedback will directly shape our product roadmap

We're currently in active development and will keep you updated on our progress.

Connect with us:
• LinkedIn: https://linkedin.com/company/raziaquantum
• Twitter: https://twitter.com/raziaquantum
• Blog: https://raziatech-quantum.vercel.app/blog

Building the future,
The RaziaTech Quantum Team

---
RaziaTech Quantum © ${new Date().getFullYear()}
Enterprise-grade quantum-ready networking infrastructure

You're receiving this email because you joined our waitlist.
Unsubscribe: https://raziatech-quantum.vercel.app/unsubscribe?email=${encodeURIComponent(email)}
      `,
    });
    
    console.log('✅ Welcome email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error };
  }
}
