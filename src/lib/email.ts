// src/lib/email.ts - ULTRA SIMPLE VERSION
export async function sendWelcomeEmail(email: string, name: string) {
  console.log('[EMAIL SIMULATION] sendWelcomeEmail called for:', email);
  
  // Always return success for now
  return { success: true, simulated: true, message: 'Email simulation mode' };
}

// Alias functions
export const sendWaitlistEmail = sendWelcomeEmail;
export const sendWaitlistConfirmation = sendWelcomeEmail;
