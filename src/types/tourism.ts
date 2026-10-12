export type MunicipalityCode = 'lapuyan' | 'san_miguel' | 'margosatubig' | 'vincenzo_sagun' | 'kumalarang';

export interface TourismOffice {
  officeName: string;
  address: string;
  contactNumber: string;
  email: string;
  officerInCharge: string;
  gcashAccountName: string;
  gcashNumber: string;
  gcashQrPlaceholder?: string;
}

export interface Municipality {
  id: MunicipalityCode;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  history: string;
  culturalHeritage: string;
  festivals: {
    name: string;
    month: string;
    description: string;
  }[];
  reasonsToVisit: string[];
  coverImage: string;
  accentColor: string;
  tourismOffice: TourismOffice;
  keyAttractionsPreview: string[];
}

export type DestinationCategory = 
  | 'waterfall' 
  | 'island_beach' 
  | 'cultural_heritage' 
  | 'ecopark_mangrove' 
  | 'viewpoint' 
  | 'agritourism'
  | 'historical';

export interface Destination {
  id: string;
  municipalityId: MunicipalityCode;
  name: string;
  category: DestinationCategory;
  shortDescription: string;
  fullDescription: string;
  entryFee: number;
  environmentalFee?: number;
  barangay: string;
  operatingHours: string;
  contactInfo: string;
  highlights: string[];
  amenities: string[];
  images: string[];
  isFeatured: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
  tips: string[];
}

export interface Accommodation {
  id: string;
  municipalityId: MunicipalityCode;
  name: string;
  category: 'resort' | 'hotel' | 'inn_homestay' | 'floating_cottage';
  description: string;
  pricePerNight: number;
  contactNumber: string;
  email: string;
  address: string;
  amenities: string[];
  images: string[];
  rating: number;
  roomsAvailable: number;
}

export interface ItineraryItem {
  id: string;
  packageId: string;
  dayNumber: number;
  timeSlot: string;
  activityTitle: string;
  location: string;
  description: string;
  sequence: number;
  destinationId?: string;
  mealsIncluded?: string;
}

export interface TourPackage {
  id: string;
  name: string;
  tagline: string;
  scope: 'single_lgu' | 'cross_municipality';
  primaryMunicipalityId?: MunicipalityCode;
  participatingMunicipalityIds: MunicipalityCode[];
  description: string;
  durationDays: number;
  durationNights: number;
  pricePerPerson: number;
  minPax: number;
  maxPax: number;
  includedDestinationIds: string[];
  inclusions: string[];
  exclusions: string[];
  coverImage: string;
  badge?: string;
  isPublished: boolean;
  difficulty: 'Easy' | 'Moderate' | 'Adventurous';
}

export interface PackageDestinationJunction {
  id: string;
  packageId: string;
  destinationId: string;
  dayNumber: number;
  orderSequence: number;
  highlightNote?: string;
}

export type BookingStatus = 'pending_review' | 'approved' | 'rejected' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'receipt_submitted' | 'verified_paid' | 'rejected';

export interface GcashReceipt {
  referenceNumber: string;
  senderName: string;
  senderNumber: string;
  amountSent: number;
  uploadedAt: string;
  receiptImageUrl: string;
}

export interface Booking {
  id: string;
  bookingReference: string; // e.g. LSM-2026-0041
  packageId: string;
  packageName: string;
  participatingMunicipalityIds: MunicipalityCode[];
  touristId: string;
  touristName: string;
  touristEmail: string;
  touristPhone: string;
  emergencyContact: string;
  travelDate: string;
  paxCount: number;
  selectedHotelId?: string;
  selectedHotelName?: string;
  hotelNights: number;
  pricePerPersonSnapshot: number;
  packageSubtotal: number;
  hotelSubtotal: number;
  environmentalFee: number;
  totalAmount: number;
  specialRequests?: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  rejectionReason?: string;
  gcashReceipt?: GcashReceipt;
  qrToken: string;
  qrCodeDataUrl?: string;
  checkedInAt?: string;
  checkedInBy?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export type UserRole = 'tourist' | 'lgu_admin' | 'super_admin';

export interface UserAccount {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  assignedMunicipalityId?: MunicipalityCode;
  title?: string;
  avatarUrl?: string;
}

export interface ISOEvaluation {
  id: string;
  evaluatorName: string;
  evaluatorRole: 'Tourist / Traveler' | 'LGU Tourism Officer' | 'Academic Panel / Researcher';
  municipalityAffiliation?: string;
  date: string;
  scores: {
    functionalSuitability: number;
    performanceEfficiency: number;
    usability: number;
    reliability: number;
    security: number;
    maintainability: number;
    portability: number;
  };
  qualitativeFeedback: string;
}
