import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  ShieldCheck, 
  Download, 
  Search, 
  Filter, 
  Building2, 
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
    showToast(`Simulation training reassigned to personnel ${memberId}`);
  };

  const filteredCrew = crew.filter(m => {
    const matchSite = selectedSite === 'all' || m.unit.toLowerCase().includes(selectedSite.toLowerCase());
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.role.toLowerCase().includes(searchQuery.toLowerCase()) || m.unit.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRecruits = !filterNewRecruitsOnly || m.daysInService < 30;
    return matchSite && matchSearch && matchRecruits;
  });

  const newRecruitsCount = crew.filter(m => m.daysInService < 30).length;
  const highRiskCount = crew.filter(m => m.riskLevel === 'HIGH').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 border border-slate-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Regional Field Operations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Crew Safety Operations &amp; Certification Monitoring
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Live monitoring for Dhanbad Coalfields, Bokaro Steel Plant, and Koderma Mineral Mines
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenMeshSync}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mesh Sync</span>
            </button>

            <button
              onClick={onExportDGMS}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Form V Return</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Recruit Watch Notice */}
      <div className="bg-[#14121a] border border-amber-800/40 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-950/60 border border-amber-600/40 rounded-lg text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white">
                Under-30-Day Personnel Schedule
              </h3>
              <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.2 rounded-full">
                {newRecruitsCount} Active Recruits
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Personnel under 30 days of service require daily SOP simulation verification prior to shift deployment in accordance with statutory guidelines.
            </p>
          </div>
        </div>

        <button
          onClick={() => setFilterNewRecruitsOnly(!filterNewRecruitsOnly)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border cursor-pointer ${
            filterNewRecruitsOnly 
              ? 'bg-amber-500 text-slate-950 border-amber-400' 
              : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
          }`}
        >
          {filterNewRecruitsOnly ? "Show All Personnel" : "Filter <30-Day Recruits"}
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#111726] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Total Active Crew</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{crew.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Assigned to Shifts</div>
        </div>

        <div className="bg-[#111726] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Attention Flagged</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{highRiskCount}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Refresher Pending</div>
        </div>

        <div className="bg-[#111726] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Average Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">81.6%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Target: &gt;75%</div>
        </div>

        <div className="bg-[#111726] border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Sync Relays</span>
            <Radio className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">5 / 5</div>
          <div className="text-[11px] text-emerald-400 mt-0.5">Surface Node Active</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#111726] border border-slate-800 p-3 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            aria-label="Filter Site"
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="bg-[#090d16] text-xs text-white border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="all">All Regional Sites</option>
            <option value="dhanbad">BCCL Dhanbad Coalfield</option>
            <option value="bokaro">Bokaro Steel Works</option>
            <option value="koderma">Koderma Quarry Zone</option>
            <option value="jamshedpur">Tata Steel Works</option>
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search personnel or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#090d16] text-xs text-white placeholder-slate-500 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Crew Table */}
      <div className="bg-[#111726] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#090d16] text-slate-400 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Personnel</th>
                <th className="px-4 py-3">Deployment Unit</th>
                <th className="px-4 py-3">Service Days</th>
                <th className="px-4 py-3">Last Simulation</th>
                <th className="px-4 py-3">Safety Score</th>
                <th className="px-4 py-3">Risk Level</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredCrew.map((member) => (
                <tr key={member.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white flex items-center space-x-1.5">
                      <span>{member.name}</span>
                      {member.daysInService < 30 && (
                        <span className="text-[10px] bg-amber-950/60 text-amber-400 border border-amber-600/30 px-1 py-0.2 rounded font-mono">
                          &lt;30d
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">{member.role}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {member.unit}
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className={member.daysInService < 30 ? "text-amber-400 font-semibold" : "text-slate-400"}>
                      {member.daysInService} d
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400">
                    {member.lastTrainedDate}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold">
                    <span className={member.safetyScore >= 80 ? "text-emerald-400" : member.safetyScore >= 65 ? "text-amber-400" : "text-red-400"}>
                      {member.safetyScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                      member.riskLevel === 'LOW' 
                        ? 'bg-emerald-950/50 text-emerald-400' 
                        : member.riskLevel === 'MODERATE' 
                        ? 'bg-amber-950/50 text-amber-400' 
                        : 'bg-red-950/50 text-red-400'
                    }`}>
                      {member.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-medium ${
                      member.status === 'Certified' ? 'text-emerald-400' :
                      member.status === 'Under Training' ? 'text-cyan-400' :
                      member.status === 'Flagged' ? 'text-amber-400' : 'text-slate-400'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleAssignRefresher(member.id)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 rounded text-xs font-medium flex items-center space-x-1 ml-auto cursor-pointer"
                    >
                      <Send className="w-3 h-3 text-amber-400" />
                      <span>Reassign</span>
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
