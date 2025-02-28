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

interface WelcomeEmailProps {
  username?: string;
}

export const WelcomeEmail = ({
  username = 'User',
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="/react_logo.svg"
            width="150"
            height="50"
            alt="Logo"
            style={logo}
          />
          <Heading style={heading}>Welcome, {username}!</Heading>
          <Section style={section}>
            <Text style={text}>
              We're thrilled to have you on board. Get started by exploring our platform
              and discovering all the amazing features we offer.
            </Text>
            <Text style={text}>
              If you have any questions or need assistance, don't hesitate to reach out to our support team.
            </Text>
          </Section>
          <Section style={buttonContainer}>
            <Link style={button} href="https://example.com/dashboard">
              Go to Dashboard
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

export default WelcomeEmail;

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
