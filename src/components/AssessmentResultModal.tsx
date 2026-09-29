import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  QrCode, 
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { AssessmentResult, Language } from '../types';
import { translations } from '../utils/translations';

interface AssessmentResultModalProps {
  result: AssessmentResult;
  language: Language;
  onClose: () => void;
  onViewCertificate: () => void;
  onRetry: () => void;
}

export const AssessmentResultModal: React.FC<AssessmentResultModalProps> = ({
  result,
  language,
  onClose,
  onViewCertificate,
  onRetry
}) => {
  const t = translations[language];

  useEffect(() => {
    if (result.passed) {
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [result.passed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#111726] border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5">
        
        {/* Status Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-xl bg-slate-900 border border-slate-800">
            {result.passed ? (
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            ) : (
              <XCircle className="w-10 h-10 text-red-400" />
            )}
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            {result.passed ? t.passText : t.failText}
          </h2>

          <p className="text-xs text-slate-300">
            {result.scenarioName} • {result.traineeName} ({result.workerNumber})
          </p>

          {result.isNewRecruit && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-950/50 border border-amber-600/40 text-amber-300 text-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.newRecruitAlert}</span>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#090d16] border border-slate-800 p-3.5 rounded-xl text-center">
            <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Response Time</span>
            </div>
            <div className="text-xl font-mono font-bold text-white">
              {result.reactionTimeSeconds}s
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Standard: &lt;{result.expectedReactionTime}s
            </div>
          </div>

          <div className="bg-[#090d16] border border-slate-800 p-3.5 rounded-xl text-center">
            <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safety Retention</span>
            </div>
            <div className="text-xl font-mono font-bold text-emerald-400">
              {result.comprehensionScore}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              vs 20% manual baseline
            </div>
          </div>

          <div className="bg-[#090d16] border border-slate-800 p-3.5 rounded-xl text-center">
            <span className="block text-slate-400 text-xs mb-1">Procedure Sequence</span>
            <span className="text-xl font-mono font-bold text-white">
              {result.sequenceAccuracy}%
            </span>
            <span className="block text-[10px] text-emerald-400 mt-0.5">SOP Verified</span>
          </div>

          <div className="bg-[#090d16] border border-slate-800 p-3.5 rounded-xl text-center">
            <span className="block text-slate-400 text-xs mb-1">{t.riskRating}</span>
            <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${
              result.riskLevel === 'LOW' 
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' 
                : result.riskLevel === 'MODERATE' 
                ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                : 'bg-red-950/60 text-red-400 border border-red-500/30'
            }`}>
              {result.riskLevel === 'LOW' ? t.lowRisk : result.riskLevel === 'MODERATE' ? t.moderateRisk : t.highRisk}
            </span>
          </div>
        </div>

        {/* Certificate Hash & ID */}
        <div className="bg-[#090d16] p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Certificate ID:</span>
            <span className="text-amber-400 font-bold">{result.certificateId}</span>
          </div>
          <div className="flex justify-between">
            <span>Audit Signature:</span>
            <span className="text-slate-300 truncate max-w-[200px]">{result.signatureHash}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          {result.passed ? (
            <button
              onClick={onViewCertificate}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center space-x-2 cursor-pointer transition-colors shadow-sm"
            >
              <QrCode className="w-4 h-4" />
              <span>{t.generateQRCertificate}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={onRetry}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-750 text-white flex items-center justify-center space-x-2 cursor-pointer border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Simulation</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2 px-4 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-850 transition-colors cursor-pointer"
          >
            Close &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
