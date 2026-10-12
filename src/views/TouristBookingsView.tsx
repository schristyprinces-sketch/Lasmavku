import React, { useState } from 'react';
import { 
  Bookmark, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  QrCode, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { Booking, UserAccount } from '../types/tourism';
import { getBookingsForTourist } from '../services/storageService';

interface TouristBookingsViewProps {
  currentUser: UserAccount;
  onOpenTicket: (booking: Booking) => void;
  onNavigate: (view: string) => void;
}

export const TouristBookingsView: React.FC<TouristBookingsViewProps> = ({
  currentUser,
  onOpenTicket,
  onNavigate
}) => {
  const bookings = getBookingsForTourist(currentUser.email);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending_review'>('all');

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    return b.bookingStatus === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <Bookmark className="w-4 h-4 text-emerald-700" />
            <span>Tourist Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif-title tracking-tight mt-0.5">
            My Tour Bookings & E-Tickets
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Logged in as <strong className="text-stone-800">{currentUser.fullName}</strong> ({currentUser.email}).
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filter === 'approved' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Approved Passes ({bookings.filter(b => b.bookingStatus === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('pending_review')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              filter === 'pending_review' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Pending Review ({bookings.filter(b => b.bookingStatus === 'pending_review').length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map(b => {
            const isApproved = b.bookingStatus === 'approved';
            const isPending = b.bookingStatus === 'pending_review';
            const isRejected = b.bookingStatus === 'rejected';

            return (
              <div
                key={b.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                {/* Left: Booking Details */}
                <div className="space-y-3 flex-1 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-code font-bold text-xs bg-stone-100 px-2 py-0.5 rounded text-stone-800">
                      {b.bookingReference}
                    </span>

                    {/* Status Badge */}
                    {isApproved && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approved & QR Pass Issued
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        Pending LGU Receipt Review
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 font-bold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Verification Rejected
                      </span>
                    )}

                    <span className="text-stone-400 text-[11px]">Booked on: {b.createdAt}</span>
                  </div>

                  <h3 className="text-base font-extrabold font-serif-title text-stone-900 leading-snug">
                    {b.packageName}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-600 pt-1">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Travel Date</span>
                      <span className="font-bold text-stone-900 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-emerald-700" />
                        {b.travelDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Party Size</span>
                      <span className="font-bold text-stone-900 flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-700" />
                        {b.paxCount} Travelers
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">GCash Reference</span>
                      <span className="font-mono-code font-bold text-stone-800">
                        {b.gcashReceipt?.referenceNumber || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-bold block">Total Amount</span>
                      <span className="font-extrabold text-emerald-800 text-sm">
                        ₱{b.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Rejection Note */}
                  {isRejected && b.rejectionReason && (
                    <div className="p-3 bg-red-50 rounded-lg text-red-900 text-xs">
                      <strong>Rejection reason:</strong> {b.rejectionReason}
                    </div>
                  )}

                  {/* Check-in stamp */}
                  {b.checkedInAt && (
                    <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Admitted at gate on: {b.checkedInAt} ({b.checkedInBy || 'Tourism Officer'})</span>
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row items-stretch md:items-center gap-2">
                  {isApproved ? (
                    <button
                      onClick={() => onOpenTicket(b)}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>View & Print QR Ticket</span>
                    </button>
                  ) : isPending ? (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center text-xs text-stone-500">
                      <span>Awaiting LGU Officer Audit</span>
                    </div>
                  ) : null}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-2xl border border-stone-200 space-y-4">
          <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-stone-900">No bookings found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              You haven't booked any tour circuits yet. Explore our multi-town circuits across Zamboanga del Sur!
            </p>
          </div>
          <button
            onClick={() => onNavigate('packages')}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Explore Tour Packages
          </button>
        </div>
      )}

    </div>
  );
};
