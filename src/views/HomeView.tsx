import React from 'react';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Users, 
  Clock, 
  Sparkles,
  QrCode,
  Building2,
  FileCheck
} from 'lucide-react';
import { 
  Municipality, 
  Destination, 
  TourPackage, 
  MunicipalityCode 
} from '../types/tourism';
import { 
  getMunicipalities, 
  getDestinations, 
  getPackages 
} from '../services/storageService';

interface HomeViewProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenBooking: (pkg: TourPackage) => void;
  onSelectDestination: (dest: Destination) => void;
  onSelectPackage: (pkg: TourPackage) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBooking,
  onSelectDestination,
  onSelectPackage
}) => {
  const municipalities = getMunicipalities();
  const destinations = getDestinations();
  const packages = getPackages();

  const featuredDestinations = destinations.filter(d => d.isFeatured).slice(0, 4);
  const circuitPackages = packages.filter(p => p.scope === 'cross_municipality');
  const localPackages = packages.filter(p => p.scope === 'single_lgu');

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden bg-stone-950 text-white px-4 sm:px-6 lg:px-8">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Zamboanga del Sur Coast"
            className="w-full h-full object-cover opacity-35 scale-105 transform animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/80"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 pt-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Official Integrated 5-Municipality Tourism Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif-title tracking-tight text-white leading-tight">
            Discover the Untouched Treasures of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300">Zamboanga del Sur</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            Traverse the ancestral waterfalls of <strong className="text-white font-medium">Lapuyan</strong>, mist-kissed ridges of <strong className="text-white font-medium">San Miguel</strong>, coral islands of <strong className="text-white font-medium">Margosatubig</strong>, sea arches of <strong className="text-white font-medium">Vincenzo A. Sagun</strong>, and floating mangroves of <strong className="text-white font-medium">Kumalarang</strong>.
          </p>

          {/* Call to Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('packages')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Explore Multi-Town Circuits</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('municipalities')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Explore 5 Municipalities</span>
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-2xl mx-auto text-xs">
            <div>
              <span className="block font-black text-xl sm:text-2xl text-emerald-400 font-serif-title">5</span>
              <span className="text-stone-400 text-[11px]">United LGUs</span>
            </div>
            <div>
              <span className="block font-black text-xl sm:text-2xl text-teal-300 font-serif-title">15+</span>
              <span className="text-stone-400 text-[11px]">Pristine Attractions</span>
            </div>
            <div>
              <span className="block font-black text-xl sm:text-2xl text-sky-400 font-serif-title">100%</span>
              <span className="text-stone-400 text-[11px]">LGU Verified Guides</span>
            </div>
            <div>
              <span className="block font-black text-xl sm:text-2xl text-amber-400 font-serif-title">QR Pass</span>
              <span className="text-stone-400 text-[11px]">Instant E-Ticketing</span>
            </div>
          </div>

        </div>
      </section>

      {/* THE 5 MUNICIPALITIES INTERACTIVE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <Building2 className="w-4 h-4 text-emerald-700" />
              <span>The Regional Cluster</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif-title tracking-tight mt-0.5">
              Five Municipalities, One United Destination
            </h2>
          </div>
          <button
            onClick={() => onNavigate('municipalities')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <span>View detailed municipal profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {municipalities.map(m => (
            <div
              key={m.id}
              onClick={() => onNavigate('municipality_detail', m.id)}
              className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src={m.coverImage}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-base font-serif-title leading-tight">
                    {m.name}
                  </h3>
                  <span className="text-[10px] text-stone-300 block truncate">
                    {m.tagline.split('&')[0]}
                  </span>
                </div>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between text-xs space-y-2">
                <p className="text-stone-600 line-clamp-3 text-[11px] leading-relaxed">
                  {m.description}
                </p>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-emerald-800 group-hover:text-emerald-700">
                  <span>Explore attractions</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED MULTI-MUNICIPALITY TOUR CIRCUITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800">
              <Calendar className="w-4 h-4 text-teal-700" />
              <span>Coordinated Tour Packages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif-title tracking-tight mt-0.5">
              Shared Multi-Municipality Travel Circuits
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-xl">
              Seamless itineraries uniting the five towns. Experience culture, waterfalls, islands, and floating mangroves in a single organized journey.
            </p>
          </div>
          <button
            onClick={() => onNavigate('packages')}
            className="text-xs font-bold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
          >
            <span>See all tour packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {circuitPackages.slice(0, 3).map(pkg => (
            <div
              key={pkg.id}
              className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 w-full overflow-hidden relative">
                  <img
                    src={pkg.coverImage}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded bg-stone-900/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                      {pkg.durationDays}D{pkg.durationNights > 0 ? `${pkg.durationNights}N` : ''}
                    </span>
                    {pkg.badge && (
                      <span className="px-2 py-1 rounded bg-amber-500 text-stone-950 text-[10px] font-extrabold shadow-xs">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                      Multi-LGU Circuit
                    </span>
                    <h3 className="font-extrabold text-base font-serif-title leading-snug">
                      {pkg.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <p className="text-stone-600 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Towns included pills */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">Participating Towns:</span>
                    <div className="flex flex-wrap gap-1">
                      {pkg.participatingMunicipalityIds.map(mId => (
                        <span key={mId} className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                          {mId.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Rate & Book Button */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Rate Per Pax</span>
                    <span className="text-base font-extrabold text-emerald-800">
                      ₱{pkg.pricePerPerson.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-3 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition cursor-pointer"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={() => onOpenBooking(pkg)}
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* TOP ATTRACTIONS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Must-Visit Landmarks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif-title tracking-tight mt-0.5">
              Signature Destinations Across the 5 Municipalities
            </h2>
          </div>
          <button
            onClick={() => onNavigate('destinations')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Browse all destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredDestinations.map(dest => {
            const muni = municipalities.find(m => m.id === dest.municipalityId);
            return (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="rounded-2xl border border-stone-200 bg-white overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 w-full overflow-hidden relative">
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
                      <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                        {muni?.name}
                      </span>
                      <h4 className="font-extrabold text-sm font-serif-title leading-snug line-clamp-1">
                        {dest.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 text-xs">
                    <p className="text-stone-600 line-clamp-2 text-[11px] leading-relaxed">
                      {dest.shortDescription}
                    </p>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-700 shrink-0" />
                      <span className="truncate">{dest.barangay}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">
                      {dest.entryFee > 0 ? `₱${dest.entryFee} Fee` : 'Free Entry'}
                    </span>
                    <span className="text-emerald-800 font-semibold group-hover:text-emerald-700 text-[11px]">
                      View details →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS / CAPSTONE WORKFLOW */}
      <section className="bg-stone-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-stone-800">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Streamlined Digital Tourism Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title">
              How LASMAVKU Unifies Tourism Across 5 Towns
            </h2>
            <p className="text-xs text-stone-400 leading-relaxed">
              Designed according to the Chapter III Capstone methodology: moving from fragmented social media inquiries to a coordinated database-driven portal with transparent pricing and manual GCash review.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold font-mono-code">
                1
              </div>
              <h3 className="font-bold text-sm text-white font-serif-title">
                Explore & Configure
              </h3>
              <p className="text-stone-400 leading-relaxed">
                Browse profiles for Lapuyan, San Miguel, Margosatubig, Vincenzo A. Sagun, and Kumalarang. Pick a tour circuit, select travel dates, and adjust group pax count.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-teal-600/30 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold font-mono-code">
                2
              </div>
              <h3 className="font-bold text-sm text-white font-serif-title">
                Automatic Price Calculation
              </h3>
              <p className="text-stone-400 leading-relaxed">
                The platform computes the exact total: pax × package rate + bundled accommodations + environmental fees, eliminating manual confusion.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-sky-600/30 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold font-mono-code">
                3
              </div>
              <h3 className="font-bold text-sm text-white font-serif-title">
                GCash Manual Review
              </h3>
              <p className="text-stone-400 leading-relaxed">
                Pay directly to the official LGU Municipal Tourism Trust GCash account and upload receipt evidence. Authorized LGU admins review and verify submissions.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-amber-600/30 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-mono-code">
                4
              </div>
              <h3 className="font-bold text-sm text-white font-serif-title">
                QR-Code E-Ticket Pass
              </h3>
              <p className="text-stone-400 leading-relaxed">
                Upon approval, an official scannable electronic QR ticket is issued for mobile display or printing. Tourism officers scan and validate admissions at wharfs and checkpoints.
              </p>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Research Evaluation Available:</strong> Beta testers and academic panelists can test the system against ISO/IEC 25010 software quality metrics.
              </span>
            </div>
            <button
              onClick={() => onNavigate('research')}
              className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold shrink-0 transition cursor-pointer"
            >
              Open ISO 25010 Lab
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
