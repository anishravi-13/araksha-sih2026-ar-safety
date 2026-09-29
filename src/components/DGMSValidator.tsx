import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Award, 
  AlertTriangle, 
  QrCode, 
  Hash, 
  Calendar, 
  Building2 
} from 'lucide-react';
import { AssessmentResult } from '../types';
import { lookupCertificate } from '../utils/certificate';

interface DGMSValidatorProps {
  onSelectCertificate: (cert: AssessmentResult) => void;
}

export const DGMSValidator: React.FC<DGMSValidatorProps> = ({ onSelectCertificate }) => {
  const [certInput, setCertInput] = useState('DGMS-JH-2026-GAS-4910283');
  const [verifiedRecord, setVerifiedRecord] = useState<AssessmentResult | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const result = lookupCertificate(certInput);
    setVerifiedRecord(result);
  };

  const sampleIds = [
    'DGMS-JH-2026-GAS-4910283',
    'DGMS-JH-2026-LOT-3829104',
    'DGMS-JH-2026-FIR-1102981'
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Statutory Audit Portal • Directorate General of Mines Safety</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Tamper-Proof QR Certificate Verification Portal
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Enter any Certificate ID or QR Hash to verify legitimacy against the official DGMS distributed training registry.
        </p>
      </div>

      {/* Verification Search Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Enter Certificate ID or Scan QR String:
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Hash className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g. DGMS-JH-2026-GAS-XXXX"
                  className="w-full bg-slate-950 text-white font-mono text-xs sm:text-sm rounded-xl pl-9 pr-3 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 cursor-pointer transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Verify Record</span>
              </button>
            </div>
          </div>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-medium">Quick Test Sample IDs:</span>
            {sampleIds.map(id => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setCertInput(id);
                  setSearchAttempted(true);
                  setVerifiedRecord(lookupCertificate(id));
                }}
                className="font-mono text-[11px] bg-slate-800 hover:bg-slate-700 text-purple-300 px-2 py-1 rounded-lg border border-slate-700 cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Verification Result Card */}
      {searchAttempted && (
        <div className="animate-in fade-in duration-300">
          {verifiedRecord ? (
            <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      DGMS Statutory Verification Passed
                    </div>
                    <div className="text-lg font-black text-white font-mono">
                      {verifiedRecord.certificateId}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCertificate(verifiedRecord)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold rounded-lg flex items-center space-x-1 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Inspect Full Certificate</span>
                </button>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-semibold mb-2">Worker &amp; Deployment Info:</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trainee Name:</span>
                    <span className="text-white font-bold">{verifiedRecord.traineeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Worker Number:</span>
                    <span className="text-slate-300 font-mono">{verifiedRecord.workerNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Industry / Site:</span>
                    <span className="text-slate-300 text-right max-w-xs truncate">{verifiedRecord.unit}</span>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-semibold mb-2">AR Competency Metrics:</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Scenario Tested:</span>
                    <span className="text-white font-bold">{verifiedRecord.scenarioName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Comprehension Index:</span>
                    <span className="text-emerald-400 font-mono font-bold">{verifiedRecord.comprehensionScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reaction Time:</span>
                    <span className="text-amber-400 font-mono font-bold">{verifiedRecord.reactionTimeSeconds}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Behavioral Risk:</span>
                    <span className="text-emerald-400 font-bold">{verifiedRecord.riskLevel}</span>
                  </div>
                </div>
              </div>

              {/* Immutable Hash Signature */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Hash className="w-3.5 h-3.5 text-purple-400" />
                  <span>DGMS Cryptographic Hash:</span>
                  <span className="text-purple-300 font-bold">{verifiedRecord.signatureHash}</span>
                </div>
                <span className="text-emerald-400 font-semibold">Valid &amp; Non-Revoked</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-red-500/40 rounded-2xl p-6 text-center space-y-3 shadow-xl">
              <div className="inline-flex p-3 bg-red-500/20 text-red-400 rounded-xl">
                <XCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Certificate Record Not Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No verified DGMS assessment record matches this ID. Ensure the trainee has passed the AR simulation and their device has synced with the pithead terminal.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
