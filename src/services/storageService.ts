import { 
  Municipality, 
  Destination, 
  Accommodation, 
  TourPackage, 
  ItineraryItem, 
  Booking, 
  UserAccount, 
  ISOEvaluation,
  MunicipalityCode
} from '../types/tourism';
import { 
  INITIAL_MUNICIPALITIES, 
  INITIAL_DESTINATIONS, 
  INITIAL_ACCOMMODATIONS, 
  INITIAL_PACKAGES, 
  INITIAL_ITINERARIES, 
  INITIAL_BOOKINGS, 
  INITIAL_USERS, 
  INITIAL_ISO_EVALUATIONS 
} from '../data/seedData';
import { generateQrCodeDataUrl, buildTicketQrPayload } from '../utils/qrCode';

const STORAGE_KEYS = {
  MUNICIPALITIES: 'lasmavku_municipalities_v1',
  DESTINATIONS: 'lasmavku_destinations_v1',
  ACCOMMODATIONS: 'lasmavku_accommodations_v1',
  PACKAGES: 'lasmavku_packages_v1',
  ITINERARIES: 'lasmavku_itineraries_v1',
  BOOKINGS: 'lasmavku_bookings_v1',
  USERS: 'lasmavku_users_v1',
  CURRENT_USER: 'lasmavku_current_user_v1',
  EVALUATIONS: 'lasmavku_evaluations_v1'
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

// Initialize seed data if not present
export async function initializeStorage(): Promise<void> {
  if (!localStorage.getItem(STORAGE_KEYS.MUNICIPALITIES)) {
    setItem(STORAGE_KEYS.MUNICIPALITIES, INITIAL_MUNICIPALITIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.DESTINATIONS)) {
    setItem(STORAGE_KEYS.DESTINATIONS, INITIAL_DESTINATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACCOMMODATIONS)) {
    setItem(STORAGE_KEYS.ACCOMMODATIONS, INITIAL_ACCOMMODATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.PACKAGES)) {
    setItem(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ITINERARIES)) {
    setItem(STORAGE_KEYS.ITINERARIES, INITIAL_ITINERARIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    setItem(STORAGE_KEYS.USERS, INITIAL_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    // Default to registered tourist Christy Princes for visitor experience
    setItem(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  }
  if (!localStorage.getItem(STORAGE_KEYS.EVALUATIONS)) {
    setItem(STORAGE_KEYS.EVALUATIONS, INITIAL_ISO_EVALUATIONS);
  }

  // Pre-generate QR codes for existing approved bookings if missing
  const storedBookings = getItem<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  let updatedAny = false;
  for (const b of storedBookings) {
    if (b.bookingStatus === 'approved' && !b.qrCodeDataUrl) {
      const payload = buildTicketQrPayload(b);
      b.qrCodeDataUrl = await generateQrCodeDataUrl(payload);
      updatedAny = true;
    }
  }
  setItem(STORAGE_KEYS.BOOKINGS, storedBookings);
}

// MUNICIPALITIES
export function getMunicipalities(): Municipality[] {
  return getItem<Municipality[]>(STORAGE_KEYS.MUNICIPALITIES, INITIAL_MUNICIPALITIES);
}

export function getMunicipalityById(id: MunicipalityCode): Municipality | undefined {
  return getMunicipalities().find(m => m.id === id);
}

export function updateMunicipality(updated: Municipality): void {
  const list = getMunicipalities();
  const idx = list.findIndex(m => m.id === updated.id);
  if (idx !== -1) {
    list[idx] = updated;
    setItem(STORAGE_KEYS.MUNICIPALITIES, list);
  }
}

// DESTINATIONS
export function getDestinations(): Destination[] {
  return getItem<Destination[]>(STORAGE_KEYS.DESTINATIONS, INITIAL_DESTINATIONS);
}

export function getDestinationsByMunicipality(municipalityId: MunicipalityCode): Destination[] {
  return getDestinations().filter(d => d.municipalityId === municipalityId);
}

export function saveDestination(dest: Destination): void {
  const list = getDestinations();
  const idx = list.findIndex(d => d.id === dest.id);
  if (idx !== -1) {
    list[idx] = dest;
  } else {
    list.unshift(dest);
  }
  setItem(STORAGE_KEYS.DESTINATIONS, list);
}

export function deleteDestination(id: string): void {
  const list = getDestinations().filter(d => d.id !== id);
  setItem(STORAGE_KEYS.DESTINATIONS, list);
}

// ACCOMMODATIONS
export function getAccommodations(): Accommodation[] {
  return getItem<Accommodation[]>(STORAGE_KEYS.ACCOMMODATIONS, INITIAL_ACCOMMODATIONS);
}

export function getAccommodationsByMunicipality(muniId: MunicipalityCode): Accommodation[] {
  return getAccommodations().filter(a => a.municipalityId === muniId);
}

export function saveAccommodation(acc: Accommodation): void {
  const list = getAccommodations();
  const idx = list.findIndex(a => a.id === acc.id);
  if (idx !== -1) {
    list[idx] = acc;
  } else {
    list.unshift(acc);
  }
  setItem(STORAGE_KEYS.ACCOMMODATIONS, list);
}

// PACKAGES
export function getPackages(): TourPackage[] {
  return getItem<TourPackage[]>(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
}

export function getPackageById(id: string): TourPackage | undefined {
  return getPackages().find(p => p.id === id);
}

export function savePackage(pkg: TourPackage): void {
  const list = getPackages();
  const idx = list.findIndex(p => p.id === pkg.id);
  if (idx !== -1) {
    list[idx] = pkg;
  } else {
    list.unshift(pkg);
  }
  setItem(STORAGE_KEYS.PACKAGES, list);
}

export function deletePackage(id: string): void {
  const list = getPackages().filter(p => p.id !== id);
  setItem(STORAGE_KEYS.PACKAGES, list);
}

// ITINERARIES
export function getItineraries(packageId?: string): ItineraryItem[] {
  const all = getItem<ItineraryItem[]>(STORAGE_KEYS.ITINERARIES, INITIAL_ITINERARIES);
  if (packageId) {
    return all
      .filter(item => item.packageId === packageId)
      .sort((a, b) => a.sequence - b.sequence);
  }
  return all;
}

export function saveItineraryItem(item: ItineraryItem): void {
  const list = getItineraries();
  const idx = list.findIndex(i => i.id === item.id);
  if (idx !== -1) {
    list[idx] = item;
  } else {
    list.push(item);
  }
  setItem(STORAGE_KEYS.ITINERARIES, list);
}

export function deleteItineraryItem(id: string): void {
  const list = getItineraries().filter(i => i.id !== id);
  setItem(STORAGE_KEYS.ITINERARIES, list);
}

// BOOKINGS
export function getBookings(): Booking[] {
  return getItem<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
}

export function getBookingById(id: string): Booking | undefined {
  return getBookings().find(b => b.id === id || b.bookingReference === id || b.qrToken === id);
}

export function getBookingsForTourist(touristEmailOrId: string): Booking[] {
  return getBookings().filter(b => 
    b.touristEmail.toLowerCase() === touristEmailOrId.toLowerCase() || 
    b.touristId === touristEmailOrId
  );
}

export function getBookingsForLguAdmin(municipalityId: MunicipalityCode): Booking[] {
  return getBookings().filter(b => b.participatingMunicipalityIds.includes(municipalityId));
}

export async function createBooking(newBooking: Omit<Booking, 'id' | 'bookingReference' | 'qrToken' | 'createdAt'>): Promise<Booking> {
  const list = getBookings();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ref = `LSM-2026-${randomNum}`;
  const token = `TKN-${ref}-${Date.now().toString().slice(-6)}`;

  const created: Booking = {
    ...newBooking,
    id: `book-${Date.now()}`,
    bookingReference: ref,
    qrToken: token,
    createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
  };

  // If already approved (or upon admin approve later), generate QR
  if (created.bookingStatus === 'approved') {
    const payload = buildTicketQrPayload(created);
    created.qrCodeDataUrl = await generateQrCodeDataUrl(payload);
  }

  list.unshift(created);
  setItem(STORAGE_KEYS.BOOKINGS, list);
  return created;
}

export async function approveBooking(
  bookingId: string, 
  reviewedBy: string
): Promise<Booking | null> {
  const list = getBookings();
  const idx = list.findIndex(b => b.id === bookingId);
  if (idx === -1) return null;

  const booking = list[idx];
  booking.bookingStatus = 'approved';
  booking.paymentStatus = 'verified_paid';
  booking.reviewedBy = reviewedBy;
  booking.reviewedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

  // Generate verifiable QR code
  const payload = buildTicketQrPayload(booking);
  booking.qrCodeDataUrl = await generateQrCodeDataUrl(payload);

  list[idx] = booking;
  setItem(STORAGE_KEYS.BOOKINGS, list);
  return booking;
}

export function rejectBooking(
  bookingId: string, 
  reason: string, 
  reviewedBy: string
): Booking | null {
  const list = getBookings();
  const idx = list.findIndex(b => b.id === bookingId);
  if (idx === -1) return null;

  const booking = list[idx];
  booking.bookingStatus = 'rejected';
  booking.paymentStatus = 'rejected';
  booking.rejectionReason = reason;
  booking.reviewedBy = reviewedBy;
  booking.reviewedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

  list[idx] = booking;
  setItem(STORAGE_KEYS.BOOKINGS, list);
  return booking;
}

export function checkInBookingTicket(
  tokenOrRef: string, 
  staffName: string
): { success: boolean; message: string; booking?: Booking } {
  const list = getBookings();
  const idx = list.findIndex(b => 
    b.qrToken === tokenOrRef || 
    b.bookingReference.toLowerCase() === tokenOrRef.toLowerCase()
  );

  if (idx === -1) {
    return { success: false, message: 'Ticket reference or QR token not found in LASMAVKU database.' };
  }

  const booking = list[idx];
  if (booking.bookingStatus !== 'approved') {
    return { 
      success: false, 
      message: `Booking is currently ${booking.bookingStatus.toUpperCase()} (Payment: ${booking.paymentStatus}). Admission denied.`,
      booking
    };
  }

  if (booking.checkedInAt) {
    return {
      success: true,
      message: `Warning: Already validated and checked-in previously at ${booking.checkedInAt} by ${booking.checkedInBy || 'Tourism Staff'}.`,
      booking
    };
  }

  booking.checkedInAt = new Date().toISOString().replace('T', ' ').slice(0, 16);
  booking.checkedInBy = staffName;
  list[idx] = booking;
  setItem(STORAGE_KEYS.BOOKINGS, list);

  return {
    success: true,
    message: `Verification SUCCESS: Admitted ${booking.paxCount} pax for "${booking.packageName}". Lead Guest: ${booking.touristName}.`,
    booking
  };
}

// USERS & AUTH
export function getUsers(): UserAccount[] {
  return getItem<UserAccount[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
}

export function getCurrentUser(): UserAccount {
  return getItem<UserAccount>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
}

export function setCurrentUser(user: UserAccount): void {
  setItem(STORAGE_KEYS.CURRENT_USER, user);
}

// ISO EVALUATIONS
export function getISOEvaluations(): ISOEvaluation[] {
  return getItem<ISOEvaluation[]>(STORAGE_KEYS.EVALUATIONS, INITIAL_ISO_EVALUATIONS);
}

export function submitISOEvaluation(evalData: Omit<ISOEvaluation, 'id' | 'date'>): ISOEvaluation {
  const list = getISOEvaluations();
  const newEval: ISOEvaluation = {
    ...evalData,
    id: `eval-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10)
  };
  list.unshift(newEval);
  setItem(STORAGE_KEYS.EVALUATIONS, list);
  return newEval;
}

// RESET TO SEED DATA
export function resetSystemData(): void {
  localStorage.removeItem(STORAGE_KEYS.MUNICIPALITIES);
  localStorage.removeItem(STORAGE_KEYS.DESTINATIONS);
  localStorage.removeItem(STORAGE_KEYS.ACCOMMODATIONS);
  localStorage.removeItem(STORAGE_KEYS.PACKAGES);
  localStorage.removeItem(STORAGE_KEYS.ITINERARIES);
  localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
  localStorage.removeItem(STORAGE_KEYS.USERS);
  localStorage.removeItem(STORAGE_KEYS.EVALUATIONS);
  initializeStorage();
}
