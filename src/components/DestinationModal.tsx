import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  DollarSign, 
  Clock, 
  Phone, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';
import { Destination } from '../types/tourism';
import { getMunicipalityById } from '../services/storageService';

interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: Destination | null;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  isOpen,
  onClose,
  destination
}) => {
  if (!isOpen || !destination) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const municipality = getMunicipalityById(destination.municipalityId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="relative">
          <div className="h-64 sm:h-72 w-full bg-stone-900 overflow-hidden relative">
            <img
              src={destination.images[activeImageIdx] || destination.images[0]}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Town overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-1">
                <span>{municipality?.name}</span>
                <span>·</span>
                <span>{destination.category.replace('_', ' ')}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-title leading-tight">
                {destination.name}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-stone-300 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{destination.barangay}</span>
              </div>
            </div>
          </div>

          {/* Image Thumbnail Selector (if multi images) */}
          {destination.images.length > 1 && (
            <div className="bg-stone-900 px-4 py-2 flex items-center gap-2 overflow-x-auto">
              {destination.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-10 rounded-md overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                    activeImageIdx === idx ? 'border-emerald-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Destination Overview
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm">
              {destination.fullDescription}
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Entrance Fee</span>
              <span className="text-sm font-extrabold text-stone-900">
                {destination.entryFee > 0 ? `₱${destination.entryFee}` : 'Free Admission'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Environmental Fee</span>
              <span className="text-sm font-semibold text-emerald-800">
                {destination.environmentalFee ? `₱${destination.environmentalFee}` : 'Included'}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Operating Hours</span>
              <span className="text-xs font-semibold text-stone-800">{destination.operatingHours}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-stone-400 block">Local Tourism Contact</span>
              <span className="text-xs font-medium text-stone-800">{destination.contactInfo}</span>
            </div>
          </div>

          {/* Highlights */}
          {destination.highlights?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                Key Highlights & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-stone-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities & Facilities */}
          {destination.amenities?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
                Available Amenities
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {destination.amenities.map((a, i) => (
                  <span key={i} className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md text-xs font-medium">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Traveler Tips */}
          {destination.tips?.length > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1.5">
                <Info className="w-4 h-4 text-amber-700" />
                <span>Traveler Advisory & Guidelines</span>
              </div>
              <ul className="space-y-1 text-xs text-amber-950 list-disc list-inside">
                {destination.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="text-xs text-stone-500">
            Coordinates: <span className="font-mono-code">{destination.coordinates.lat}, {destination.coordinates.lng}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition cursor-pointer"
          >
            Close Overview
          </button>
        </div>

      </div>
    </div>
  );
};
