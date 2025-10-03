import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const ticketId = params.ticketId;
  const timestamp = Date.now();

  try {
    // Generate QR code with current timestamp
    const qrBuffer = await QRCode.toBuffer(
      `TICKET:${ticketId}|TIMESTAMP:${timestamp}`,
      {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }
    );

    // Return QR code as PNG image with no-cache headers
    return new NextResponse(qrBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return new NextResponse('Error generating QR code', { status: 500 });
  }
}
