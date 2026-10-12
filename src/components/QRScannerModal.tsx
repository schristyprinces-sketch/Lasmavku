import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  Scan, 
  UserCheck, 
  Calendar, 
  Users, 
  ShieldCheck, 
  MapPin,
  Clock
} from 'lucide-react';
import { Booking, UserAccount } from '../types/tourism';
import { checkInBookingTicket, getBookings } from '../services/storageService';
import confetti from 'canvas-confetti';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    booking?: Booking;
  } | null>(null);

  const bookings = getBookings();
  const approvedBookings = bookings.filter(b => b.bookingStatus === 'approved');

  const handleValidate = (codeToTest?: string) => {
    const code = (codeToTest || inputCode).trim();
    if (!code) {
      alert('Please enter a booking reference or QR token to validate.');
      return;
    }

    const res = checkInBookingTicket(code, `${currentUser.fullName} (${currentUser.title || currentUser.role})`);
    setResult(res);

    if (res.success && !res.message.includes('Warning')) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleQuickTest = (booking: Booking) => {
    setInputCode(booking.bookingReference);
    handleValidate(booking.bookingReference);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-900 text-white rounded-t-2xl flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-title">
                Gatekeeper QR Ticket Validator
              </h2>
              <p className="text-xs text-stone-300">
                Municipal Checkpoint & Wharf Terminal Admission Scanner
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Instructions */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Tourism personnel at docks, checkpoints, or eco-park gates can verify authentic tickets by scanning QR tokens or entering reference numbers.
            </span>
          </div>

          {/* Input field & Scan Simulation */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700">
              Enter Booking Reference (e.g. LSM-2026-0814) or Paste QR Token:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. LSM-2026-0814"
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleValidate()}
                className="flex-1 text-xs font-mono-code font-bold px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
              />
              <button
                type="button"
                onClick={() => handleValidate()}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition cursor-pointer text-xs flex items-center gap-1.5 shadow-xs"
              >
                <UserCheck className="w-4 h-4" />
                <span>Verify & Admit</span>
              </button>
            </div>
          </div>

          {/* Quick Select from Active Approved Bookings */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
              Quick Test: Active Approved Bookings in Database
            </span>
            <div className="flex flex-wrap gap-2">
              {approvedBookings.slice(0, 4).map(b => (
                <button
                  key={b.id}
                  onClick={() => handleQuickTest(b)}
                  className="px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 text-[11px] font-medium text-stone-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  <span className="font-mono-code font-bold text-emerald-800">{b.bookingReference}</span>
                  <span>({b.touristName.split(' ')[0]} - {b.paxCount}pax)</span>
                </button>
              ))}
            </div>
          </div>

          {/* Validation Result Box */}
          {result && (
            <div className={`p-4 rounded-xl border animate-in fade-in space-y-3 ${
              result.success 
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                : 'bg-red-50 border-red-200 text-red-950'
            }`}>
              <div className="flex items-start gap-2.5">
                {result.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">
                    {result.success ? 'Ticket Validated Successfully' : 'Validation Failed / Invalid'}
                  </h4>
                  <p className="text-xs mt-0.5 font-medium">{result.message}</p>
                </div>
              </div>

              {result.booking && (
                <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs space-y-1.5 text-stone-800">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Tour Package:</span>
                    <span className="font-bold text-stone-900 text-right">{result.booking.packageName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Lead Guest:</span>
                    <span className="font-semibold">{result.booking.touristName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Total Group Size:</span>
                    <span className="font-extrabold text-emerald-800 text-sm">{result.booking.paxCount} Persons (Pax)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Scheduled Date:</span>
                    <span>{result.booking.travelDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Payment Audit:</span>
                    <span className="font-bold text-emerald-700">VERIFIED PAID (₱{result.booking.totalAmount.toLocaleString()})</span>
                  </div>
                  {result.booking.checkedInAt && (
                    <div className="flex justify-between pt-1 border-t border-stone-100 text-[11px] text-stone-600">
                      <span>Gate Admission Timestamp:</span>
                      <span className="font-mono-code font-bold">{result.booking.checkedInAt}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500 text-[11px]">
            Operating Officer: <strong>{currentUser.fullName}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-900 text-white font-semibold hover:bg-stone-800 transition cursor-pointer"
          >
            Close Scanner
          </button>
        </div>

      </div>
    </div>
  );
};
