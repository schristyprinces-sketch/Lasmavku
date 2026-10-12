import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Calendar, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  QrCode as QrCodeIcon,
  Compass
} from 'lucide-react';
import { Booking } from '../types/tourism';
import confetti from 'canvas-confetti';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

export const TicketModal: React.FC<TicketModalProps> = ({
  isOpen,
  onClose,
  booking
}) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden my-auto no-print">
        
        {/* Top Action Bar (hidden on print) */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-200">
              Verified Electronic QR Travel Pass
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs font-semibold text-white transition cursor-pointer"
              title="Print official paper ticket"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Container */}
        <div id="printable-ticket" className="p-6 sm:p-8 bg-stone-50 border-8 border-stone-100">
          
          {/* Ticket Header & LGU Branding */}
          <div className="border-b-2 border-stone-800 pb-5 text-center relative">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Compass className="w-5 h-5 text-emerald-800" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-900">
                Republic of the Philippines · Province of Zamboanga del Sur
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-950 font-serif-title tracking-tight">
              LASMAVKU TOURISM PASS
            </h1>
            <p className="text-[11px] text-stone-600 font-medium mt-0.5">
              Lapuyan · San Miguel · Margosatubig · Vincenzo A. Sagun · Kumalarang
            </p>

            {/* Status Stamp */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700 text-white rounded-md text-xs font-bold uppercase tracking-wider shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>OFFICIALLY APPROVED & ADMITTED</span>
            </div>
          </div>

          {/* Ticket Body: QR Code & Booking Manifest Details */}
          <div className="py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            
            {/* Left: Scannable QR Code */}
            <div className="sm:col-span-1 flex flex-col items-center justify-center text-center p-3 bg-white rounded-xl border-2 border-dashed border-stone-300 shadow-xs">
              {booking.qrCodeDataUrl ? (
                <img
                  src={booking.qrCodeDataUrl}
                  alt="Official Admission QR Code"
                  className="w-36 h-36 object-contain rounded-md cursor-pointer"
                  onClick={handleTriggerConfetti}
                  title="Click to celebrate / test scan"
                />
              ) : (
                <div className="w-36 h-36 bg-stone-100 flex items-center justify-center text-stone-400">
                  <QrCodeIcon className="w-12 h-12" />
                </div>
              )}
              <span className="font-mono-code text-[10px] text-stone-700 font-bold mt-2">
                {booking.bookingReference}
              </span>
              <span className="text-[9px] text-stone-400 font-mono-code truncate max-w-[130px]">
                {booking.qrToken.slice(0, 16)}...
              </span>
            </div>

            {/* Right: Booking Manifest Metadata */}
            <div className="sm:col-span-2 space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                  Tour Package & Circuit
                </span>
                <span className="text-sm font-extrabold text-stone-900 block leading-snug">
                  {booking.packageName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Lead Traveler
                  </span>
                  <span className="font-bold text-stone-900 text-xs">{booking.touristName}</span>
                  <span className="text-[11px] text-stone-500 block truncate">{booking.touristEmail}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Group Manifest Size
                  </span>
                  <span className="font-bold text-emerald-800 text-sm">{booking.paxCount} Persons (Pax)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Admit Date
                  </span>
                  <span className="font-bold text-stone-900 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-700" />
                    {booking.travelDate}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Total Revenue Settled
                  </span>
                  <span className="font-mono-code font-bold text-stone-900">
                    ₱{booking.totalAmount.toLocaleString()} (GCash)
                  </span>
                </div>
              </div>

              {booking.selectedHotelName && (
                <div className="pt-1 border-t border-stone-200">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Bundled Accommodation
                  </span>
                  <span className="font-medium text-stone-800">{booking.selectedHotelName} ({booking.hotelNights} Nights)</span>
                </div>
              )}
            </div>

          </div>

          {/* Ticket Security & Checkpoint Verification Footer */}
          <div className="pt-4 border-t-2 border-stone-800 text-[10px] text-stone-600 space-y-1">
            <div className="flex justify-between items-center text-stone-700 font-medium">
              <span>Verified By: {booking.reviewedBy || 'Authorized Tourism Office'}</span>
              <span>Reviewed At: {booking.reviewedAt || booking.createdAt}</span>
            </div>
            {booking.checkedInAt && (
              <div className="p-2 bg-emerald-100/70 border border-emerald-300 rounded text-emerald-950 font-bold flex items-center justify-between">
                <span>GATE ADMISSION RECORDED</span>
                <span>Checked-in: {booking.checkedInAt} ({booking.checkedInBy || 'Tourism Officer'})</span>
              </div>
            )}
            <p className="text-stone-500 italic pt-1">
              * Present this digital pass or physical printout at designated municipal tourism checkpoints, wharf terminals, or eco-park gates. The QR-code will be scanned against live LGU server records.
            </p>
          </div>

        </div>

        {/* Modal Bottom Footer (hidden on print) */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500 text-[11px]">
            GCash Ref: <strong className="font-mono-code">{booking.gcashReceipt?.referenceNumber || 'VERIFIED'}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition cursor-pointer"
          >
            Close Pass
          </button>
        </div>

      </div>
    </div>
  );
};
