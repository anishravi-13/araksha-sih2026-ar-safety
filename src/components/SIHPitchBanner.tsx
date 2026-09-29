import React, { useState } from 'react';
import { Award, ChevronDown, ChevronUp, AlertTriangle, Cpu, Globe2, ShieldAlert } from 'lucide-react';

export const SIHPitchBanner: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-amber-500/30 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          {/* Header Tag */}
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold border border-amber-500/30 flex items-center space-x-1">
                <Award className="w-3 h-3 text-amber-400 inline" />
                <span>SIH 2026 Solution</span>
              </span>
              <span className="text-slate-300 font-semibold">PS ID: SIH26041</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden sm:inline">Theme: Smart Education (Software)</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-emerald-400 font-medium">Team Techwolves (ID: 139519)</span>
            </div>
          </div>

          {/* Quick Toggle Details */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center space-x-1 text-xs text-amber-400 hover:text-amber-300 font-medium self-end md:self-auto cursor-pointer"
          >
            <span>{expanded ? "Hide Problem Statement & Research Specs" : "View PPT Research & Core Solution Highlights"}</span>
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible Info Cards */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs animate-in fade-in duration-300">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-red-500/20">
              <div className="flex items-center space-x-2 text-red-400 font-bold mb-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>The Crisis in Jharkhand</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">48 DGMS-recorded fatal mine accidents</strong> in Jharkhand (2022-23), with disproportionate casualties among new recruits under 30 days of orientation. Conventional paper manuals yield <strong className="text-red-400">&lt;20% retention</strong>.
              </p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-amber-500/20">
              <div className="flex items-center space-x-2 text-amber-400 font-bold mb-1.5">
                <Cpu className="w-4 h-4" />
                <span>ARAKSHA Technical Innovation</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Zero-risk interactive AR scenarios running on <strong className="text-white">₹10-12k budget Android phones</strong>. Reaction-based timing, pre-entry AI PPE camera scanning, and offline-first mesh synchronization for deep underground pits with zero network.
              </p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-emerald-500/20">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold mb-1.5">
                <Globe2 className="w-4 h-4" />
                <span>Statutory & Regional Inclusivity</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Full voice-first guidance in <strong className="text-emerald-300">Hindi and Santali (Ol Chiki)</strong> for low-literacy miners. Cryptographic tamper-proof QR certificates compliant with <strong className="text-white">Mines Act 1952</strong> &amp; <strong className="text-white">OSH Code 2020</strong>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
