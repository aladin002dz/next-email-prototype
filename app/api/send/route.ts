import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import WelcomeEmail from '@/app/emails/welcome-email';

// Initialize Resend with your API key
// You should add your API key to .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { to, subject, data } = await req.json();

    if (!to) {
      return NextResponse.json(
        { error: 'Recipient email is required' },
        { status: 400 }
      );
    }

    // Render the welcome email template
    const emailHtml = await render(WelcomeEmail({
      username: data?.username || 'User'
    }));
    const emailSubject = subject || 'Welcome to Our Platform!';

    // Send the email using Resend
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL ? `MaroStudio <${process.env.FROM_EMAIL}>` : 'MaroStudio <hello@marostudio.dev>',
      to,
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
