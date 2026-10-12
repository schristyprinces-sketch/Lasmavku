import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  Footer 
} from './components/Footer';
import { 
  RoleSwitcherModal 
} from './components/RoleSwitcherModal';
import { 
  BookingModal 
} from './components/BookingModal';
import { 
  TicketModal 
} from './components/TicketModal';
import { 
  DestinationModal 
} from './components/DestinationModal';
import { 
  PackageDossierModal 
} from './components/PackageDossierModal';
import { 
  QRScannerModal 
} from './components/QRScannerModal';

import { HomeView } from './views/HomeView';
import { MunicipalitiesView } from './views/MunicipalitiesView';
import { MunicipalityDetailView } from './views/MunicipalityDetailView';
import { DestinationsView } from './views/DestinationsView';
import { PackagesView } from './views/PackagesView';
import { HotelsView } from './views/HotelsView';
import { TouristBookingsView } from './views/TouristBookingsView';
import { LguAdminView } from './views/LguAdminView';
import { SuperAdminView } from './views/SuperAdminView';
import { ResearchCompanionView } from './views/ResearchCompanionView';

import { 
  initializeStorage, 
  getCurrentUser, 
  getBookings,
  getBookingById
} from './services/storageService';
import { 
  UserAccount, 
  TourPackage, 
  Destination, 
  Booking, 
  MunicipalityCode 
} from './types/tourism';

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => getCurrentUser());
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<MunicipalityCode>('lapuyan');

  // Modals state
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [bookingModalPkg, setBookingModalPkg] = useState<TourPackage | null>(null);
  const [ticketModalBooking, setTicketModalBooking] = useState<Booking | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackageDossier, setSelectedPackageDossier] = useState<TourPackage | null>(null);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);

  // Storage data version tick to trigger re-renders when data updates
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    initializeStorage().then(() => {
      setIsInitialized(true);
      setCurrentUser(getCurrentUser());
    });
  }, []);

  const refreshData = () => {
    setDataVersion(v => v + 1);
  };

  const handleNavigate = (view: string, param?: string) => {
    if (view === 'municipality_detail' && param) {
      setSelectedMunicipalityId(param as MunicipalityCode);
    }
    if (view === 'scanner') {
      setScannerModalOpen(true);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMunicipality = (id: MunicipalityCode) => {
    setSelectedMunicipalityId(id);
    setCurrentView('municipality_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUserChanged = (newUser: UserAccount) => {
    setCurrentUser(newUser);
    // If switching to LGU admin or Super Admin, optionally navigate them to their dashboard
    if (newUser.role === 'super_admin') {
      setCurrentView('super_admin');
    } else if (newUser.role === 'lgu_admin') {
      setCurrentView('lgu_admin');
    } else {
      setCurrentView('home');
    }
  };

  const allBookings = getBookings();
  const pendingCount = allBookings.filter(b => b.bookingStatus === 'pending_review').length;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-emerald-700 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenRoleSwitcher={() => setRoleSwitcherOpen(true)}
        pendingBookingsCount={pendingCount}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={(pkg) => setBookingModalPkg(pkg)}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onSelectPackage={(pkg) => setSelectedPackageDossier(pkg)}
          />
        )}

        {currentView === 'municipalities' && (
          <MunicipalitiesView
            onSelectMunicipality={handleSelectMunicipality}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'municipality_detail' && (
          <MunicipalityDetailView
            municipalityId={selectedMunicipalityId}
            onBack={() => setCurrentView('municipalities')}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onSelectPackage={(pkg) => setSelectedPackageDossier(pkg)}
            onOpenBooking={(pkg) => setBookingModalPkg(pkg)}
          />
        )}

        {currentView === 'destinations' && (
          <DestinationsView
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onNavigateToMunicipality={handleSelectMunicipality}
          />
        )}

        {currentView === 'packages' && (
          <PackagesView
            onSelectPackage={(pkg) => setSelectedPackageDossier(pkg)}
            onOpenBooking={(pkg) => setBookingModalPkg(pkg)}
          />
        )}

        {currentView === 'hotels' && (
          <HotelsView />
        )}

        {currentView === 'my_bookings' && (
          <TouristBookingsView
            currentUser={currentUser}
            onOpenTicket={(b) => setTicketModalBooking(b)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'lgu_admin' && (
          <LguAdminView
            currentUser={currentUser}
            onRefreshData={refreshData}
          />
        )}

        {currentView === 'super_admin' && (
          <SuperAdminView
            currentUser={currentUser}
            onRefreshData={refreshData}
          />
        )}

        {currentView === 'research' && (
          <ResearchCompanionView />
        )}
      </main>

      {/* Global Modals */}
      <RoleSwitcherModal
        isOpen={roleSwitcherOpen}
        onClose={() => setRoleSwitcherOpen(false)}
        currentUser={currentUser}
        onUserChanged={handleUserChanged}
      />

      <BookingModal
        isOpen={!!bookingModalPkg}
        onClose={() => setBookingModalPkg(null)}
        tourPackage={bookingModalPkg}
        currentUser={currentUser}
        onBookingCreated={(booking) => {
          refreshData();
        }}
      />

      <TicketModal
        isOpen={!!ticketModalBooking}
        onClose={() => setTicketModalBooking(null)}
        booking={ticketModalBooking}
      />

      <DestinationModal
        isOpen={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
        destination={selectedDestination}
      />

      <PackageDossierModal
        isOpen={!!selectedPackageDossier}
        onClose={() => setSelectedPackageDossier(null)}
        tourPackage={selectedPackageDossier}
        onBookNow={(pkg) => {
          setSelectedPackageDossier(null);
          setBookingModalPkg(pkg);
        }}
      />

      <QRScannerModal
        isOpen={scannerModalOpen}
        onClose={() => {
          setScannerModalOpen(false);
          refreshData();
        }}
        currentUser={currentUser}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
