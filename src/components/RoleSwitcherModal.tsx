import React from 'react';
import { X, Check, ShieldCheck, User, Building2, Crown, Sparkles } from 'lucide-react';
import { UserAccount, MunicipalityCode } from '../types/tourism';
import { getUsers, setCurrentUser } from '../services/storageService';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onUserChanged: (user: UserAccount) => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged
}) => {
  if (!isOpen) return null;

  const users = getUsers();

  const handleSelectUser = (user: UserAccount) => {
    setCurrentUser(user);
    onUserChanged(user);
    onClose();
  };

  const getRoleIcon = (role: string) => {
    if (role === 'super_admin') return <Crown className="w-5 h-5 text-amber-600" />;
    if (role === 'lgu_admin') return <Building2 className="w-5 h-5 text-emerald-600" />;
    return <User className="w-5 h-5 text-sky-600" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-start justify-between bg-stone-50 rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Role-Based Access Control (RBAC) Testing</span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 font-serif-title">
              Select Demo User Account
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Test LASMAVKU from the perspective of a tourist, an LGU municipal officer (Lapuyan, San Miguel, Margosatubig, Vincenzo Sagun, Kumalarang), or the provincial Super Admin.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Account List */}
        <div className="p-6 space-y-3">
          
          {/* Section: Tourist */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 pt-1">
            Tourist & Traveler Account
          </div>
          {users
            .filter(u => u.role === 'tourist')
            .map(user => {
              const isSelected = currentUser.id === user.id;
              return (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'border-sky-500 bg-sky-50/70 ring-1 ring-sky-500' 
                      : 'border-stone-200 hover:border-sky-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <span>{user.fullName}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                          Tourist
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">{user.email}</p>
                      <p className="text-[11px] text-stone-600 mt-0.5">Can browse packages, calculate prices, submit GCash receipts, and view approved QR tickets.</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

          {/* Section: LGU Admins */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 pt-3">
            LGU Municipality Tourism Officers (5 Municipalities)
          </div>
          {users
            .filter(u => u.role === 'lgu_admin')
            .map(user => {
              const isSelected = currentUser.id === user.id;
              const townName = user.assignedMunicipalityId ? user.assignedMunicipalityId.replace('_', ' ').toUpperCase() : '';
              return (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-500' 
                      : 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <span>{user.fullName}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                          {townName} LGU Admin
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">{user.title}</p>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Scoped to {townName}. Reviews local GCash receipts, approves bookings, manages local destinations & itineraries.
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

          {/* Section: Super Admin */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 pt-3">
            System-Wide Super Administrator
          </div>
          {users
            .filter(u => u.role === 'super_admin')
            .map(user => {
              const isSelected = currentUser.id === user.id;
              return (
                <div
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected 
                      ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500' 
                      : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-900 flex items-center gap-2">
                        <span>{user.fullName}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                          Super Admin
                        </span>
                      </div>
                      <p className="text-xs text-stone-500">{user.title}</p>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        Provincial Level: Oversees all 5 towns, creates cross-municipality tour circuits, reviews system-wide revenues, exports reports.
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-right rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition cursor-pointer"
          >
            Close Dialog
          </button>
        </div>

      </div>
    </div>
  );
};
