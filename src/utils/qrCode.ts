import QRCode from 'qrcode';

export async function generateQrCodeDataUrl(payload: string): Promise<string> {
  try {
    return await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 320,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return '';
  }
}

export function buildTicketQrPayload(booking: {
  bookingReference: string;
  qrToken: string;
  touristName: string;
  paxCount: number;
  travelDate: string;
  packageName: string;
  totalAmount: number;
}): string {
  // Generates structured verification payload
  return JSON.stringify({
    system: 'LASMAVKU-ZAMSUR',
    ref: booking.bookingReference,
    token: booking.qrToken,
    guest: booking.touristName,
    pax: booking.paxCount,
    date: booking.travelDate,
    tour: booking.packageName,
    total: booking.totalAmount,
    issuedBy: 'Official Tourism Board - Zamboanga del Sur'
  });
}
