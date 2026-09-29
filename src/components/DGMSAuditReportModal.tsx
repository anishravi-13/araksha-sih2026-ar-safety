import React, { useRef } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  X, 
  CheckCircle2, 
  ShieldAlert, 
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
        
        {/* Top actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Statutory DGMS Form V Compliance Audit</h3>
              <p className="text-[11px] text-slate-400">Official Periodic Safety &amp; Vocational Training Record</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-lg flex items-center space-x-1.5 cursor-pointer shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Form */}
        <div 
          ref={printRef}
          className="bg-white text-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 shadow-xl space-y-6 text-xs print:p-0 print:border-none print:shadow-none font-sans"
        >
          {/* Header */}
          <div className="text-center border-b-2 border-slate-800 pb-4 space-y-1">
            <div className="text-base sm:text-lg font-black tracking-tight uppercase">
              Government of India • Ministry of Labour &amp; Employment
            </div>
            <div className="text-sm font-bold text-slate-700">
              DIRECTORATE GENERAL OF MINES SAFETY (DGMS)
            </div>
            <div className="text-[11px] text-slate-600 font-serif">
              Eastern &amp; South-Eastern Zone, Dhanbad, Jharkhand
            </div>
            <div className="inline-block mt-1 px-3 py-0.5 rounded bg-slate-100 border border-slate-300 font-bold text-slate-800">
              FORM V: AR SIMULATOR STATUTORY WORKER COMPETENCY AUDIT RETURN
            </div>
          </div>

          {/* Statutory References */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-[11px]">
            <div>
              <span className="font-bold text-slate-700 block">Statutory Basis:</span>
              <span className="text-slate-800">{mockDGMSStatutoryRecord.actCitation}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block">Standard Directive:</span>
              <span className="text-slate-800">{mockDGMSStatutoryRecord.standardCode}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block">Audit Jurisdiction:</span>
              <span className="text-slate-800">{mockDGMSStatutoryRecord.auditPeriod}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700 block">Compliance Audit Status:</span>
              <span className="text-emerald-700 font-black">✓ {mockDGMSStatutoryRecord.inspectionStatus} (100% Verified)</span>
            </div>
          </div>

          {/* Key Compliance Metrics */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 border-b pb-1">
              Part A: Vocational AR Simulation Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">Certified Workers</span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">1,248</span>
              </div>
              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">&lt;30-Day Recruits Tracked</span>
                <span className="text-lg font-extrabold text-amber-700 font-mono">142</span>
              </div>
              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">Emergency Simulations Run</span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">3,890</span>
              </div>
              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="block text-[10px] text-slate-500">Target Retention Achieved</span>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">81.6%</span>
              </div>
            </div>
          </div>

          {/* New Recruits Watchlist Table */}
          <div>
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 border-b pb-1 flex items-center justify-between">
              <span>Part B: High-Risk New Recruit Orientation Schedule (&lt;30 Days)</span>
              <span className="text-[10px] text-red-600 font-bold">Mandated under DGMS Jharkhand Safety Rule 24</span>
            </h4>
            <table className="w-full text-left border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b text-[11px]">
                <tr>
                  <th className="p-2">Worker Name</th>
                  <th className="p-2">Unit / Mine</th>
                  <th className="p-2">Days in Service</th>
                  <th className="p-2">AR Gas &amp; LOTO Score</th>
                  <th className="p-2">Risk Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px]">
                {highRiskRecruits.map(r => (
                  <tr key={r.id}>
                    <td className="p-2 font-bold">{r.name}</td>
                    <td className="p-2">{r.unit}</td>
                    <td className="p-2 font-mono font-bold text-amber-700">{r.daysInService} days</td>
                    <td className="p-2 font-mono">{r.safetyScore}%</td>
                    <td className="p-2">
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                        {r.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Audit Verification Stamp & Signatures */}
          <div className="border-t-2 border-slate-800 pt-6 flex items-center justify-between text-[11px]">
            <div>
              <div className="font-serif italic font-bold text-slate-900 text-sm">
                Dr. B. K. Sengupta
              </div>
              <span className="text-slate-600 block">Deputy Director of Mines Safety</span>
              <span className="text-slate-500 block">Dhanbad Region, Jharkhand</span>
            </div>

            <div className="text-center p-3 border-2 border-emerald-600 rounded-xl bg-emerald-50 text-emerald-800">
              <div className="font-bold text-xs uppercase tracking-wider">DGMS DIGITAL COMPLIANCE SEAL</div>
              <div className="text-[10px] font-mono mt-0.5">CODE: DGMS-JH-2026-REG-7791</div>
            </div>

            <div className="text-right">
              <div className="font-serif italic font-bold text-slate-900 text-sm">
                Sunil Hansda
              </div>
              <span className="text-slate-600 block">Chief Safety Officer &amp; Mine Manager</span>
              <span className="text-slate-500 block">BCCL Dhanbad Division</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
