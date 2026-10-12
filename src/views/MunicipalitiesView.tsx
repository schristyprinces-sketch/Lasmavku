import React from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  Phone, 
  Mail, 
  Sparkles,
  Calendar,
  Compass
} from 'lucide-react';
import { Municipality, MunicipalityCode } from '../types/tourism';
import { getMunicipalities, getDestinationsByMunicipality } from '../services/storageService';

interface MunicipalitiesViewProps {
  onSelectMunicipality: (id: MunicipalityCode) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const MunicipalitiesView: React.FC<MunicipalitiesViewProps> = ({
  onSelectMunicipality,
  onNavigate
}) => {
  const municipalities = getMunicipalities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>The Five Participating LGUs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif-title tracking-tight">
          Municipalities of Zamboanga del Sur
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          The LASMAVKU system integrates five neighboring municipalities: Lapuyan, San Miguel, Margosatubig, Vincenzo A. Sagun, and Kumalarang. Each local government unit maintains its distinct cultural identity and natural treasures while offering shared cross-municipality tour circuits.
        </p>
      </div>

      {/* Municipality Profiles Cards */}
      <div className="space-y-10">
        {municipalities.map((m, index) => {
          const dests = getDestinationsByMunicipality(m.id);
          const isEven = index % 2 === 0;

          return (
            <div
              key={m.id}
              className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 group"
            >
              {/* Cover Image */}
              <div className={`lg:col-span-5 h-64 lg:h-auto overflow-hidden relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <img
                  src={m.coverImage}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                    LGU Profile #{index + 1}
                  </span>
                  <h2 className="text-2xl font-bold font-serif-title leading-tight">
                    {m.fullName}
                  </h2>
                </div>
              </div>

              {/* Information Column */}
              <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5 text-xs ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wide">
                      {m.tagline}
                    </h3>
                    <p className="text-stone-600 leading-relaxed mt-1 text-xs sm:text-sm">
                      {m.description}
                    </p>
                  </div>

                  {/* Reasons to Visit */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1.5">
                      Key Experiences & Attractions
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-stone-700">
                      {m.reasonsToVisit.slice(0, 4).map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-700 font-bold shrink-0">✓</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Festivals & Annual Events */}
                  {m.festivals?.length > 0 && (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-stone-900">
                          {m.festivals[0].name} ({m.festivals[0].month})
                        </span>
                        <p className="text-[11px] text-stone-500">
                          {m.festivals[0].description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tourism Office Strip */}
                  <div className="pt-2 text-[11px] text-stone-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{m.tourismOffice.officeName}: <strong>{m.tourismOffice.contactNumber}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{m.tourismOffice.email}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-500">
                    Registered Destinations: <strong className="text-stone-800">{dests.length} cataloged</strong>
                  </div>

                  <button
                    onClick={() => onSelectMunicipality(m.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition cursor-pointer shadow-xs"
                  >
                    <span>View {m.name} Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
