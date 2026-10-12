import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Filter, 
  Building2, 
  CheckCircle2, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { 
  Destination, 
  DestinationCategory, 
  MunicipalityCode 
} from '../types/tourism';
import { getDestinations, getMunicipalities } from '../services/storageService';

interface DestinationsViewProps {
  onSelectDestination: (dest: Destination) => void;
  onNavigateToMunicipality: (id: MunicipalityCode) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  onSelectDestination,
  onNavigateToMunicipality
}) => {
  const destinations = getDestinations();
  const municipalities = getMunicipalities();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesSearch = 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.barangay.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesMuni = selectedMunicipality === 'all' || dest.municipalityId === selectedMunicipality;
      const matchesCat = selectedCategory === 'all' || dest.category === selectedCategory;

      return matchesSearch && matchesMuni && matchesCat;
    });
  }, [destinations, searchQuery, selectedMunicipality, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-emerald-700" />
          <span>Regional Destination Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif-title tracking-tight">
          Explore Attractions Across the 5 Towns
        </h1>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
          Search water cascades in Lapuyan, agro-parks in San Miguel, sandbars in Margosatubig, sea arches in Vincenzo A. Sagun, and mangrove boardwalks in Kumalarang.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
        
        {/* Search input & municipality selector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by attraction name, barangay, or keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-hidden"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedMunicipality}
              onChange={e => setSelectedMunicipality(e.target.value)}
              className="w-full py-2.5 px-3 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600 outline-hidden cursor-pointer"
            >
              <option value="all">All 5 Municipalities</option>
              {municipalities.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full py-2.5 px-3 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-emerald-600 outline-hidden cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="waterfall">Waterfalls & Cascades</option>
              <option value="island_beach">Islands, Beaches & Coves</option>
              <option value="ecopark_mangrove">Mangrove Ecoparks & Wetlands</option>
              <option value="cultural_heritage">Cultural Heritage & Subanen</option>
              <option value="viewpoint">Viewpoints & Ridges</option>
              <option value="agritourism">Agro-Tourism & Farms</option>
            </select>
          </div>

        </div>

        {/* Quick Segmented Municipality Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 text-xs">
          <span className="text-stone-400 text-[11px] font-bold uppercase tracking-wider mr-1 shrink-0">Quick Filter:</span>
          <button
            onClick={() => setSelectedMunicipality('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 ${
              selectedMunicipality === 'all' ? 'bg-emerald-700 text-white font-bold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            All Municipalities ({destinations.length})
          </button>
          {municipalities.map(m => {
            const count = destinations.filter(d => d.municipalityId === m.id).length;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMunicipality(m.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer shrink-0 ${
                  selectedMunicipality === m.id ? 'bg-emerald-700 text-white font-bold' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {m.name} ({count})
              </button>
            );
          })}
        </div>

      </div>

      {/* Destination Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <span>Showing <strong>{filteredDestinations.length}</strong> cataloged destinations</span>
          {(searchQuery || selectedMunicipality !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMunicipality('all');
                setSelectedCategory('all');
              }}
              className="text-emerald-700 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map(dest => {
              const muni = municipalities.find(m => m.id === dest.municipalityId);
              return (
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
                        <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                          {muni?.name}
                        </span>
                        <h3 className="font-extrabold text-base font-serif-title leading-snug line-clamp-1">
                          {dest.name}
                        </h3>
                        <span className="text-[11px] text-stone-300 block truncate">{dest.barangay}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 text-xs">
                      <p className="text-stone-600 line-clamp-2 leading-relaxed">
                        {dest.shortDescription}
                      </p>

                      {/* Amenities pills */}
                      {dest.amenities?.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {dest.amenities.slice(0, 3).map((a, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px]">
                              {a}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-stone-900">
                        {dest.entryFee > 0 ? `₱${dest.entryFee} Entry Fee` : 'Free Admission'}
                      </span>
                      <span className="text-emerald-800 font-bold group-hover:text-emerald-700">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
            <MapPin className="w-8 h-8 text-stone-400 mx-auto" />
            <h3 className="text-base font-bold text-stone-900">No destinations found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              No attractions match your current filter criteria. Try adjusting the search or selecting another municipality.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
