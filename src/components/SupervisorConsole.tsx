import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Building2, 
  Clock, 
  CheckCircle, 
  RefreshCw, 
  Send,
  Radio
} from 'lucide-react';
import { CrewMember } from '../types';
import { mockCrewMembers } from '../utils/mockData';

interface SupervisorConsoleProps {
  onExportDGMS: () => void;
  onOpenMeshSync: () => void;
}

export const SupervisorConsole: React.FC<SupervisorConsoleProps> = ({
  onExportDGMS,
  onOpenMeshSync
}) => {
  const [crew, setCrew] = useState<CrewMember[]>(mockCrewMembers);
  const [selectedSite, setSelectedSite] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterNewRecruitsOnly, setFilterNewRecruitsOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAssignRefresher = (memberId: string) => {
    setCrew(prev => prev.map(m => {
      if (m.id === memberId) {
        return { ...m, status: 'Under Training' };
      }
      return m;
    }));
    showToast(`Mandatory AR Gas & LOTO Refresher assigned to worker ${memberId}!`);
  };

  // Filtered members
  const filteredCrew = crew.filter(m => {
    const matchSite = selectedSite === 'all' || m.unit.toLowerCase().includes(selectedSite.toLowerCase());
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.role.toLowerCase().includes(searchQuery.toLowerCase()) || m.unit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRecruits = !filterNewRecruitsOnly || m.daysInService < 30;
    return matchSite && matchSearch && matchRecruits;
  });

  const newRecruitsCount = crew.filter(m => m.daysInService < 30).length;
  const highRiskCount = crew.filter(m => m.riskLevel === 'HIGH').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Jharkhand Regional Multi-Site Compliance Console</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Supervisor &amp; Safety Officer Command Dashboard
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Centralized monitoring for Dhanbad Coalfields, Bokaro Steel Plant, and Koderma Mica Mining
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenMeshSync}
              className="px-3.5 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Pithead Mesh Sync</span>
            </button>

            <button
              onClick={onExportDGMS}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-extrabold flex items-center space-x-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export DGMS Form V Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* High Priority Alert Box: 48 Fatal Mine Accidents (Jharkhand DGMS Stat) */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-red-950/60 border border-red-500/40 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-red-600/20 border border-red-500/40 rounded-xl text-red-400 shrink-0">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">
                Under-30-Day Orientation Watchlist (Critical Safety Focus)
              </h3>
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                {newRecruitsCount} Recruits Monitored
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Based on DGMS Jharkhand Fatal Accident Reports (48 fatal incidents in 2022–23), workers under 30 days face high casualty exposure. ARAKSHA automatically enforces mandatory daily AR simulation checkpoints before underground dispatch.
            </p>
          </div>
        </div>

        <button
          onClick={() => setFilterNewRecruitsOnly(!filterNewRecruitsOnly)}
          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
            filterNewRecruitsOnly 
              ? 'bg-red-600 text-white border-red-500' 
              : 'bg-slate-800 text-red-400 border-red-500/40 hover:bg-red-950/40'
          }`}
        >
          {filterNewRecruitsOnly ? "Show All Workers" : "Filter <30-Day Recruits"}
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Active Crew</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{crew.length}</div>
          <div className="text-[11px] text-emerald-400 mt-1">100% Geo-tagged</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>High Risk Flagged</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-black text-red-400 font-mono">{highRiskCount}</div>
          <div className="text-[11px] text-red-400 mt-1">Intervention Required</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Safety Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">81.6%</div>
          <div className="text-[11px] text-slate-400 mt-1">Target: &gt;75%</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Mesh Synced Pits</span>
            <Radio className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-400 font-mono">5 / 5</div>
          <div className="text-[11px] text-emerald-400 mt-1">Pithead Relay Active</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            aria-label="Filter by Mine Unit"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="bg-slate-850 text-xs text-white border border-slate-700 rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
          >
            <option value="all">All Jharkhand Sites</option>
            <option value="dhanbad">BCCL Dhanbad Coking Coal</option>
            <option value="bokaro">Bokaro Steel Plant (SAIL)</option>
            <option value="koderma">Koderma Mica Processing Zone</option>
            <option value="jamshedpur">Tata Steel Industrial Jamshedpur</option>
          </select>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search worker, role, or unit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-850 text-xs text-white placeholder-slate-500 border border-slate-700 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Crew Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-850 text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Worker / Role</th>
                <th className="px-4 py-3">Industrial Unit</th>
                <th className="px-4 py-3">Service Days</th>
                <th className="px-4 py-3">Last AR Test</th>
                <th className="px-4 py-3">Safety Score</th>
                <th className="px-4 py-3">Risk Level</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Supervisor Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredCrew.map((member) => (
                <tr key={member.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-white flex items-center space-x-1.5">
                      <span>{member.name}</span>
                      {member.daysInService < 30 && (
                        <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 px-1.5 py-0.2 rounded font-black">
                          &lt;30d
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{member.role}</div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">
                    {member.unit}
                  </td>
                  <td className="px-4 py-3.5 font-mono">
                    <span className={member.daysInService < 30 ? "text-amber-400 font-bold" : "text-slate-400"}>
                      {member.daysInService} days
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-400">
                    {member.lastTrainedDate}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold">
                    <span className={member.safetyScore >= 80 ? "text-emerald-400" : member.safetyScore >= 65 ? "text-amber-400" : "text-red-400"}>
                      {member.safetyScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black ${
                      member.riskLevel === 'LOW' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : member.riskLevel === 'MODERATE' 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}>
                      {member.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-[11px] font-semibold ${
                      member.status === 'Certified' ? 'text-emerald-400' :
                      member.status === 'Under Training' ? 'text-blue-400' :
                      member.status === 'Flagged' ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleAssignRefresher(member.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center space-x-1 ml-auto cursor-pointer"
                    >
                      <Send className="w-3 h-3 text-cyan-400" />
                      <span>Re-assign AR</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
