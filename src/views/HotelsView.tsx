import React, { useState } from 'react';
import { 
  Hotel, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Star,
  Compass
} from 'lucide-react';
import { Accommodation, MunicipalityCode } from '../types/tourism';
import { getAccommodations, getMunicipalities } from '../services/storageService';

export const HotelsView: React.FC = () => {
  const accommodations = getAccommodations();
  const municipalities = getMunicipalities();

  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredHotels = accommodations.filter(acc => {
    const matchesMuni = selectedMunicipality === 'all' || acc.municipalityId === selectedMunicipality;
    const matchesCat = selectedCategory === 'all' || acc.category === selectedCategory;
    return matchesMuni && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider">
          <Hotel className="w-4 h-4 text-sky-700" />
          <span>Accredited Hospitality Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif-title tracking-tight">
          Accommodations & Floating Cottages
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Stay comfortably within the five municipalities. From Subanen cultural homestays in Lapuyan and highland villas in San Miguel, to port hotels in Margosatubig and overwater floating cottages in Kumalarang.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Municipality Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setSelectedMunicipality('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer shrink-0 ${
              selectedMunicipality === 'all' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Municipalities ({accommodations.length})
          </button>
          {municipalities.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMunicipality(m.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 ${
                selectedMunicipality === m.id ? 'bg-emerald-700 text-white font-bold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Category selector */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 font-medium text-xs focus:border-emerald-600 outline-hidden cursor-pointer"
        >
          <option value="all">All Lodging Types</option>
          <option value="floating_cottage">Floating Cottages & Suites</option>
          <option value="resort">Resorts & Villas</option>
          <option value="hotel">Harbour & City Hotels</option>
          <option value="inn_homestay">Cultural Inns & Homestays</option>
        </select>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map(acc => {
          const muni = municipalities.find(m => m.id === acc.municipalityId);
          return (
            <div
              key={acc.id}
              className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 w-full overflow-hidden relative">
                  <img
                    src={acc.images[0]}
                    alt={acc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
                  
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                    {acc.category.replace('_', ' ')}
                  </span>

                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                      {muni?.name}
                    </span>
                    <h3 className="font-extrabold text-base font-serif-title leading-snug line-clamp-1">
                      {acc.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <p className="text-stone-600 line-clamp-2 leading-relaxed">
                    {acc.description}
                  </p>

                  <div className="text-[11px] text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{acc.address}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {acc.amenities.slice(0, 3).map((a, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Indicative Rate</span>
                    <span className="font-extrabold text-stone-900 text-base">
                      ₱{acc.pricePerNight.toLocaleString()} <span className="text-xs font-normal text-stone-500">/ night</span>
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase font-bold block">Inquiries</span>
                    <span className="font-semibold text-emerald-800 text-xs">{acc.contactNumber}</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
