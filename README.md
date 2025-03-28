# Email App with React Email

This is a [Next.js](https://nextjs.org) project that demonstrates how to create and send beautiful emails using React Email and Resend.

## Features

- Create beautiful, responsive emails using React components
- Welcome email template
- Preview emails before sending them
- View the HTML source of emails
- Send emails using Resend API
- Simple UI to test sending emails

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Resend](https://resend.com) account for sending emails

### Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following content:

```
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_verified_email@example.com
```

Replace `your_resend_api_key` with your actual Resend API key, which you can get from the [Resend dashboard](https://resend.com/api-keys).

The `FROM_EMAIL` should be a verified email in your Resend account. During development, you can use the default `onboarding@resend.dev` address.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter the recipient's email address
2. Customize the email content with the form fields
3. Click "Preview Email" to see how your email will look
   - The preview page offers two views:
     - Component Preview: Shows the email as rendered by React
     - HTML View: Shows the raw HTML that will be sent
   - You can copy the HTML to test in email clients
4. Click "Send Email" to deliver your message

## Email Template

### Welcome Email

A simple welcome email with a greeting, message, and call-to-action button.

## Customizing Template

You can customize the email template by modifying the file in the `app/emails` directory:

- `welcome-email.tsx`: Welcome email template

## API Endpoint

The app includes an API endpoint at `/api/send` that accepts POST requests with the following JSON body:

```json
{
  "type": "welcome",
  "to": "recipient@example.com",
  "subject": "Optional custom subject",
  "data": {
    "username": "Optional username"
  }
}
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Email Documentation](https://react.email/docs/introduction)
- [Resend Documentation](https://resend.com/docs/introduction)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.
