import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface NotificationEmailProps {
  username?: string;
  message?: string;
  actionUrl?: string;
  actionText?: string;
}

export const NotificationEmail = ({
  username = 'User',
  message = 'You have a new notification',
  actionUrl = 'https://example.com/notifications',
  actionText = 'View Notification',
}: NotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>{message}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://via.placeholder.com/150x50?text=Logo"
            width="150"
            height="50"
            alt="Logo"
            style={logo}
          />
          <Heading style={heading}>Hello, {username}!</Heading>
          <Section style={section}>
            <Text style={text}>
              {message}
            </Text>
          </Section>
          <Section style={buttonContainer}>
            <Link style={button} href={actionUrl}>
              {actionText}
            </Link>
          </Section>
          <Text style={footer}>
            © 2025 Email App. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NotificationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const logo = {
  margin: '0 auto',
  marginBottom: '24px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  textAlign: 'center' as const,
};

const section = {
  padding: '20px',
  borderRadius: '5px',
  backgroundColor: '#ffffff',
  marginBottom: '24px',
};

const text = {
  margin: '0 0 16px',
  color: '#484848',
  fontSize: '16px',
  lineHeight: '24px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginBottom: '10px',
  textAlign: 'center' as const,
};
