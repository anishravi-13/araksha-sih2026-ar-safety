import React from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  Volume2, 
  VolumeX, 
  FileCheck, 
  Users, 
  Play, 
  FileText
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface NavbarProps {
  activeTab: 'trainee' | 'supervisor' | 'dgms' | 'validator';
  setActiveTab: (tab: 'trainee' | 'supervisor' | 'dgms' | 'validator') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  isBudgetPhoneMode: boolean;
  setIsBudgetPhoneMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenMeshSync: () => void;
  pendingSyncCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  isOffline,
  setIsOffline,
  isBudgetPhoneMode,
  setIsBudgetPhoneMode,
  soundEnabled,
  setSoundEnabled,
  onOpenMeshSync,
  pendingSyncCount
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Info */}
          <div 
            onClick={() => setActiveTab('trainee')} 
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-emerald-500 shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">
                  {t.appName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t.platformBadge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
                Industrial Safety &amp; Competency Platform
              </p>
            </div>
          </div>

          {/* Main Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setActiveTab('trainee')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'trainee'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              <Play className="w-4 h-4 text-amber-300" />
              <span>{t.traineeMode}</span>
            </button>

            <button
              onClick={() => setActiveTab('supervisor')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'supervisor'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              <Users className="w-4 h-4 text-cyan-300" />
              <span>{t.supervisorConsole}</span>
            </button>

            <button
              onClick={() => setActiveTab('dgms')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dgms'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-300" />
              <span>{t.dgmsAudit}</span>
            </button>

            <button
              onClick={() => setActiveTab('validator')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'validator'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              <FileCheck className="w-4 h-4 text-purple-300" />
              <span>{t.certificateValidator}</span>
            </button>
          </nav>

          {/* System Controls & Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <select
                aria-label="Language selection"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-slate-800 text-xs text-amber-300 border border-slate-700 rounded-xl px-2.5 py-1.5 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-sm"
              >
                <option value="en">English (EN)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="sat">ᱥᱟᱱᱛᱟᱲᱤ (Santali)</option>
              </select>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute Voice Guidance & Sound Effects" : "Enable Voice Guidance & Sound"}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Offline Mode Switcher */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              title={isOffline ? "Underground Mode Active (Zero Signal)" : "Cloud Surface Connected"}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isOffline
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span>{isOffline ? "Underground Mode" : "Surface Cloud"}</span>
            </button>

            {/* Mesh Sync Button */}
            <button
              onClick={onOpenMeshSync}
              title="Sync local records via Bluetooth/Wi-Fi Mesh to Surface Hub"
              className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 text-xs font-bold transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mesh Sync</span>
              {pendingSyncCount > 0 && (
                <span className="px-1.5 py-0.2 bg-orange-500 text-white rounded-full text-[10px] font-black">
                  {pendingSyncCount}
                </span>
              )}
            </button>

            {/* Budget Phone Viewport Toggle (₹10-12k Android phone optimization preview) */}
            <button
              onClick={() => setIsBudgetPhoneMode(!isBudgetPhoneMode)}
              title={isBudgetPhoneMode ? "Expand to Full Desktop View" : "Simulate ₹10-12k Android Mobile AR Viewport"}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isBudgetPhoneMode 
                  ? 'bg-orange-500/20 border-orange-500/40 text-orange-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isBudgetPhoneMode ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('trainee')}
            className={`flex flex-col items-center py-1 ${activeTab === 'trainee' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            <Play className="w-4 h-4 mb-0.5" />
            <span>Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('supervisor')}
            className={`flex flex-col items-center py-1 ${activeTab === 'supervisor' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span>Supervisor</span>
          </button>
          <button
            onClick={() => setActiveTab('dgms')}
            className={`flex flex-col items-center py-1 ${activeTab === 'dgms' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            <FileText className="w-4 h-4 mb-0.5" />
            <span>DGMS Audit</span>
          </button>
          <button
            onClick={() => setActiveTab('validator')}
            className={`flex flex-col items-center py-1 ${activeTab === 'validator' ? 'text-purple-400 font-bold' : 'text-slate-400'}`}
          >
            <FileCheck className="w-4 h-4 mb-0.5" />
            <span>Verify</span>
          </button>
        </div>
      </div>
    </header>
  );
};
