import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  MapPin, 
  Building2, 
  ArrowRight, 
  Check, 
  Compass,
  FileText
} from 'lucide-react';
import { TourPackage, MunicipalityCode } from '../types/tourism';
import { getPackages, getMunicipalities } from '../services/storageService';

interface PackagesViewProps {
  onSelectPackage: (pkg: TourPackage) => void;
  onOpenBooking: (pkg: TourPackage) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  onSelectPackage,
  onOpenBooking
}) => {
  const packages = getPackages();
  const municipalities = getMunicipalities();

  const [scopeFilter, setScopeFilter] = useState<'all' | 'cross_municipality' | 'single_lgu'>('all');
  const [municipalityFilter, setMunicipalityFilter] = useState<string>('all');

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesScope = scopeFilter === 'all' || pkg.scope === scopeFilter;
      const matchesMuni = municipalityFilter === 'all' || pkg.participatingMunicipalityIds.includes(municipalityFilter as any);
      return matchesScope && matchesMuni;
    });
  }, [packages, scopeFilter, municipalityFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-teal-700" />
          <span>Curated Travel Packages & Circuits</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif-title tracking-tight">
          Multi-Town Circuits & Municipal Tours
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Choose from flagship multi-municipality shared circuits uniting all five towns or focused single-LGU day tours. Every package features verified itineraries, accredited local guides, and seamless GCash reservation.
        </p>
      </div>

      {/* Scope and Municipality Filters */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Scope selector */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setScopeFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              scopeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Packages ({packages.length})
          </button>
          <button
            onClick={() => setScopeFilter('cross_municipality')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              scopeFilter === 'cross_municipality' ? 'bg-emerald-700 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Shared Multi-Town Circuits
          </button>
          <button
            onClick={() => setScopeFilter('single_lgu')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              scopeFilter === 'single_lgu' ? 'bg-stone-900 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Single-LGU Excursions
          </button>
        </div>

        {/* Municipality Filter */}
        <div className="flex items-center gap-2">
          <span className="text-stone-400 font-bold uppercase text-[11px]">Filter by Town:</span>
          <select
            value={municipalityFilter}
            onChange={e => setMunicipalityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-xs focus:border-emerald-600 outline-hidden cursor-pointer"
          >
            <option value="all">All Participating Towns</option>
            {municipalities.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Package Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map(pkg => (
          <div
            key={pkg.id}
            className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image */}
              <div className="h-56 w-full overflow-hidden relative">
                <img
                  src={pkg.coverImage}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>

                {/* Duration & Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded bg-stone-900/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                    {pkg.durationDays}D{pkg.durationNights > 0 ? `${pkg.durationNights}N` : ' Day Tour'}
                  </span>
                  {pkg.badge && (
                    <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 text-[10px] font-black shadow-xs">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                    {pkg.scope === 'cross_municipality' ? 'Multi-Town Shared Circuit' : 'Municipal Excursion'}
                  </span>
                  <h3 className="font-extrabold text-base font-serif-title leading-snug">
                    {pkg.name}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3.5 text-xs">
                <p className="text-stone-600 line-clamp-2 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Participating Towns */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Included Towns:</span>
                  <div className="flex flex-wrap gap-1">
                    {pkg.participatingMunicipalityIds.map(mId => (
                      <span key={mId} className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-semibold">
                        {mId.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Inclusions preview */}
                <div className="space-y-1 pt-1 border-t border-stone-100">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Highlights:</span>
                  <ul className="space-y-1 text-stone-700 text-[11px]">
                    {pkg.inclusions.slice(0, 2).map((inc, i) => (
                      <li key={i} className="flex items-start gap-1.5 line-clamp-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card Footer: Price & Actions */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Rate Per Person</span>
                  <span className="text-base font-extrabold text-emerald-800">
                    ₱{pkg.pricePerPerson.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-stone-500 block">Min {pkg.minPax} pax</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className="px-3 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition cursor-pointer"
                    title="View Day-by-Day Itinerary"
                  >
                    Itinerary
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

    </div>
  );
};
