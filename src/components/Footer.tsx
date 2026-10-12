import React from 'react';
import { Compass, ShieldCheck, MapPin, Phone, Mail, Award } from 'lucide-react';
import { MunicipalityCode } from '../types/tourism';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 text-sm">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white font-serif-title tracking-tight">LASMAVKU</span>
                <p className="text-xs text-stone-400">Integrated Tourism Management System</p>
              </div>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              A collaborative destination management, tour circuit packaging, and QR-code ticketing platform serving the five neighboring municipalities of Lapuyan, San Miguel, Margosatubig, Vincenzo A. Sagun, and Kumalarang in Zamboanga del Sur, Philippines.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-800 rounded-md text-[11px] font-medium text-emerald-400 border border-stone-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                LGU Tourism Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-800 rounded-md text-[11px] font-medium text-sky-400 border border-stone-700">
                <Award className="w-3.5 h-3.5 text-sky-400" />
                ISO/IEC 25010 Evaluated
              </span>
            </div>
          </div>

          {/* Col 2: The 5 Municipalities */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">The 5 Municipalities</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('municipality_detail', 'lapuyan')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Lapuyan (Subanen & Cascades)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('municipality_detail', 'san_miguel')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  San Miguel (Agro-Eco Ridge)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('municipality_detail', 'margosatubig')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Margosatubig (Igat Island & Port)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('municipality_detail', 'vincenzo_sagun')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Vincenzo A. Sagun (Triton Island)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('municipality_detail', 'kumalarang')} 
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Kumalarang (Mangroves & Bay)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Tourism Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-emerald-400 transition cursor-pointer">
                  Multi-Town Tour Circuits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-emerald-400 transition cursor-pointer">
                  Destinations & Waterfalls
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-emerald-400 transition cursor-pointer">
                  Hotels & Floating Cottages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scanner')} className="hover:text-emerald-400 transition cursor-pointer">
                  Gatekeeper QR Ticket Scanner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('research')} className="hover:text-purple-400 transition cursor-pointer">
                  ISO 25010 Research Evaluation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Provincial Desk</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Provincial Tourism Center, Pagadian City / Zamboanga del Sur</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+63 918 999 0011 (Hotline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>tourism@zamboangadelsur.gov.ph</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom row: Capstone notice & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} LASMAVKU System. Capstone Project for Zamboanga del Sur Municipal Cluster Tourism.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Agile Scrum Methodology</span>
            <span>·</span>
            <span>Manual GCash Review & QR-Ticketing</span>
            <span>·</span>
            <span>ISO/IEC 25010 Quality Framework</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
