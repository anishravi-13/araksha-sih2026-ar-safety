import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Award, 
  Hash, 
  ArrowLeft
} from 'lucide-react';
import { AssessmentResult } from '../types';
import { lookupCertificate } from '../utils/certificate';

interface DGMSValidatorProps {
  initialCertId?: string;
  onSelectCertificate: (cert: AssessmentResult) => void;
  onBackToSimulator?: () => void;
}

export const DGMSValidator: React.FC<DGMSValidatorProps> = ({ 
  initialCertId,
  onSelectCertificate,
  onBackToSimulator
}) => {
  const [certInput, setCertInput] = useState(initialCertId || 'DGMS-JH-2026-GAS-4910283');
  const [verifiedRecord, setVerifiedRecord] = useState<AssessmentResult | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    if (initialCertId) {
      setCertInput(initialCertId);
      setSearchAttempted(true);
      setVerifiedRecord(lookupCertificate(initialCertId));
    }
  }, [initialCertId]);

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
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Statutory Compliance Registry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Safety Certificate Verification Portal
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              Inspect authenticity and verification status of vocational field training records
            </p>
          </div>

          {onBackToSimulator && (
            <button
              onClick={onBackToSimulator}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Field Simulator</span>
            </button>
          )}
        </div>
      </div>

      {/* Verification Search Box */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 shadow-lg">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Enter Certificate Number or Scan QR String:
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Hash className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g. DGMS-JH-2026-GAS-XXXX"
                  className="w-full bg-[#090d16] text-white font-mono text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center space-x-2 cursor-pointer transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Verify Record</span>
              </button>
            </div>
          </div>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium">Test Samples:</span>
            {sampleIds.map(id => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setCertInput(id);
                  setSearchAttempted(true);
                  setVerifiedRecord(lookupCertificate(id));
                }}
                className="font-mono text-[11px] bg-slate-800 hover:bg-slate-750 text-slate-300 px-2 py-1 rounded-md border border-slate-700 cursor-pointer"
              >
                {id}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Verification Result Card */}
      {searchAttempted && (
        <div className="animate-in fade-in duration-200">
          {verifiedRecord ? (
            <div className="bg-[#111726] border border-emerald-500/40 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-xl">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      ✓ Authentic &amp; Statutorily Validated
                    </div>
                    <div className="text-lg font-bold text-white font-mono">
                      {verifiedRecord.certificateId}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCertificate(verifiedRecord)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1.5 cursor-pointer transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>Inspect Certificate</span>
                </button>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-2 bg-[#090d16] p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-semibold mb-2">Personnel Details:</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Personnel Name:</span>
                    <span className="text-white font-medium">{verifiedRecord.traineeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Personnel ID:</span>
                    <span className="text-slate-300 font-mono">{verifiedRecord.workerNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Deployment Unit:</span>
                    <span className="text-slate-300 text-right max-w-xs truncate">{verifiedRecord.unit}</span>
                  </div>
                </div>

                <div className="space-y-2 bg-[#090d16] p-4 rounded-xl border border-slate-800">
                  <div className="text-slate-400 font-semibold mb-2">Simulation Record:</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Competency Scenario:</span>
                    <span className="text-white font-medium">{verifiedRecord.scenarioName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Retention Rating:</span>
                    <span className="text-emerald-400 font-mono font-bold">{verifiedRecord.comprehensionScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Response Speed:</span>
                    <span className="text-amber-400 font-mono font-bold">{verifiedRecord.reactionTimeSeconds}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Risk Category:</span>
                    <span className="text-emerald-400 font-semibold">{verifiedRecord.riskLevel}</span>
                  </div>
                </div>
              </div>

              {/* Hash Signature */}
              <div className="p-3 bg-[#090d16] rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Hash className="w-3.5 h-3.5 text-slate-500" />
                  <span>Audit Signature:</span>
                  <span className="text-slate-300 truncate max-w-xs">{verifiedRecord.signatureHash}</span>
                </div>
                <span className="text-emerald-400 font-medium">Valid Under Mines Act 1952 / OSH 2020</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#111726] border border-red-500/40 rounded-2xl p-6 text-center space-y-2 shadow-lg">
              <div className="inline-flex p-2 bg-red-950/60 text-red-400 rounded-xl">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Record Not Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No verified safety training record matches this certificate number.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
