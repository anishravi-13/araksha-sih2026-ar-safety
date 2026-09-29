import React from 'react';
import { 
  Shield, 
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
    <header className="sticky top-0 z-50 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Enterprise Brand */}
          <div 
            onClick={() => setActiveTab('trainee')} 
            className="flex items-center space-x-3 cursor-pointer select-none"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500 text-slate-950 font-black shadow-sm">
              <Shield className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                  {t.appName}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Industrial Safety &amp; Competency Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('trainee')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'trainee'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{t.traineeMode}</span>
            </button>

            <button
              onClick={() => setActiveTab('supervisor')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'supervisor'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.supervisorConsole}</span>
            </button>

            <button
              onClick={() => setActiveTab('dgms')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'dgms'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.dgmsAudit}</span>
            </button>

            <button
              onClick={() => setActiveTab('validator')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'validator'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>{t.certificateValidator}</span>
            </button>
          </nav>

          {/* Secondary Controls */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Language Selector */}
            <select
              aria-label="Language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 font-medium focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="en">EN (English)</option>
              <option value="hi">HI (हिन्दी)</option>
              <option value="sat">SAT (ᱥᱟᱱᱛᱟᱲᱤ)</option>
            </select>

            {/* Audio Voice Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? "Mute Voice Guidance" : "Enable Voice Guidance"}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Offline Mode Indicator */}
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                isOffline
                  ? 'bg-amber-950/50 border-amber-600/40 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isOffline ? "Underground Link" : "Surface Cloud"}</span>
            </button>

            {/* Mesh Sync */}
            <button
              onClick={onOpenMeshSync}
              className="relative flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline">Mesh</span>
              {pendingSyncCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-500 text-slate-950 rounded text-[10px] font-bold">
                  {pendingSyncCount}
                </span>
              )}
            </button>

            {/* Viewport Frame */}
            <button
              onClick={() => setIsBudgetPhoneMode(!isBudgetPhoneMode)}
              title={isBudgetPhoneMode ? "Desktop Viewport" : "Budget Mobile Viewport"}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isBudgetPhoneMode 
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {isBudgetPhoneMode ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-800/80 text-xs">
          <button
            onClick={() => setActiveTab('trainee')}
            className={`flex flex-col items-center py-1 ${activeTab === 'trainee' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            <Play className="w-4 h-4 mb-0.5" />
            <span>Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('supervisor')}
            className={`flex flex-col items-center py-1 ${activeTab === 'supervisor' ? 'text-slate-100 font-bold' : 'text-slate-400'}`}
          >
            <Users className="w-4 h-4 mb-0.5" />
            <span>Operations</span>
          </button>
          <button
            onClick={() => setActiveTab('dgms')}
            className={`flex flex-col items-center py-1 ${activeTab === 'dgms' ? 'text-slate-100 font-bold' : 'text-slate-400'}`}
          >
            <FileText className="w-4 h-4 mb-0.5" />
            <span>Compliance</span>
          </button>
          <button
            onClick={() => setActiveTab('validator')}
            className={`flex flex-col items-center py-1 ${activeTab === 'validator' ? 'text-slate-100 font-bold' : 'text-slate-400'}`}
          >
            <FileCheck className="w-4 h-4 mb-0.5" />
            <span>Registry</span>
          </button>
        </div>
      </div>
    </header>
  );
};
