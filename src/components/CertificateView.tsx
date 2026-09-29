import React, { useRef } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Printer, 
  Download, 
  Share2, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Hash, 
  Building2,
  X
} from 'lucide-react';
import { AssessmentResult } from '../types';
import { generateQRCodeSVG } from '../utils/certificate';

interface CertificateViewProps {
  certificate: AssessmentResult;
  onClose: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ certificate, onClose }) => {
  const printRef = useRef<HTMLDivElement | null>(null);

  const qrSvg = generateQRCodeSVG(`ARAKSHA-CERT:${certificate.certificateId}:${certificate.signatureHash}`, 140);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4">
        
        {/* Top toolbar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">Digital Competency Certificate</h3>
              <p className="text-[11px] text-slate-400">Statutory Proof under DGMS &amp; OSH Code 2020</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Canvas */}
        <div 
          ref={printRef}
          className="bg-gradient-to-b from-amber-50 via-white to-amber-50 text-slate-900 p-6 sm:p-10 rounded-2xl border-4 border-amber-600/60 shadow-xl relative overflow-hidden print:p-0 print:border-none print:shadow-none"
        >
          {/* Subtle Guilloche Border Pattern simulation */}
          <div className="absolute inset-2 border-2 border-amber-500/30 rounded-xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="text-center space-y-2 border-b-2 border-amber-700/30 pb-4">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-white font-extrabold shadow">
                🛡️
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-serif">
                  ARAKSHA • सुरक्षा
                </h1>
                <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-amber-800">
                  Directorate General of Mines Safety &amp; Ministry of Labour &amp; Employment Standards
                </p>
              </div>
            </div>
            <div className="inline-block px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-300">
              NATIONAL VOCATIONAL AR SAFETY CERTIFICATION • OSH CODE 2020
            </div>
          </div>

          {/* Certificate Body */}
          <div className="py-6 space-y-4 text-center">
            <p className="text-xs uppercase font-semibold text-slate-500 tracking-wider">
              This is to officially certify that
            </p>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-serif underline decoration-amber-500 decoration-2 underline-offset-4">
                {certificate.traineeName}
              </h2>
              <p className="text-xs font-mono font-semibold text-slate-700">
                Worker Registration No: {certificate.workerNumber}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
              has successfully completed simulated practical Augmented Reality (AR) assessment under simulated high-risk conditions for:
            </p>

            <div className="bg-amber-100/60 border border-amber-300/80 p-3 rounded-xl max-w-md mx-auto">
              <span className="text-sm sm:text-base font-bold text-slate-900 block">
                {certificate.scenarioName}
              </span>
              <span className="text-xs text-amber-900 font-semibold block mt-0.5">
                Unit: {certificate.unit}
              </span>
            </div>

            {/* Performance Badges */}
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-2 text-center text-xs">
              <div className="bg-white p-2 rounded-lg border border-amber-200 shadow-sm">
                <span className="block text-[10px] text-slate-500">Retention Score</span>
                <span className="text-base font-extrabold text-emerald-700 font-mono">
                  {certificate.comprehensionScore}%
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-amber-200 shadow-sm">
                <span className="block text-[10px] text-slate-500">Response Speed</span>
                <span className="text-base font-extrabold text-slate-800 font-mono">
                  {certificate.reactionTimeSeconds}s
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-amber-200 shadow-sm">
                <span className="block text-[10px] text-slate-500">Behavioral Risk</span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                  {certificate.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Certificate Footer: QR Code & Statutory Signatures */}
          <div className="border-t-2 border-amber-700/30 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* QR Code */}
            <div className="flex items-center space-x-3 text-left">
              <div 
                className="p-1.5 bg-white border border-slate-300 rounded-lg shadow-sm shrink-0"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <div className="text-[10px] font-mono text-slate-600 space-y-0.5">
                <div className="font-bold text-slate-900">CERTIFICATE ID:</div>
                <div className="text-amber-800 font-black">{certificate.certificateId}</div>
                <div>ISSUED: {certificate.date}</div>
                <div className="text-[9px] text-slate-500 truncate max-w-[150px]">
                  HASH: {certificate.signatureHash}
                </div>
              </div>
            </div>

            {/* Statutory Signatures */}
            <div className="flex items-center space-x-6 text-center text-[10px]">
              <div>
                <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-400 pb-0.5 mb-1">
                  Dr. B. K. Sengupta
                </div>
                <span className="text-slate-500 block">DGMS Certified Safety Officer</span>
                <span className="text-slate-400 block">Jharkhand Region</span>
              </div>

              <div>
                <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-400 pb-0.5 mb-1">
                  ARAKSHA AI Engine
                </div>
                <span className="text-emerald-700 font-bold block">✓ Digitally Signed &amp; Audited</span>
                <span className="text-slate-400 block">Mines Act 1952 / OSH 2020</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-slate-400">
          This verifiable certificate is stored in the tamper-proof local audit trail and syncs across the mine pithead mesh network.
        </p>
      </div>
    </div>
  );
};
