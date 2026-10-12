import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Hotel, 
  QrCode, 
  ShieldCheck, 
  User, 
  Menu, 
  X, 
  FileText,
  Bookmark,
  ChevronDown,
  Building2
} from 'lucide-react';
import { UserAccount, MunicipalityCode } from '../types/tourism';
import { getMunicipalities } from '../services/storageService';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  currentUser: UserAccount;
  onOpenRoleSwitcher: () => void;
  pendingBookingsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  onOpenRoleSwitcher,
  pendingBookingsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [muniDropdownOpen, setMuniDropdownOpen] = useState(false);
  const municipalities = getMunicipalities();

  const handleNavClick = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileMenuOpen(false);
    setMuniDropdownOpen(false);
  };

  const getRoleBadge = () => {
    if (currentUser.role === 'super_admin') {
      return { label: 'Super Admin', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
    if (currentUser.role === 'lgu_admin') {
      const muniName = currentUser.assignedMunicipalityId 
        ? currentUser.assignedMunicipalityId.replace('_', ' ').toUpperCase()
        : 'LGU';
      return { label: `LGU Admin (${muniName})`, color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
    }
    return { label: 'Tourist', color: 'bg-sky-100 text-sky-900 border-sky-300' };
  };

  const roleBadge = getRoleBadge();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner: LGU Cluster notice & Quick Persona switch */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-medium text-stone-300">Province of Zamboanga del Sur</span>
          <span className="text-stone-500">|</span>
          <span className="text-stone-400 hidden sm:inline">Lapuyan · San Miguel · Margosatubig · Vincenzo A. Sagun · Kumalarang</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400">Current Role:</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${roleBadge.color}`}>
              {roleBadge.label}
            </span>
          </div>
          <button
            onClick={onOpenRoleSwitcher}
            className="text-stone-300 hover:text-white underline text-[11px] font-medium transition cursor-pointer"
          >
            Switch Persona
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand Title */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-800 flex items-center justify-center text-white shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-stone-900 font-serif-title">LASMAVKU</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">5 Towns</span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide">
                Zamboanga del Sur Tourism Portal
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-stone-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'home' ? 'text-emerald-800 font-semibold bg-emerald-50' : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Home
            </button>

            {/* Municipalities Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMuniDropdownOpen(!muniDropdownOpen)}
                onBlur={() => setTimeout(() => setMuniDropdownOpen(false), 200)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  currentView.startsWith('municipality') ? 'text-emerald-800 font-semibold bg-emerald-50' : 'hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Municipalities</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {muniDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                    The 5 Municipalities
                  </div>
                  <button
                    onClick={() => handleNavClick('municipalities')}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition cursor-pointer"
                  >
                    View All 5 Town Profiles & Maps →
                  </button>
                  <div className="my-1 border-t border-stone-100"></div>
                  {municipalities.map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleNavClick('municipality_detail', m.id)}
                      className="w-full text-left px-4 py-2 hover:bg-stone-50 transition flex items-center justify-between text-xs text-stone-700 cursor-pointer"
                    >
                      <span className="font-medium text-stone-900">{m.name}</span>
                      <span className="text-[10px] text-stone-500 truncate max-w-[110px]">{m.tagline.split('&')[0]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('destinations')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'destinations' ? 'text-emerald-800 font-semibold bg-emerald-50' : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Destinations</span>
            </button>

            <button
              onClick={() => handleNavClick('packages')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'packages' ? 'text-emerald-800 font-semibold bg-emerald-50' : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>Tour Packages & Circuits</span>
            </button>

            <button
              onClick={() => handleNavClick('hotels')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'hotels' ? 'text-emerald-800 font-semibold bg-emerald-50' : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Hotel className="w-4 h-4 text-sky-700" />
              <span>Accommodations</span>
            </button>

            <button
              onClick={() => handleNavClick('scanner')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'scanner' ? 'text-emerald-800 font-semibold bg-emerald-50' : 'hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Staff Gatekeeper QR Ticket Validation"
            >
              <QrCode className="w-4 h-4 text-indigo-700" />
              <span>Verify Ticket</span>
            </button>

            <button
              onClick={() => handleNavClick('research')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'research' ? 'text-purple-800 font-semibold bg-purple-50' : 'hover:text-purple-900 hover:bg-stone-100'
              }`}
              title="Capstone ISO 25010 Evaluation & System Architecture"
            >
              <FileText className="w-4 h-4 text-purple-700" />
              <span>ISO 25010 Lab</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {currentUser.role === 'tourist' ? (
              <button
                onClick={() => handleNavClick('my_bookings')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentView === 'my_bookings'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                }`}
              >
                <Bookmark className="w-4 h-4 text-emerald-600" />
                <span>My Bookings</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick(currentUser.role === 'super_admin' ? 'super_admin' : 'lgu_admin')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer relative ${
                  currentView === 'super_admin' || currentView === 'lgu_admin'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-900 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {currentUser.role === 'super_admin' ? 'Super Admin Dashboard' : 'LGU Admin Desk'}
                </span>
                {pendingBookingsCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-amber-500 text-white rounded-full">
                    {pendingBookingsCount}
                  </span>
                )}
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-2 animate-in fade-in">
          <div className="p-3 bg-stone-50 rounded-lg text-xs mb-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-stone-800">{currentUser.fullName}</span>
              <div className="text-stone-500 text-[11px]">{currentUser.title || currentUser.role}</div>
            </div>
            <button
              onClick={onOpenRoleSwitcher}
              className="text-emerald-700 font-semibold underline text-xs cursor-pointer"
            >
              Change
            </button>
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Home Overview
          </button>
          <button
            onClick={() => handleNavClick('municipalities')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Municipalities of LASMAVKU
          </button>
          <button
            onClick={() => handleNavClick('destinations')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Destinations & Waterfalls
          </button>
          <button
            onClick={() => handleNavClick('packages')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Tour Packages & Day-by-Day Itineraries
          </button>
          <button
            onClick={() => handleNavClick('hotels')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Hotels & Floating Cottages
          </button>
          <button
            onClick={() => handleNavClick('scanner')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100"
          >
            Gatekeeper QR Ticket Scanner
          </button>
          <button
            onClick={() => handleNavClick('research')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-purple-700 hover:bg-purple-50"
          >
            ISO 25010 Evaluation & Architecture
          </button>
        </div>
      )}
    </header>
  );
};
