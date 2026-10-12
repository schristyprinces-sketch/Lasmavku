import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Hotel, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  DollarSign,
  QrCode,
  Image as ImageIcon
} from 'lucide-react';
import { TourPackage, UserAccount, Accommodation, Booking } from '../types/tourism';
import { getAccommodations, createBooking, getMunicipalities } from '../services/storageService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourPackage: TourPackage | null;
  currentUser: UserAccount;
  onBookingCreated: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  tourPackage,
  currentUser,
  onBookingCreated
}) => {
  if (!isOpen || !tourPackage) return null;

  const accommodations = getAccommodations();
  const municipalities = getMunicipalities();

  // Find relevant accommodations (matching participating municipalities)
  const availableHotels = useMemo(() => {
    return accommodations.filter(acc => 
      tourPackage.participatingMunicipalityIds.includes(acc.municipalityId)
    );
  }, [accommodations, tourPackage]);

  // Primary LGU info for GCash details
  const primaryLgu = useMemo(() => {
    const primaryId = tourPackage.primaryMunicipalityId || tourPackage.participatingMunicipalityIds[0];
    return municipalities.find(m => m.id === primaryId) || municipalities[0];
  }, [municipalities, tourPackage]);

  // Steps: 1: Group & Dates, 2: Lead Tourist Info, 3: GCash Payment Evidence, 4: Confirmed
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [paxCount, setPaxCount] = useState<number>(tourPackage.minPax || 2);
  const [selectedHotelId, setSelectedHotelId] = useState<string>('');
  const [hotelNights, setHotelNights] = useState<number>(tourPackage.durationNights || 1);
  const [specialRequests, setSpecialRequests] = useState('');

  // Tourist Contact
  const [leadName, setLeadName] = useState(currentUser.fullName || 'Christy Princes');
  const [leadEmail, setLeadEmail] = useState(currentUser.email || 'schristyprinces@gmail.com');
  const [leadPhone, setLeadPhone] = useState(currentUser.phone || '0917-555-4321');
  const [emergencyContact, setEmergencyContact] = useState('Roberto Princes (Father) - 0918-222-3344');

  // GCash Evidence
  const [gcashRef, setGcashRef] = useState('');
  const [gcashSenderName, setGcashSenderName] = useState(currentUser.fullName || 'Christy Princes');
  const [gcashSenderPhone, setGcashSenderPhone] = useState(currentUser.phone || '0917-555-4321');
  const [receiptImage, setReceiptImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Price calculations
  const selectedHotel = availableHotels.find(h => h.id === selectedHotelId);
  const packageSubtotal = paxCount * tourPackage.pricePerPerson;
  const hotelSubtotal = selectedHotel ? selectedHotel.pricePerNight * hotelNights : 0;
  const environmentalFee = 50 * paxCount; // Standard ₱50 per pax conservation fee
  const totalAmount = packageSubtotal + hotelSubtotal + environmentalFee;

  const handleUseSampleReceipt = () => {
    setGcashRef(`9048${Math.floor(10000000 + Math.random() * 90000000)}`);
    setGcashSenderName(leadName);
    setGcashSenderPhone(leadPhone);
    setReceiptImage('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitBooking = async () => {
    if (!gcashRef.trim()) {
      alert('Please enter the GCash Transaction Reference Number.');
      return;
    }
    if (!receiptImage) {
      alert('Please upload or generate a screenshot of the GCash payment receipt for manual review.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking = await createBooking({
        packageId: tourPackage.id,
        packageName: tourPackage.name,
        participatingMunicipalityIds: tourPackage.participatingMunicipalityIds,
        touristId: currentUser.id,
        touristName: leadName,
        touristEmail: leadEmail,
        touristPhone: leadPhone,
        emergencyContact,
        travelDate,
        paxCount,
        selectedHotelId: selectedHotel?.id,
        selectedHotelName: selectedHotel?.name,
        hotelNights,
        pricePerPersonSnapshot: tourPackage.pricePerPerson,
        packageSubtotal,
        hotelSubtotal,
        environmentalFee,
        totalAmount,
        specialRequests,
        paymentStatus: 'receipt_submitted',
        bookingStatus: 'pending_review',
        gcashReceipt: {
          referenceNumber: gcashRef,
          senderName: gcashSenderName,
          senderNumber: gcashSenderPhone,
          amountSent: totalAmount,
          uploadedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          receiptImageUrl: receiptImage
        }
      });

      setCreatedBooking(newBooking);
      onBookingCreated(newBooking);
      setCurrentStep(4);
    } catch (err) {
      console.error('Failed to submit booking:', err);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 rounded-t-2xl flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <span>{tourPackage.scope === 'cross_municipality' ? 'Multi-Municipality Shared Circuit' : 'Municipal Tour Package'}</span>
              <span>·</span>
              <span>Step {currentStep} of {currentStep === 4 ? 'Completed' : '3'}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-serif-title line-clamp-1">
              {tourPackage.name}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Duration: {tourPackage.durationDays}D{tourPackage.durationNights > 0 ? `${tourPackage.durationNights}N` : ' Day Tour'} · Base Rate: ₱{tourPackage.pricePerPerson.toLocaleString()} / pax
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps indicator */}
        {currentStep < 4 && (
          <div className="px-6 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 font-medium ${currentStep >= 1 ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-emerald-700 text-white' : 'bg-stone-300 text-stone-600'}`}>1</span>
              <span>Dates & Pax</span>
            </div>
            <div className="w-8 h-0.5 bg-stone-200"></div>
            <div className={`flex items-center gap-1.5 font-medium ${currentStep >= 2 ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-emerald-700 text-white' : 'bg-stone-300 text-stone-600'}`}>2</span>
              <span>Tourist Details</span>
            </div>
            <div className="w-8 h-0.5 bg-stone-200"></div>
            <div className={`flex items-center gap-1.5 font-medium ${currentStep >= 3 ? 'text-emerald-700 font-bold' : 'text-stone-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 3 ? 'bg-emerald-700 text-white' : 'bg-stone-300 text-stone-600'}`}>3</span>
              <span>GCash Payment</span>
            </div>
          </div>
        )}

        {/* Body content based on step */}
        <div className="p-5 sm:p-6 flex-1 space-y-5">
          
          {/* STEP 1: DATES, PAX & LIVE PRICING */}
          {currentStep === 1 && (
            <div className="space-y-5">
              
              {/* Date & Group size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    Target Travel Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={travelDate}
                    onChange={e => setTravelDate(e.target.value)}
                    className="w-full text-xs font-medium px-3 py-2.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">LGU coordination requires at least 48 hours notice.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-700" />
                      Number of Tourists (Pax)
                    </span>
                    <span className="text-emerald-800 font-extrabold text-sm">{paxCount} Pax</span>
                  </label>
                  <input
                    type="range"
                    min={tourPackage.minPax}
                    max={tourPackage.maxPax}
                    value={paxCount}
                    onChange={e => setPaxCount(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                    <span>Min: {tourPackage.minPax} pax</span>
                    <span>Max: {tourPackage.maxPax} pax</span>
                  </div>
                </div>
              </div>

              {/* Optional Accommodation Add-on */}
              {availableHotels.length > 0 && (
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Hotel className="w-4 h-4 text-sky-700" />
                      Bundle Local Accommodation (Optional)
                    </label>
                    <span className="text-[11px] text-stone-500">Accredited LGU homestays & resorts</span>
                  </div>

                  <select
                    value={selectedHotelId}
                    onChange={e => setSelectedHotelId(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  >
                    <option value="">No hotel add-on (Package day-tour or arrange independently)</option>
                    {availableHotels.map(h => (
                      <option key={h.id} value={h.id}>
                        {h.name} — ₱{h.pricePerNight.toLocaleString()}/night ({h.category.replace('_', ' ')})
                      </option>
                    ))}
                  </select>

                  {selectedHotel && (
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div>
                        <span className="text-stone-500 block">Nights to Book:</span>
                        <select
                          value={hotelNights}
                          onChange={e => setHotelNights(Number(e.target.value))}
                          className="mt-1 w-full text-xs px-2.5 py-1.5 rounded border border-stone-300 bg-white"
                        >
                          <option value={1}>1 Night</option>
                          <option value={2}>2 Nights</option>
                          <option value={3}>3 Nights</option>
                        </select>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-500 block">Hotel Add-on Subtotal:</span>
                        <span className="font-bold text-stone-900 text-sm">
                          ₱{(selectedHotel.pricePerNight * hotelNights).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Special Dietary or Accessibility Requests
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Halal or vegetarian meal preferences, elder travelers requiring walking assistance, boat life vest sizes..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                />
              </div>

              {/* Price Calculation Card (Manuscript Section 3.5 Equation) */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2.5">
                <div className="text-xs font-bold text-emerald-950 uppercase tracking-wide flex items-center justify-between border-b border-emerald-200/80 pb-2">
                  <span>Transparent Price Calculation Breakdown</span>
                  <span className="text-[10px] font-normal text-emerald-800">Auto-Computed</span>
                </div>

                <div className="space-y-1.5 text-xs text-stone-700">
                  <div className="flex justify-between">
                    <span>Tour Package ({paxCount} pax × ₱{tourPackage.pricePerPerson.toLocaleString()}):</span>
                    <span className="font-medium text-stone-900">₱{packageSubtotal.toLocaleString()}</span>
                  </div>

                  {selectedHotel && (
                    <div className="flex justify-between">
                      <span>Accommodation ({selectedHotel.name} × {hotelNights}N):</span>
                      <span className="font-medium text-stone-900">₱{hotelSubtotal.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Municipal Environmental & Conservation Fee ({paxCount} × ₱50):</span>
                    <span className="font-medium text-stone-900">₱{environmentalFee.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-emerald-200 pt-2 flex justify-between items-center text-sm font-bold text-emerald-950">
                    <span>Total Amount Due:</span>
                    <span className="text-base font-extrabold text-emerald-800">
                      ₱{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: LEAD TOURIST CONTACT DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                Please provide the primary lead traveler details for municipal manifest logging, insurance, and issuing the official QR-code travel ticket.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Lead Guest Full Name
                  </label>
                  <input
                    type="text"
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address (For e-Ticket Dispatch)
                  </label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={e => setLeadEmail(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mobile Number (SMS Updates)
                  </label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={e => setLeadPhone(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Emergency Contact Person & Phone
                  </label>
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={e => setEmergencyContact(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Group manifest summary */}
              <div className="p-3.5 rounded-lg border border-stone-200 bg-stone-50 space-y-1 text-xs">
                <span className="font-bold text-stone-800 block">Booking Manifest Summary:</span>
                <p className="text-stone-600">
                  <span className="font-medium text-stone-800">{tourPackage.name}</span> for <span className="font-semibold text-emerald-800">{paxCount} travelers</span> starting on <span className="font-semibold text-stone-800">{travelDate}</span>.
                </p>
                <p className="text-stone-500 text-[11px]">
                  Total payable amount: <span className="font-bold text-emerald-800">₱{totalAmount.toLocaleString()}</span> via GCash official municipal payment gateway.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: GCASH PAYMENT & RECEIPT EVIDENCE UPLOAD */}
          {currentStep === 3 && (
            <div className="space-y-4">
              
              {/* Official GCash Account Notice */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                        Official LGU GCash Payment Channel
                      </h4>
                      <p className="text-[11px] text-blue-800">Direct Municipal Tourism Trust Account</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleUseSampleReceipt}
                    className="text-[11px] font-semibold px-2.5 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                  >
                    ⚡ Auto-Fill Sample GCash Receipt
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-blue-100 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[11px]">Account Name:</span>
                    <span className="font-bold text-stone-900">{primaryLgu.tourismOffice.gcashAccountName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Official GCash Number:</span>
                    <span className="font-mono-code font-bold text-blue-800 text-sm">
                      {primaryLgu.tourismOffice.gcashNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Verified Officer-in-Charge:</span>
                    <span className="text-stone-800">{primaryLgu.tourismOffice.officerInCharge}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Required Amount:</span>
                    <span className="font-bold text-emerald-800 text-sm">₱{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-[11px] text-blue-900">
                  Please transfer exact amount via GCash app, copy the 12-digit Reference Number, and attach the screenshot below for manual municipal audit.
                </p>
              </div>

              {/* Receipt Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    GCash Reference No. (12 Digits) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 904812398511"
                    value={gcashRef}
                    onChange={e => setGcashRef(e.target.value)}
                    required
                    className="w-full text-xs font-mono-code font-medium px-3 py-2.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Sender GCash Registered Name *
                  </label>
                  <input
                    type="text"
                    value={gcashSenderName}
                    onChange={e => setGcashSenderName(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
                  />
                </div>
              </div>

              {/* Receipt Image Upload & Preview */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
                  <span>Upload GCash Receipt Screenshot *</span>
                  {receiptImage && <span className="text-emerald-700 font-semibold text-[11px]">✓ Image Attached</span>}
                </label>

                {receiptImage ? (
                  <div className="relative rounded-xl border border-stone-300 overflow-hidden bg-stone-100 max-h-52 flex items-center justify-center group">
                    <img
                      src={receiptImage}
                      alt="GCash Receipt"
                      className="w-full h-48 object-cover group-hover:opacity-90 transition"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition gap-2">
                      <label className="px-3 py-1.5 bg-white text-stone-900 rounded-md text-xs font-semibold cursor-pointer">
                        Change Image
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={() => setReceiptImage('')}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-md text-xs font-semibold cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-stone-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-emerald-500 hover:bg-emerald-50/20 transition cursor-pointer">
                    <Upload className="w-8 h-8 text-stone-400 mb-2" />
                    <span className="text-xs font-semibold text-stone-800">
                      Click to upload receipt image or screenshot
                    </span>
                    <span className="text-[11px] text-stone-500 mt-0.5">
                      Supports JPG, PNG, WEBP (Max 5MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

            </div>
          )}

          {/* STEP 4: SUBMITTED CONFIRMATION */}
          {currentStep === 4 && createdBooking && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 font-serif-title">
                  Booking Submitted for Manual GCash Review!
                </h3>
                <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                  Your reference number is <strong className="font-mono-code text-stone-900">{createdBooking.bookingReference}</strong>. The LGU Tourism Office has received your payment evidence and will verify the transaction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Package:</span>
                  <span className="font-semibold text-stone-900 text-right">{createdBooking.packageName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Travel Date:</span>
                  <span className="font-semibold text-stone-900">{createdBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Travelers (Pax):</span>
                  <span className="font-semibold text-stone-900">{createdBooking.paxCount} pax</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Paid:</span>
                  <span className="font-bold text-emerald-800">₱{createdBooking.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status:</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px]">
                    Pending LGU Review
                  </span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-left max-w-md mx-auto text-[11px] text-amber-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>What happens next?</strong> As documented in the study methodology, an authorized LGU Tourism Administrator will manually verify your GCash receipt. Once approved, your <strong>Official QR-Code e-Ticket</strong> will be generated automatically in the "My Bookings" dashboard.
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between rounded-b-2xl">
          {currentStep === 4 ? (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition cursor-pointer"
            >
              Done & Return to Tours
            </button>
          ) : (
            <>
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((currentStep - 1) as any)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-stone-500 hover:text-stone-800 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((currentStep + 1) as any)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition cursor-pointer"
                >
                  Next Step
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitBooking}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Receipt...' : 'Confirm & Upload GCash Receipt'}
                </button>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
