import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  Check, 
  Clock, 
  Compass, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { TourPackage, ItineraryItem } from '../types/tourism';
import { getItineraries, getMunicipalities, getDestinations } from '../services/storageService';

interface PackageDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourPackage: TourPackage | null;
  onBookNow: (pkg: TourPackage) => void;
}

export const PackageDossierModal: React.FC<PackageDossierModalProps> = ({
  isOpen,
  onClose,
  tourPackage,
  onBookNow
}) => {
  if (!isOpen || !tourPackage) return null;

  const itineraries = getItineraries(tourPackage.id);
  const municipalities = getMunicipalities();
  const destinations = getDestinations();

  // Unique days in the itinerary
  const days = Array.from(new Set(itineraries.map(i => i.dayNumber))).sort((a, b) => a - b);
  const [selectedDay, setSelectedDay] = useState<number>(days.length > 0 ? days[0] : 1);

  const filteredItineraryItems = itineraries.filter(i => i.dayNumber === selectedDay);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Dossier Header & Banner */}
        <div className="relative">
          <div className="h-60 sm:h-72 w-full bg-stone-900 overflow-hidden relative">
            <img
              src={tourPackage.coverImage}
              alt={tourPackage.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent"></div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Metadata */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-700 uppercase tracking-wider">
                  {tourPackage.scope === 'cross_municipality' ? 'Multi-Town Shared Circuit' : 'Municipal Tour'}
                </span>
                {tourPackage.badge && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/90 text-stone-900">
                    {tourPackage.badge}
                  </span>
                )}
                <span className="text-xs text-stone-300 font-medium">
                  {tourPackage.durationDays} Days {tourPackage.durationNights > 0 ? `/ ${tourPackage.durationNights} Nights` : '(Day Excursion)'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif-title leading-tight">
                {tourPackage.name}
              </h1>
              <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                {tourPackage.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Pricing & Key Bar */}
        <div className="bg-stone-900 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-stone-800">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Standard Rate</span>
              <span className="text-base font-extrabold text-emerald-400">
                ₱{tourPackage.pricePerPerson.toLocaleString()} <span className="text-xs font-normal text-stone-300">/ person</span>
              </span>
            </div>
            <div className="border-l border-stone-800 pl-6">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Group Capacity</span>
              <span className="font-semibold text-stone-200">
                {tourPackage.minPax} - {tourPackage.maxPax} Travelers (Pax)
              </span>
            </div>
            <div className="border-l border-stone-800 pl-6 hidden sm:block">
              <span className="text-stone-400 block text-[10px] uppercase font-bold">Difficulty</span>
              <span className="font-semibold text-stone-200">{tourPackage.difficulty}</span>
            </div>
          </div>

          <button
            onClick={() => onBookNow(tourPackage)}
            className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition cursor-pointer shadow-sm text-xs"
          >
            <span>Book This Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dossier Body */}
        <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Participating Municipalities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Participating LGUs in This Tour</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {tourPackage.participatingMunicipalityIds.map(mId => {
                const muni = municipalities.find(m => m.id === mId);
                return (
                  <span 
                    key={mId}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold"
                  >
                    {muni?.name || mId}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Package Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1.5">
              Tour Synopsis
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm">
              {tourPackage.description}
            </p>
          </div>

          {/* DAY-BY-DAY ITINERARY SECTION (Manuscript Core Requirement) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3 border-b border-stone-200 pb-2">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif-title uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>Day-by-Day Itinerary Schedule</span>
                </h3>
                <p className="text-[11px] text-stone-500">Ordered activities, designated locations & planned timelines</p>
              </div>

              {/* Day Selector Tabs */}
              {days.length > 1 && (
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                  {days.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition cursor-pointer ${
                        selectedDay === d
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Day {d}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Itinerary Timeline list */}
            {filteredItineraryItems.length > 0 ? (
              <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {filteredItineraryItems.map((item, idx) => (
                  <div key={item.id} className="relative pl-8 group">
                    {/* Timeline bullet */}
                    <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white shadow-xs group-hover:scale-125 transition-transform"></div>

                    <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-emerald-300 transition-all space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-code font-bold text-[11px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                          {item.timeSlot}
                        </span>
                        <span className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {item.location}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 pt-0.5">
                        {item.activityTitle}
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {item.description}
                      </p>

                      {item.mealsIncluded && (
                        <div className="pt-1.5 flex items-center gap-1 text-[11px] font-medium text-amber-900">
                          <Utensils className="w-3 h-3 text-amber-600" />
                          <span>Meals: {item.mealsIncluded}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300 text-stone-500 text-xs">
                Detailed day schedule will be confirmed upon municipal dispatch.
              </div>
            )}
          </div>

          {/* Inclusions and Exclusions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Inclusions */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Package Inclusions</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {tourPackage.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Package Exclusions
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {tourPackage.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-stone-400 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Close Dossier
          </button>
          
          <button
            onClick={() => onBookNow(tourPackage)}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition cursor-pointer shadow-sm"
          >
            <span>Proceed to Booking & Calculation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
