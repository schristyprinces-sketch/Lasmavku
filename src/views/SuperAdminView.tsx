import React, { useState } from 'react';
import { 
  Crown, 
  BarChart3, 
  Calendar, 
  Building2, 
  Users, 
  DollarSign, 
  Download, 
  Printer, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  Layers,
  FileSpreadsheet,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { 
  UserAccount, 
  Booking, 
  TourPackage, 
  Municipality, 
  MunicipalityCode 
} from '../types/tourism';
import { 
  getBookings, 
  getPackages, 
  getMunicipalities, 
  getDestinations,
  savePackage,
  deletePackage,
  updateMunicipality
} from '../services/storageService';

interface SuperAdminViewProps {
  currentUser: UserAccount;
  onRefreshData: () => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({
  currentUser,
  onRefreshData
}) => {
  const bookings = getBookings();
  const packages = getPackages();
  const municipalities = getMunicipalities();
  const destinations = getDestinations();

  const [activeTab, setActiveTab] = useState<'analytics' | 'circuits' | 'municipalities'>('analytics');
  
  // Package editing state
  const [editingPackage, setEditingPackage] = useState<Partial<TourPackage> | null>(null);

  // Municipality editing state
  const [editingMuni, setEditingMuni] = useState<Municipality | null>(null);

  // Analytics Computations
  const totalBookings = bookings.length;
  const approvedBookings = bookings.filter(b => b.bookingStatus === 'approved');
  const totalTouristsPax = approvedBookings.reduce((sum, b) => sum + b.paxCount, 0);
  const totalRevenue = approvedBookings.reduce((sum, b) => sum + b.totalAmount, 0);

  // Revenue & Pax by Municipality
  const muniStats = municipalities.map(m => {
    const muniBookings = approvedBookings.filter(b => b.participatingMunicipalityIds.includes(m.id));
    const pax = muniBookings.reduce((sum, b) => sum + b.paxCount, 0);
    const revenue = muniBookings.reduce((sum, b) => sum + (b.totalAmount / b.participatingMunicipalityIds.length), 0);
    return {
      municipality: m,
      pax,
      revenue,
      bookingsCount: muniBookings.length
    };
  });

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Booking Reference', 'Tour Package', 'Tourist Name', 'Email', 'Phone', 'Travel Date', 'Pax', 'Total Amount (PHP)', 'Status', 'GCash Reference', 'Created At'];
    const rows = bookings.map(b => [
      b.bookingReference,
      `"${b.packageName.replace(/"/g, '""')}"`,
      `"${b.touristName}"`,
      b.touristEmail,
      b.touristPhone,
      b.travelDate,
      b.paxCount,
      b.totalAmount,
      b.bookingStatus,
      b.gcashReceipt?.referenceNumber || 'N/A',
      b.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `LASMAVKU_Consolidated_Tourism_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveCircuit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage || !editingPackage.name) return;

    const saved: TourPackage = {
      id: editingPackage.id || `pkg-circuit-${Date.now()}`,
      name: editingPackage.name,
      tagline: editingPackage.tagline || 'Cross-Municipality Tour Circuit',
      scope: 'cross_municipality',
      participatingMunicipalityIds: editingPackage.participatingMunicipalityIds?.length ? editingPackage.participatingMunicipalityIds : ['lapuyan', 'san_miguel'],
      description: editingPackage.description || '',
      durationDays: Number(editingPackage.durationDays) || 2,
      durationNights: Number(editingPackage.durationNights) || 1,
      pricePerPerson: Number(editingPackage.pricePerPerson) || 2500,
      minPax: Number(editingPackage.minPax) || 2,
      maxPax: Number(editingPackage.maxPax) || 15,
      includedDestinationIds: editingPackage.includedDestinationIds || [],
      inclusions: editingPackage.inclusions || ['Transfers across municipalities', 'LGU environmental permits', 'Local guide'],
      exclusions: editingPackage.exclusions || ['Personal expenses'],
      coverImage: editingPackage.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      badge: editingPackage.badge || 'Shared Circuit',
      isPublished: true,
      difficulty: editingPackage.difficulty || 'Moderate'
    };

    savePackage(saved);
    setEditingPackage(null);
    onRefreshData();
  };

  const handleSaveMunicipalityProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMuni) return;
    updateMunicipality(editingMuni);
    setEditingMuni(null);
    onRefreshData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Super Admin Header */}
      <div className="p-6 rounded-2xl bg-stone-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-stone-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Provincial Tourism Super Administrator
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif-title">
            LASMAVKU Central Command & Analytics
          </h1>
          <p className="text-xs text-stone-300">
            System Overseer: <strong className="text-white">{currentUser.fullName}</strong> ({currentUser.email})
          </p>
        </div>

        {/* Export Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Manifest Report</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition cursor-pointer ${
            activeTab === 'analytics' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Consolidated Analytics & Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('circuits')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition cursor-pointer ${
            activeTab === 'circuits' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Cross-Municipality Shared Packages ({packages.filter(p => p.scope === 'cross_municipality').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('municipalities')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition cursor-pointer ${
            activeTab === 'municipalities' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Municipality Profiles & Tourism Trust Info</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS & REPORTS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Approved Revenue</span>
              <div className="text-2xl font-black text-emerald-800 font-serif-title">
                ₱{totalRevenue.toLocaleString()}
              </div>
              <span className="text-[11px] text-stone-500">Collected via verified GCash</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Tourist Pax</span>
              <div className="text-2xl font-black text-stone-900 font-serif-title">
                {totalTouristsPax} Visitors
              </div>
              <span className="text-[11px] text-stone-500">Across 5 municipalities</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Total Bookings Logged</span>
              <div className="text-2xl font-black text-stone-900 font-serif-title">
                {totalBookings} Entries
              </div>
              <span className="text-[11px] text-stone-500">{approvedBookings.length} approved, {bookings.filter(b => b.bookingStatus === 'pending_review').length} pending</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Active Circuit Packages</span>
              <div className="text-2xl font-black text-teal-800 font-serif-title">
                {packages.length} Packages
              </div>
              <span className="text-[11px] text-stone-500">{packages.filter(p => p.scope === 'cross_municipality').length} multi-town circuits</span>
            </div>
          </div>

          {/* Municipality Revenue & Pax Breakdown Table */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-serif-title text-stone-900">
                  Municipal Cluster Revenue & Tourist Traffic Breakdown
                </h3>
                <p className="text-xs text-stone-500">
                  Consolidated reporting across Lapuyan, San Miguel, Margosatubig, Vincenzo A. Sagun, and Kumalarang.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Municipality</th>
                    <th className="py-3 px-3">Tourism Officer</th>
                    <th className="py-3 px-3 text-center">Approved Bookings</th>
                    <th className="py-3 px-3 text-center">Total Tourist Pax</th>
                    <th className="py-3 px-3 text-right">Estimated Revenue (PHP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {muniStats.map((stat, idx) => (
                    <tr key={stat.municipality.id} className="hover:bg-stone-50 transition">
                      <td className="py-3 px-3 font-bold text-stone-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span>{stat.municipality.name}</span>
                      </td>
                      <td className="py-3 px-3 text-stone-600">
                        {stat.municipality.tourismOffice.officerInCharge}
                      </td>
                      <td className="py-3 px-3 text-center font-semibold">
                        {stat.bookingsCount}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-emerald-800">
                        {stat.pax} Pax
                      </td>
                      <td className="py-3 px-3 text-right font-mono-code font-bold text-stone-900">
                        ₱{Math.round(stat.revenue).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: CROSS-MUNICIPALITY CIRCUITS MANAGER */}
      {activeTab === 'circuits' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-serif-title text-stone-900">
                Cross-Municipality Shared Packages
              </h2>
              <p className="text-xs text-stone-500">
                Design multi-town tour circuits linking attractions across different local government units.
              </p>
            </div>

            <button
              onClick={() => setEditingPackage({
                name: '',
                tagline: '',
                scope: 'cross_municipality',
                participatingMunicipalityIds: ['lapuyan', 'san_miguel', 'margosatubig'],
                durationDays: 3,
                durationNights: 2,
                pricePerPerson: 3500,
                minPax: 4,
                maxPax: 15,
                description: '',
                inclusions: ['Inter-town van transport', 'Accredited guides', 'All municipal permits'],
                exclusions: ['Personal snacks'],
                coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                badge: 'Multi-Town Circuit',
                difficulty: 'Moderate'
              })}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create Shared Circuit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.filter(p => p.scope === 'cross_municipality').map(pkg => (
              <div
                key={pkg.id}
                className="rounded-2xl border border-stone-200 bg-white p-5 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="h-44 w-full rounded-xl overflow-hidden relative">
                    <img src={pkg.coverImage} alt={pkg.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold">
                      {pkg.durationDays}D{pkg.durationNights > 0 ? `${pkg.durationNights}N` : ''}
                    </span>
                  </div>

                  <h3 className="font-bold text-base font-serif-title text-stone-900 pt-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {pkg.participatingMunicipalityIds.map(mId => (
                      <span key={mId} className="px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-semibold">
                        {mId.replace('_', ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-bold text-emerald-800 pt-1">
                    ₱{pkg.pricePerPerson.toLocaleString()} / person ({pkg.minPax}-{pkg.maxPax} pax)
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setEditingPackage(pkg)}
                    className="font-semibold text-amber-800 hover:underline cursor-pointer"
                  >
                    Edit Circuit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this shared package?')) {
                        deletePackage(pkg.id);
                        onRefreshData();
                      }
                    }}
                    className="font-semibold text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MUNICIPALITY PROFILES & TRUST INFO */}
      {activeTab === 'municipalities' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-serif-title text-stone-900">
                Municipality Profiles & GCash Trust Accounts
              </h2>
              <p className="text-xs text-stone-500">
                Update municipal history, cultural heritage notes, tourism officer contacts, and GCash revenue accounts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {municipalities.map(m => (
              <div
                key={m.id}
                className="rounded-2xl border border-stone-200 bg-white p-5 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2 text-xs">
                  <div className="h-40 w-full rounded-xl overflow-hidden relative">
                    <img src={m.coverImage} alt={m.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
                    <span className="absolute bottom-2 left-2 text-white font-bold text-sm font-serif-title">
                      {m.fullName}
                    </span>
                  </div>

                  <p className="text-stone-600 line-clamp-2">
                    {m.description}
                  </p>

                  <div className="p-3 bg-stone-50 rounded-xl space-y-1">
                    <div className="text-[10px] font-bold uppercase text-stone-400">GCash Account Name:</div>
                    <div className="font-semibold text-stone-800 text-[11px] truncate">{m.tourismOffice.gcashAccountName}</div>
                    <div className="font-mono-code font-bold text-blue-900">{m.tourismOffice.gcashNumber}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex justify-end">
                  <button
                    onClick={() => setEditingMuni(m)}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition cursor-pointer"
                  >
                    Edit Profile & GCash
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: EDIT MUNICIPALITY PROFILE */}
      {editingMuni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold font-serif-title text-stone-900">
                Edit {editingMuni.fullName} Profile
              </h3>
              <button onClick={() => setEditingMuni(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleSaveMunicipalityProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingMuni.tagline}
                  onChange={e => setEditingMuni({ ...editingMuni, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={editingMuni.description}
                  onChange={e => setEditingMuni({ ...editingMuni, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Historical Background</label>
                <textarea
                  rows={3}
                  value={editingMuni.history}
                  onChange={e => setEditingMuni({ ...editingMuni, history: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                <div>
                  <label className="block font-bold text-blue-950 mb-1">GCash Account Name</label>
                  <input
                    type="text"
                    value={editingMuni.tourismOffice.gcashAccountName}
                    onChange={e => setEditingMuni({
                      ...editingMuni,
                      tourismOffice: {
                        ...editingMuni.tourismOffice,
                        gcashAccountName: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-blue-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-blue-950 mb-1">GCash Mobile Number</label>
                  <input
                    type="text"
                    value={editingMuni.tourismOffice.gcashNumber}
                    onChange={e => setEditingMuni({
                      ...editingMuni,
                      tourismOffice: {
                        ...editingMuni.tourismOffice,
                        gcashNumber: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 rounded-lg border border-blue-300 bg-white font-mono-code"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingMuni.coverImage}
                  onChange={e => setEditingMuni({ ...editingMuni, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingMuni(null)}
                  className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-700 text-white font-bold"
                >
                  Save Municipality Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CIRCUIT PACKAGE FORM */}
      {editingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold font-serif-title text-stone-900">
                {editingPackage.id ? 'Edit Multi-Town Circuit' : 'Create New Multi-Town Circuit'}
              </h3>
              <button onClick={() => setEditingPackage(null)} className="text-stone-400 hover:text-stone-700">✕</button>
            </div>

            <form onSubmit={handleSaveCircuit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Circuit Package Name *</label>
                <input
                  type="text"
                  required
                  value={editingPackage.name || ''}
                  onChange={e => setEditingPackage({ ...editingPackage, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Duration Days</label>
                  <input
                    type="number"
                    min="1"
                    value={editingPackage.durationDays ?? 3}
                    onChange={e => setEditingPackage({ ...editingPackage, durationDays: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Duration Nights</label>
                  <input
                    type="number"
                    min="0"
                    value={editingPackage.durationNights ?? 2}
                    onChange={e => setEditingPackage({ ...editingPackage, durationNights: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Rate Per Person (₱)</label>
                  <input
                    type="number"
                    min="100"
                    value={editingPackage.pricePerPerson ?? 3500}
                    onChange={e => setEditingPackage({ ...editingPackage, pricePerPerson: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Min Pax</label>
                  <input
                    type="number"
                    min="1"
                    value={editingPackage.minPax ?? 4}
                    onChange={e => setEditingPackage({ ...editingPackage, minPax: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Max Pax</label>
                  <input
                    type="number"
                    min="1"
                    value={editingPackage.maxPax ?? 15}
                    onChange={e => setEditingPackage({ ...editingPackage, maxPax: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingPackage.description || ''}
                  onChange={e => setEditingPackage({ ...editingPackage, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={editingPackage.coverImage || ''}
                  onChange={e => setEditingPackage({ ...editingPackage, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingPackage(null)}
                  className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-600 text-white font-bold"
                >
                  Save Circuit Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
