import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Hotel, 
  Compass, 
  Clock, 
  Award,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { 
  MunicipalityCode, 
  Destination, 
  TourPackage, 
  Accommodation 
} from '../types/tourism';
import { 
  getMunicipalityById, 
  getDestinationsByMunicipality, 
  getAccommodationsByMunicipality, 
  getPackages 
} from '../services/storageService';

interface MunicipalityDetailViewProps {
  municipalityId: MunicipalityCode;
  onBack: () => void;
  onSelectDestination: (dest: Destination) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onOpenBooking: (pkg: TourPackage) => void;
}

export const MunicipalityDetailView: React.FC<MunicipalityDetailViewProps> = ({
  municipalityId,
  onBack,
  onSelectDestination,
  onSelectPackage,
  onOpenBooking
}) => {
  const municipality = getMunicipalityById(municipalityId);
  const destinations = getDestinationsByMunicipality(municipalityId);
  const accommodations = getAccommodationsByMunicipality(municipalityId);
  const allPackages = getPackages();
  const relevantPackages = allPackages.filter(p => p.participatingMunicipalityIds.includes(municipalityId));

  const [activeTab, setActiveTab] = useState<'destinations' | 'history' | 'accommodations' | 'packages'>('destinations');

  if (!municipality) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Municipality not found</h2>
        <button onClick={onBack} className="text-emerald-700 underline text-sm">Return to Municipalities</button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Header */}
      <div className="relative min-h-[380px] sm:min-h-[440px] flex items-end bg-stone-900 text-white overflow-hidden">
        <img
          src={municipality.coverImage}
          alt={municipality.name}
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All 5 Municipalities</span>
          </button>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-700 text-white">
                Zamboanga del Sur LGU
              </span>
              <span className="text-stone-300 text-xs">·</span>
              <span className="text-stone-300 text-xs font-medium">{municipality.fullName}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-serif-title tracking-tight text-white">
              {municipality.name}
            </h1>
            
            <p className="text-sm sm:text-base text-stone-200 font-medium max-w-2xl">
              {municipality.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-2.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'destinations' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Destinations & Waterfalls ({destinations.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'history' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            History & Cultural Heritage
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'packages' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Tour Circuits Featuring {municipality.name} ({relevantPackages.length})
          </button>
          <button
            onClick={() => setActiveTab('accommodations')}
            className={`px-4 py-2.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'accommodations' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            Accommodations & Homestays ({accommodations.length})
          </button>
        </div>

        {/* TAB 1: DESTINATIONS */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-stone-900">
                  Attractions in {municipality.name}
                </h2>
                <p className="text-xs text-stone-500">
                  Official tourism spots cataloged by the {municipality.tourismOffice.officeName}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map(dest => (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-48 w-full overflow-hidden relative">
                      <img
                        src={dest.images[0]}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                        {dest.category.replace('_', ' ')}
                      </span>
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <h3 className="font-extrabold text-base font-serif-title leading-snug line-clamp-1">
                          {dest.name}
                        </h3>
                        <span className="text-[11px] text-stone-300 block">{dest.barangay}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 text-xs">
                      <p className="text-stone-600 line-clamp-2 leading-relaxed">
                        {dest.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900">
                        {dest.entryFee > 0 ? `₱${dest.entryFee} Entry` : 'Free Admission'}
                      </span>
                      <span className="text-emerald-800 font-semibold group-hover:text-emerald-700">
                        View Dossier →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HISTORY & CULTURE */}
        {activeTab === 'history' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs sm:text-sm">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Historical Overview */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <h3 className="text-base font-bold font-serif-title text-stone-900 uppercase tracking-wide">
                  Historical Background
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  {municipality.history}
                </p>
              </div>

              {/* Cultural Heritage & Subanen Traditions */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-3">
                <h3 className="text-base font-bold font-serif-title text-stone-900 uppercase tracking-wide">
                  Living Cultural Heritage
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  {municipality.culturalHeritage}
                </p>
              </div>

              {/* Annual Festivals */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4">
                <h3 className="text-base font-bold font-serif-title text-stone-900 uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  <span>Annual Municipal Festivals</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {municipality.festivals.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-[11px] font-bold text-emerald-800 uppercase block">{f.month}</span>
                      <h4 className="font-bold text-sm text-stone-900">{f.name}</h4>
                      <p className="text-xs text-stone-600 leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar: Tourism Office & GCash Info */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-900 font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4 text-emerald-800" />
                  <span>Tourism Operations Desk</span>
                </div>
                <div className="space-y-2 text-stone-800">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Office Name:</span>
                    <span className="font-semibold">{municipality.tourismOffice.officeName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Address:</span>
                    <span>{municipality.tourismOffice.address}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Officer in Charge:</span>
                    <span className="font-semibold text-emerald-900">{municipality.tourismOffice.officerInCharge}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Official Contact:</span>
                    <span>{municipality.tourismOffice.contactNumber}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-bold uppercase tracking-wider">
                  <CreditCard className="w-4 h-4 text-blue-800" />
                  <span>Official GCash Trust Account</span>
                </div>
                <p className="text-stone-600 text-[11px]">
                  Tourists booking tours within {municipality.name} remit payments directly to this verified municipal account:
                </p>
                <div className="p-3 bg-white rounded-lg border border-blue-200 font-mono-code text-xs space-y-1">
                  <div className="text-[11px] text-stone-500">{municipality.tourismOffice.gcashAccountName}</div>
                  <div className="font-bold text-blue-900 text-sm">{municipality.tourismOffice.gcashNumber}</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PACKAGES */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-serif-title text-stone-900">
                Tour Packages Featuring {municipality.name}
              </h2>
              <p className="text-xs text-stone-500">
                Local excursions and cross-municipality shared circuits connecting {municipality.name} to neighbor towns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantPackages.map(pkg => (
                <div
                  key={pkg.id}
                  className="rounded-2xl border border-stone-200 bg-white p-5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                        {pkg.durationDays}D{pkg.durationNights > 0 ? `${pkg.durationNights}N` : ' Day Tour'}
                      </span>
                      <span className="font-bold text-emerald-800 text-sm">
                        ₱{pkg.pricePerPerson.toLocaleString()} / pax
                      </span>
                    </div>

                    <h3 className="font-bold text-base font-serif-title text-stone-900">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="text-xs font-semibold text-stone-700 hover:text-stone-900 cursor-pointer"
                    >
                      View Day Itinerary →
                    </button>
                    <button
                      onClick={() => onOpenBooking(pkg)}
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ACCOMMODATIONS */}
        {activeTab === 'accommodations' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-serif-title text-stone-900">
                Accommodations in {municipality.name}
              </h2>
              <p className="text-xs text-stone-500">
                LGU-accredited resorts, floating cottages, and cultural homestays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map(acc => (
                <div
                  key={acc.id}
                  className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={acc.images[0]}
                      alt={acc.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                      {acc.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <h3 className="font-bold text-sm text-stone-900 font-serif-title line-clamp-1">
                      {acc.name}
                    </h3>
                    <p className="text-stone-600 line-clamp-2 text-[11px] leading-relaxed">
                      {acc.description}
                    </p>
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className="font-extrabold text-stone-900 text-sm">
                        ₱{acc.pricePerNight.toLocaleString()} <span className="text-[10px] font-normal text-stone-500">/ night</span>
                      </span>
                      <span className="text-[11px] text-emerald-800 font-semibold">{acc.contactNumber}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
