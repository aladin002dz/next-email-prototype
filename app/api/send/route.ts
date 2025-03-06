import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderAsync } from '@react-email/render';
import WelcomeEmail from '../../emails/welcome-email';
import NotificationEmail from '../../emails/notification-email';

// Initialize Resend with your API key
// You should add your API key to .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { type, to, subject, data } = await req.json();

    if (!to) {
      return NextResponse.json(
        { error: 'Recipient email is required' },
        { status: 400 }
      );
    }

    let emailHtml;
    let emailSubject = subject || 'Email from Your App';

    // Render the appropriate email template based on type
    switch (type) {
      case 'welcome':
        emailHtml = await renderAsync(WelcomeEmail({
          username: data?.username || 'User'
        }));
        emailSubject = subject || 'Welcome to Our Platform!';
        break;

      case 'notification':
        emailHtml = await renderAsync(NotificationEmail({
          username: data?.username || 'User',
          message: data?.message || 'You have a new notification',
          actionUrl: data?.actionUrl || 'https://example.com',
          actionText: data?.actionText || 'View Details'
        }));
        emailSubject = subject || 'New Notification';
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

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
