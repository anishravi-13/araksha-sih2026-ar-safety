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
  ArrowRight,
  Sparkles
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
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [result.passed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Status Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-slate-800 border border-slate-700 shadow-inner">
            {result.passed ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
            ) : (
              <XCircle className="w-12 h-12 text-red-400" />
            )}
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight">
            {result.passed ? t.passText : t.failText}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300">
            {result.scenarioName} • {result.traineeName} ({result.workerNumber})
          </p>

          {result.isNewRecruit && (
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.newRecruitAlert}</span>
            </div>
          )}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Reaction Time */}
          <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Response Speed</span>
            </div>
            <div className="text-xl font-mono font-black text-white">
              {result.reactionTimeSeconds}s
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              Target: &lt;{result.expectedReactionTime}s (Optimal)
            </div>
          </div>

          {/* Retention & Comprehension */}
          <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-2xl text-center">
            <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safety Retention</span>
            </div>
            <div className="text-xl font-mono font-black text-emerald-400">
              {result.comprehensionScore}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              vs &lt;20% manual baseline
            </div>
          </div>

          {/* Sequence Accuracy */}
          <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-2xl text-center">
            <span className="block text-slate-400 text-xs mb-1">Procedure Accuracy</span>
            <span className="text-xl font-mono font-black text-white">
              {result.sequenceAccuracy}%
            </span>
            <span className="block text-[10px] text-emerald-400 mt-0.5">100% SOP Followed</span>
          </div>

          {/* Behavioral Risk Category */}
          <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-2xl text-center">
            <span className="block text-slate-400 text-xs mb-1">{t.riskRating}</span>
            <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg ${
              result.riskLevel === 'LOW' 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : result.riskLevel === 'MODERATE' 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-red-500/20 text-red-300 border border-red-500/40'
            }`}>
              {result.riskLevel === 'LOW' ? t.lowRisk : result.riskLevel === 'MODERATE' ? t.moderateRisk : t.highRisk}
            </span>
          </div>
        </div>

        {/* Certificate Hash & ID */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Cert Hash:</span>
            <span className="text-amber-400 font-bold truncate max-w-[200px]">{result.signatureHash}</span>
          </div>
          <div className="flex justify-between">
            <span>Certificate ID:</span>
            <span className="text-emerald-400 font-bold">{result.certificateId}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          {result.passed ? (
            <button
              onClick={onViewCertificate}
              className="w-full py-4 px-4 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-xl shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer transition-all transform hover:scale-[1.02]"
            >
              <QrCode className="w-5 h-5" />
              <span>{t.generateQRCertificate}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={onRetry}
              className="w-full py-4 px-4 rounded-2xl font-black text-sm bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-slate-950 shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Retry AR Scenario</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close &amp; Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
