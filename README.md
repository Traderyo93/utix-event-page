# utix Event Page

A Next.js event registration page with automated ticket generation and QR codes.

## Features

- 🎨 Beautiful event landing page inspired by Luma
- 📧 Automated email ticketing with Resend
- 🎫 QR code generation for each ticket
- 📱 Responsive design with Tailwind CSS
- ⚡ Built with Next.js 15 and TypeScript

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up your Resend API key:
   - Go to https://resend.com/api-keys
   - Create a new API key
   - Add it to `.env.local`:
   ```
   RESEND_API_KEY=your_actual_api_key_here
   ```

3. Configure your domain in Resend:
   - Verify your domain in Resend dashboard
   - Update the `from` email in `app/api/register/route.ts` (line 38)

4. Add your event image:
   - Place your event image in `/public/event-image.jpg`
   - Or update the image path in `app/page.tsx`

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the event page.

## Deployment to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your `RESEND_API_KEY` environment variable in Vercel project settings
4. Deploy!

## Customization

### Event Details
Update event information in `app/page.tsx`:
- Event title, date, time
- Location details
- Event description
- Host information

### Email Template
Customize the ticket email in `app/api/register/route.ts`:
- Email styling
- Event details
- QR code appearance

### Styling
Modify `app/globals.css` and Tailwind classes in components for design changes.

## How It Works

1. User enters their name and email
2. API generates a unique ticket ID
3. QR code is created with ticket information
4. Email is sent via Resend with the QR code ticket
5. User receives their ticket instantly

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Resend (email)
- QRCode library
