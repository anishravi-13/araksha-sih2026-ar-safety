import React, { useRef } from 'react';
import { 
  FileText, 
  Printer, 
  X, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Award 
} from 'lucide-react';
import { mockDGMSStatutoryRecord, mockCrewMembers } from '../utils/mockData';

interface DGMSAuditReportModalProps {
  onClose: () => void;
}

export const DGMSAuditReportModal: React.FC<DGMSAuditReportModalProps> = ({ onClose }) => {
  const printRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const highRiskRecruits = mockCrewMembers.filter(m => m.daysInService < 30);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#111726] border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
        
        {/* Top actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Statutory Form V Compliance Audit Return</h3>
              <p className="text-[11px] text-slate-400">Periodic Safety &amp; Vocational Training Record</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Form */}
        <div 
          ref={printRef}
          className="bg-white text-slate-900 p-6 sm:p-8 rounded-xl border border-slate-300 shadow-md space-y-5 text-xs print:p-0 print:border-none print:shadow-none font-sans"
        >
          {/* Header */}
          <div className="text-center border-b border-slate-800 pb-3 space-y-1">
            <div className="text-base font-bold tracking-tight uppercase text-slate-900">
              Government of India • Ministry of Labour &amp; Employment
            </div>
            <div className="text-sm font-semibold text-slate-700">
              DIRECTORATE GENERAL OF MINES SAFETY (DGMS)
            </div>
            <div className="text-[11px] text-slate-600 font-serif">
              Eastern &amp; South-Eastern Zone, Dhanbad, Jharkhand
            </div>
            <div className="inline-block mt-1 px-3 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-slate-800 text-[11px]">
              FORM V: STATUTORY WORKER SIMULATION COMPETENCY AUDIT RETURN
            </div>
          </div>

          {/* Statutory References */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-[11px]">
            <div>
              <span className="font-semibold text-slate-600 block">Statutory Mandate:</span>
              <span className="text-slate-800 font-medium">{mockDGMSStatutoryRecord.actCitation}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600 block">Standard Directive:</span>
              <span className="text-slate-800 font-medium">{mockDGMSStatutoryRecord.standardCode}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600 block">Regional Jurisdiction:</span>
              <span className="text-slate-800 font-medium">{mockDGMSStatutoryRecord.auditPeriod}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600 block">Compliance Audit Status:</span>
              <span className="text-emerald-800 font-bold">✓ {mockDGMSStatutoryRecord.inspectionStatus} (100% Verified)</span>
            </div>
          </div>

          {/* Key Compliance Metrics */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 border-b pb-1">
              Section A: Simulation Training Summary
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">Certified Personnel</span>
                <span className="text-lg font-bold text-slate-900 font-mono">1,248</span>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">&lt;30-Day Recruits Tracked</span>
                <span className="text-lg font-bold text-amber-800 font-mono">142</span>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">Field Simulations Run</span>
                <span className="text-lg font-bold text-slate-900 font-mono">3,890</span>
              </div>
              <div className="p-2.5 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">Average Retention Score</span>
                <span className="text-lg font-bold text-emerald-800 font-mono">81.6%</span>
              </div>
            </div>
          </div>

          {/* New Recruits Watchlist Table */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 border-b pb-1 flex items-center justify-between">
              <span>Section B: Orientation Schedule (&lt;30 Days Service)</span>
              <span className="text-[10px] text-amber-800 font-medium">Jharkhand Mining Standard Rule 24</span>
            </h4>
            <table className="w-full text-left border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b text-[11px]">
                <tr>
                  <th className="p-2">Personnel Name</th>
                  <th className="p-2">Deployment Unit</th>
                  <th className="p-2">Days in Service</th>
                  <th className="p-2">Simulation Score</th>
                  <th className="p-2">Risk Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {highRiskRecruits.map(r => (
                  <tr key={r.id}>
                    <td className="p-2 font-medium">{r.name}</td>
                    <td className="p-2">{r.unit}</td>
                    <td className="p-2 font-mono text-amber-900 font-medium">{r.daysInService} d</td>
                    <td className="p-2 font-mono">{r.safetyScore}%</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-medium">
                        {r.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Signatures */}
          <div className="border-t border-slate-800 pt-5 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-serif italic font-bold text-slate-900 text-sm">
                Dr. B. K. Sengupta
              </div>
              <span className="text-slate-600 block">Deputy Director of Mines Safety</span>
              <span className="text-slate-500 block">Dhanbad Region, Jharkhand</span>
            </div>

            <div className="text-center p-2.5 border border-emerald-700 rounded-lg bg-emerald-50 text-emerald-900">
              <div className="font-bold text-[11px] uppercase tracking-wider">OFFICIAL DGMS COMPLIANCE SEAL</div>
              <div className="text-[9px] font-mono mt-0.5">CODE: DGMS-JH-2026-REG-7791</div>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-slate-900 text-sm">
                Sunil Hansda
              </div>
              <span className="text-slate-600 block">Chief Safety Officer</span>
              <span className="text-slate-500 block">BCCL Dhanbad Division</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
