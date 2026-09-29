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
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 text-xs font-black uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Statutory Compliance Registry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Tamper-Proof QR Certificate Verification Portal
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Validate authenticity and statutory compliance of worker safety training certificates.
            </p>
          </div>

          {onBackToSimulator && (
            <button
              onClick={onBackToSimulator}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Simulator</span>
            </button>
          )}
        </div>
      </div>

      {/* Verification Search Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Enter Certificate ID or Scan QR String:
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Hash className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  placeholder="e.g. DGMS-JH-2026-GAS-XXXX"
                  className="w-full bg-slate-950 text-white font-mono text-xs sm:text-sm rounded-2xl pl-10 pr-3 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-purple-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all transform hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" />
                <span>Verify Certificate</span>
              </button>
            </div>
          </div>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-medium">Quick Test Sample IDs:</span>
            {sampleIds.map(id => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setCertInput(id);
                  setSearchAttempted(true);
                  setVerifiedRecord(lookupCertificate(id));
                }}
                className="font-mono text-[11px] bg-slate-800 hover:bg-slate-700 text-purple-300 px-2.5 py-1 rounded-xl border border-slate-700 cursor-pointer transition-colors"
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
            <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                      ✓ Authentic &amp; Statutorily Validated
                    </div>
                    <div className="text-lg font-black text-white font-mono">
                      {verifiedRecord.certificateId}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCertificate(verifiedRecord)}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-black rounded-xl flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>View Full Certificate</span>
                </button>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-slate-400 font-bold mb-2">Worker &amp; Site Details:</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trainee Name:</span>
                    <span className="text-white font-bold">{verifiedRecord.traineeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Worker Number:</span>
                    <span className="text-slate-300 font-mono font-bold">{verifiedRecord.workerNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Unit / Sector:</span>
                    <span className="text-slate-300 text-right max-w-xs truncate">{verifiedRecord.unit}</span>
                  </div>
                </div>

                <div className="space-y-2.5 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-slate-400 font-bold mb-2">Safety Competency Record:</div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Scenario Tested:</span>
                    <span className="text-white font-bold">{verifiedRecord.scenarioName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Comprehension Score:</span>
                    <span className="text-emerald-400 font-mono font-black">{verifiedRecord.comprehensionScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reaction Time:</span>
                    <span className="text-amber-400 font-mono font-bold">{verifiedRecord.reactionTimeSeconds}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Behavioral Risk:</span>
                    <span className="text-emerald-400 font-black">{verifiedRecord.riskLevel}</span>
                  </div>
                </div>
              </div>

              {/* Immutable Hash Signature */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Hash className="w-3.5 h-3.5 text-purple-400" />
                  <span>Signature Hash:</span>
                  <span className="text-purple-300 font-bold truncate max-w-xs">{verifiedRecord.signatureHash}</span>
                </div>
                <span className="text-emerald-400 font-bold">Complies with Mines Act 1952 / OSH Code 2020</span>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-red-500/40 rounded-3xl p-6 text-center space-y-3 shadow-xl">
              <div className="inline-flex p-3 bg-red-500/20 text-red-400 rounded-2xl">
                <XCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Certificate Record Not Found</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No verified safety assessment record matches this ID. Complete the 3D AR test to generate an authenticated certificate.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
