import { NextRequest, NextResponse } from 'next/server';
import { renderAsync } from '@react-email/render';
import WelcomeEmail from '@/app/emails/welcome-email';
import NotificationEmail from '@/app/emails/notification-email';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'welcome';
    const username = searchParams.get('username') || 'User';
    const message = searchParams.get('message') || 'You have a new notification';
    const actionUrl = searchParams.get('actionUrl') || 'https://example.com';
    const actionText = searchParams.get('actionText') || 'View Details';

    let emailHtml;

    // Render the appropriate email template based on type
    switch (type) {
      case 'welcome':
        emailHtml = await renderAsync(WelcomeEmail({
          username
        }));
        break;

      case 'notification':
        emailHtml = await renderAsync(NotificationEmail({
          username,
          message,
          actionUrl,
          actionText
        }));
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    return new NextResponse(emailHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error rendering email:', error);
    return NextResponse.json(
      { error: 'Failed to render email' },
      { status: 500 }
    );
  }
}
