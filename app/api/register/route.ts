import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import QRCode from 'qrcode';
import { randomBytes } from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Generate unique ticket ID
    const ticketId = randomBytes(16).toString('hex');

    // Create dynamic QR code URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const qrCodeUrl = `${baseUrl}/api/qr/${ticketId}?t=${Date.now()}`;

    // Send email with ticket
    const data = await resend.emails.send({
      from: 'UTIX Events <noreply@events.utix.com>',
      to: [email],
      subject: 'Your Registration for UTIX Investor Presentation',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <title>Your UTIX Event Ticket</title>
            <style>
              @media only screen and (max-width: 600px) {
                .email-container {
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .padding {
                  padding: 20px 15px !important;
                }
                .heading {
                  font-size: 28px !important;
                }
                .qr-container {
                  padding: 20px 15px !important;
                }
                .qr-image {
                  width: 240px !important;
                  height: 240px !important;
                }
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #fff5f0 0%, #ffe4e6 100%);">
            <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 10px;">
              <tr>
                <td align="center">
                  <!-- Logo -->
                  <div style="margin-bottom: 20px;">
                    <img src="${baseUrl}/logo-01.svg" alt="UTIX" style="height: 40px; width: auto; max-width: 150px;" />
                  </div>

                  <table class="email-container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 24px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); overflow: hidden;">

                    <!-- Header -->
                    <tr>
                      <td class="padding" style="background: linear-gradient(135deg, #ea580c 0%, #f97316 100%); padding: 40px 20px; text-align: center;">
                        <h1 class="heading" style="margin: 0; color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: -0.5px;">🎟️ You're In!</h1>
                        <p style="margin: 10px 0 0; color: #fed7aa; font-size: 16px;">Your NFT Access Ticket is Ready</p>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td class="padding" style="padding: 30px 20px;">
                        <p style="margin: 0 0 20px; font-size: 18px; color: #111827;">Hi ${name},</p>
                        <p style="margin: 0 0 30px; font-size: 16px; color: #4b5563; line-height: 1.6;">
                          Thank you for registering for the <strong>UTIX Investor Presentation</strong>! Your registration is confirmed.
                          Please save this QR code for event access.
                        </p>

                        <!-- Event Details Box -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 12px; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 24px;">
                              <h2 style="margin: 0 0 16px; font-size: 20px; color: #92400e;">📅 Event Details</h2>
                              <p style="margin: 0 0 8px; font-size: 16px; color: #78350f;"><strong>Event:</strong> UTIX: The Future of Ticketing - Investor Presentation</p>
                              <p style="margin: 0 0 8px; font-size: 16px; color: #78350f;"><strong>Date:</strong> Thursday, October 16, 2025</p>
                              <p style="margin: 0 0 8px; font-size: 16px; color: #78350f;"><strong>Time:</strong> 4:00 PM EST</p>
                              <p style="margin: 0 0 8px; font-size: 16px; color: #78350f;"><strong>Format:</strong> Online (Zoom/Webinar)</p>
                              <p style="margin: 0; font-size: 14px; color: #92400e; font-style: italic;">*Link will be sent 24 hours before the event</p>
                            </td>
                          </tr>
                        </table>

                        <!-- Dynamic QR Code -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                          <tr>
                            <td class="qr-container" align="center" style="padding: 30px 20px; background: linear-gradient(135deg, #f0f9ff 0%, #fef3c7 100%); border-radius: 16px; border: 2px solid #ea580c;">
                              <div style="background: #ffffff; padding: 15px; border-radius: 12px; display: inline-block; box-shadow: 0 8px 20px rgba(234, 88, 12, 0.15);">
                                <img class="qr-image" src="${qrCodeUrl}" alt="Dynamic Ticket QR Code" width="280" height="280" style="display: block; max-width: 100%; height: auto;" />
                              </div>
                              <p style="margin: 15px 0 6px; font-size: 11px; color: #78350f; font-weight: 600;">🔄 This QR code refreshes each time you open this email</p>
                              <p style="margin: 0 0 6px; font-size: 13px; color: #92400e; font-weight: bold;">Ticket ID: ${ticketId.substring(0, 12).toUpperCase()}</p>
                              <p style="margin: 0; font-size: 11px; color: #78350f;">✨ Blockchain-secured | One-time use only</p>
                            </td>
                          </tr>
                        </table>

                        <!-- What You'll Learn -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 12px; margin-bottom: 30px;">
                          <tr>
                            <td style="padding: 24px;">
                              <h3 style="margin: 0 0 12px; font-size: 18px; color: #1e40af;">💡 What You'll Discover</h3>
                              <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; line-height: 1.8;">
                                <li>How UTIX is disrupting the $53B+ ticketing industry</li>
                                <li>MFSA-regulated blockchain technology</li>
                                <li>Fraud-proof smart contract tickets</li>
                                <li>Nearly 50% lower fees vs. industry average</li>
                                <li>Strategic partnerships and growth roadmap</li>
                              </ul>
                            </td>
                          </tr>
                        </table>

                        <!-- Speakers -->
                        <h3 style="margin: 0 0 16px; font-size: 18px; color: #111827;">Featured Speakers</h3>
                        <ul style="margin: 0 0 30px; padding-left: 24px; color: #4b5563; line-height: 1.8;">
                          <li><strong>Max Mayhew</strong> - Founder & Managing Director</li>
                          <li><strong>Mihkel Tali</strong> - Head of Development</li>
                          <li><strong>Jerome Robinson</strong> - VP of Sales</li>
                        </ul>

                        <!-- Important Note -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef2f2; border-left: 4px solid #dc2626; border-radius: 8px;">
                          <tr>
                            <td style="padding: 16px 20px;">
                              <p style="margin: 0; font-size: 14px; color: #991b1b;">
                                <strong>📧 Next Steps:</strong> You will receive the Zoom/Webinar link 24 hours before the event.
                                Add this event to your calendar so you don't miss it!
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">
                          Questions? Contact us at <a href="mailto:events@utix.com" style="color: #ea580c; text-decoration: none;">events@utix.com</a>
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                          Powered by <strong>UTIX</strong> | The Future of Ticketing
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Ticket sent successfully',
      ticketId,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to register' },
      { status: 500 }
    );
  }
}
