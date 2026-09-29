import React, { useRef } from 'react';
import { 
  Award, 
  Printer, 
  X, 
  Search, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { AssessmentResult } from '../types';
import { generateQRCodeSVG } from '../utils/certificate';

interface CertificateViewProps {
  certificate: AssessmentResult;
  onClose: () => void;
  onVerifyInPortal?: (certId: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ 
  certificate, 
  onClose,
  onVerifyInPortal 
}) => {
  const printRef = useRef<HTMLDivElement | null>(null);

  const qrSvg = generateQRCodeSVG(`ARAKSHA-CERT:${certificate.certificateId}:${certificate.signatureHash}`, 140);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#111726] border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
        
        {/* Top toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Digital Competency Certificate</h3>
              <p className="text-[11px] text-slate-400">Statutory Record • Mines Act 1952 &amp; OSH Code 2020</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onVerifyInPortal && (
              <button
                onClick={() => {
                  onClose();
                  onVerifyInPortal(certificate.certificateId);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1.5 cursor-pointer transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>Verify in Registry</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div 
          ref={printRef}
          className="bg-[#fcfaf5] text-slate-900 p-6 sm:p-10 rounded-xl border-4 border-amber-800/40 shadow-xl relative overflow-hidden print:p-0 print:border-none print:shadow-none"
        >
          {/* Subtle Guilloche Border Pattern */}
          <div className="absolute inset-2 border border-amber-800/20 rounded-lg pointer-events-none" />

          {/* Certificate Header */}
          <div className="text-center space-y-1.5 border-b border-amber-800/30 pb-4">
            <div className="flex items-center justify-center space-x-2.5 mb-1">
              <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold text-sm">
                🛡️
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-serif">
                ARAKSHA • सुरक्षा
              </h1>
            </div>
            <p className="text-[11px] font-bold tracking-widest uppercase text-amber-900">
              Industrial Safety &amp; Vocational Certification Authority
            </p>
            <div className="inline-block px-3 py-0.5 rounded bg-amber-100/80 text-amber-950 text-[10px] font-bold border border-amber-300">
              STATUTORY COMPETENCY CREDENTIAL • MINES ACT 1952 / OSH CODE 2020
            </div>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-3.5 text-center">
            <p className="text-xs uppercase font-medium text-slate-600 tracking-wider">
              This officially certifies that
            </p>

            <div className="space-y-0.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 font-serif">
                {certificate.traineeName}
              </h2>
              <p className="text-xs font-mono font-medium text-slate-600">
                Personnel ID: {certificate.workerNumber}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              has completed practical field emergency simulation assessment under verified operational protocols for:
            </p>

            <div className="bg-amber-100/50 border border-amber-300/70 p-3 rounded-lg max-w-md mx-auto">
              <span className="text-sm font-bold text-slate-900 block">
                {certificate.scenarioName}
              </span>
              <span className="text-xs text-amber-900 block mt-0.5">
                Deployment Unit: {certificate.unit}
              </span>
            </div>

            {/* Performance Badges */}
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                <span className="block text-[10px] text-slate-500">Retention Score</span>
                <span className="text-base font-bold text-emerald-800 font-mono">
                  {certificate.comprehensionScore}%
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                <span className="block text-[10px] text-slate-500">Response Time</span>
                <span className="text-base font-bold text-slate-800 font-mono">
                  {certificate.reactionTimeSeconds}s
                </span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                <span className="block text-[10px] text-slate-500">Risk Assessment</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded mt-0.5 inline-block">
                  {certificate.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="border-t border-amber-800/30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* QR Code */}
            <div className="flex items-center space-x-3 text-left">
              <div 
                className="p-1 bg-white border border-slate-300 rounded shadow-sm shrink-0"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <div className="text-[10px] font-mono text-slate-700 space-y-0.5">
                <div className="font-bold text-slate-950">CERTIFICATE NO:</div>
                <div className="text-amber-900 font-bold">{certificate.certificateId}</div>
                <div>Date: {certificate.date}</div>
                <div className="text-[9px] text-slate-500 truncate max-w-[150px]">
                  Sign: {certificate.signatureHash}
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="flex items-center space-x-6 text-center text-[10px]">
              <div>
                <div className="font-serif italic font-bold text-slate-900 text-sm border-b border-slate-400 pb-0.5 mb-1">
                  Dr. B. K. Sengupta
                </div>
                <span className="text-slate-600 block">Chief Safety Inspector</span>
                <span className="text-slate-500 block">Jharkhand Industrial Zone</span>
              </div>

              <div>
                <div className="font-serif italic font-bold text-slate-900 text-sm border-b border-slate-400 pb-0.5 mb-1">
                  ARAKSHA Authority
                </div>
                <span className="text-emerald-800 font-semibold block">✓ Verified Record</span>
                <span className="text-slate-500 block">OSH Code 2020 Standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
          <span>Official credential recorded in safety registry.</span>
          {onVerifyInPortal && (
            <button
              onClick={() => {
                onClose();
                onVerifyInPortal(certificate.certificateId);
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <span>Validate ID {certificate.certificateId} in Registry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
