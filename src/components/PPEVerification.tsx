import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  AlertCircle, 
  Volume2, 
  Scan, 
  ShieldCheck, 
  Radio,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Language, PPEScanResult, TraineeProfile } from '../types';
import { translations } from '../utils/translations';
import { soundEffects, speakGuidance } from '../utils/speech';

interface PPEVerificationProps {
  language: Language;
  trainee: TraineeProfile;
  onTraineeChange: (t: TraineeProfile) => void;
  availableTrainees: TraineeProfile[];
  onComplete: (scanResult: PPEScanResult) => void;
  soundEnabled: boolean;
}

export const PPEVerification: React.FC<PPEVerificationProps> = ({
  language,
  trainee,
  onTraineeChange,
  availableTrainees,
  onComplete,
  soundEnabled
}) => {
  const t = translations[language];
  const [useWebcam, setUseWebcam] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const [detections, setDetections] = useState({
    helmet: false,
    vest: false,
    mask: false,
    gloves: false,
  });

  const [geoData] = useState({
    lat: 23.7957,
    lng: 86.4304,
    locationName: "BCCL Dhanbad - Pit No. 3 Underground Incline (Jharkhand)",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' | Today'
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle webcam
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (useWebcam) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'user' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch(() => {
          setUseWebcam(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [useWebcam]);

  const handleStartScan = () => {
    soundEffects.playClick();
    setScanning(true);
    setScanProgress(15);
    setDetections({ helmet: false, vest: false, mask: false, gloves: false });

    setTimeout(() => {
      setDetections(prev => ({ ...prev, helmet: true }));
      setScanProgress(40);
      soundEffects.playClick();
    }, 600);

    setTimeout(() => {
      setDetections(prev => ({ ...prev, vest: true }));
      setScanProgress(65);
      soundEffects.playClick();
    }, 1100);

    setTimeout(() => {
      setDetections(prev => ({ ...prev, mask: true }));
      setScanProgress(85);
      soundEffects.playClick();
    }, 1600);

    setTimeout(() => {
      setDetections(prev => ({ ...prev, gloves: true }));
      setScanProgress(100);
      setScanning(false);
      soundEffects.playSuccess();

      if (soundEnabled) {
        speakGuidance(t.ppeVerified, language);
      }
    }, 2100);
  };

  const handleInstantQuickPass = () => {
    soundEffects.playSuccess();
    setDetections({ helmet: true, vest: true, mask: true, gloves: true });
    const result: PPEScanResult = {
      helmet: true,
      vest: true,
      mask: true,
      gloves: true,
      confidence: { helmet: 99, vest: 98, mask: 97, gloves: 95 },
      geoLat: geoData.lat,
      geoLng: geoData.lng,
      timestamp: geoData.timestamp,
      passed: true
    };
    onComplete(result);
  };

  const allPassed = detections.helmet && detections.vest && detections.mask && detections.gloves;

  const handleProceed = () => {
    soundEffects.playSuccess();
    const result: PPEScanResult = {
      helmet: detections.helmet,
      vest: detections.vest,
      mask: detections.mask,
      gloves: detections.gloves,
      confidence: { helmet: 96, vest: 94, mask: 92, gloves: 89 },
      geoLat: geoData.lat,
      geoLng: geoData.lng,
      timestamp: geoData.timestamp,
      passed: allPassed
    };
    onComplete(result);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Friendly Top Welcome & Quick Start Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-emerald-500/15 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                Step 1 of 3: Pre-Entry Safety Gate
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {t.ppeCheckTitle}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              {t.ppeCheckSubtitle}
            </p>
          </div>

          {/* Instant 1-Click Quick Pass Button */}
          <button
            onClick={handleInstantQuickPass}
            className="w-full md:w-auto px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>{t.quickPassButton}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Viewfinder */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-200">
                {useWebcam ? 'Live Camera Feed' : 'Virtual Trainee Safety Scanner'}
              </span>
            </div>

            <button
              onClick={() => setUseWebcam(!useWebcam)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center space-x-1.5 cursor-pointer transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{useWebcam ? 'Virtual Model' : 'Use My WebCam'}</span>
            </button>
          </div>

          {/* Viewfinder Window */}
          <div className="relative aspect-4/3 w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {useWebcam ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 flex flex-col items-center justify-center select-none">
                {/* SVG Silhouette representation of an industrial miner */}
                <svg viewBox="0 0 200 240" className="w-48 h-60 opacity-90 drop-shadow-2xl">
                  {/* Helmet */}
                  <path 
                    d="M 60,65 C 60,35 140,35 140,65 Z" 
                    fill={detections.helmet ? "#F59E0B" : "#4B5563"} 
                    stroke="#D97706" 
                    strokeWidth="3" 
                  />
                  {/* Cap Lamp */}
                  <ellipse cx="100" cy="50" rx="10" ry="7" fill="#FDE047" />
                  <path d="M 85,50 L 50,0 L 150,0 L 115,50 Z" fill="rgba(253, 224, 71, 0.18)" />
                  {/* Head */}
                  <ellipse cx="100" cy="80" rx="25" ry="25" fill="#D1D5DB" />
                  {/* Goggles / Mask */}
                  <rect 
                    x="78" 
                    y="72" 
                    width="44" 
                    height="14" 
                    rx="6" 
                    fill={detections.mask ? "#065F46" : "#374151"} 
                    stroke={detections.mask ? "#10B981" : "#6B7280"}
                    strokeWidth="2"
                  />
                  <rect 
                    x="85" 
                    y="90" 
                    width="30" 
                    height="18" 
                    rx="4" 
                    fill={detections.mask ? "#3B82F6" : "#4B5563"} 
                  />
                  {/* Hi Vis Vest */}
                  <path 
                    d="M 60,115 L 140,115 L 155,200 L 45,200 Z" 
                    fill={detections.vest ? "#EAB308" : "#374151"} 
                    stroke="#CA8A04"
                    strokeWidth="2"
                  />
                  <path d="M 78,115 L 75,200 M 122,115 L 125,200" stroke="#FFFFFF" strokeWidth="6" strokeDasharray="4 2" />
                  <line x1="50" y1="165" x2="150" y2="165" stroke="#FFFFFF" strokeWidth="6" />
                  {/* Work Gloves */}
                  <circle cx="40" cy="185" r="14" fill={detections.gloves ? "#2563EB" : "#4B5563"} />
                  <circle cx="160" cy="185" r="14" fill={detections.gloves ? "#2563EB" : "#4B5563"} />
                </svg>

                <div className="absolute bottom-3 text-center text-xs text-slate-300 font-medium">
                  {trainee.name} • {trainee.role}
                </div>
              </div>
            )}

            {/* Scanning Line Animation */}
            {scanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                  className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981]"
                  style={{
                    position: 'absolute',
                    top: `${scanProgress}%`,
                    transition: 'top 0.25s ease-out'
                  }}
                />
              </div>
            )}

            {/* Bounding Boxes Overlays */}
            <div className="absolute inset-0 pointer-events-none p-4">
              <div 
                className={`absolute top-6 left-1/2 -translate-x-1/2 w-44 h-24 border-2 rounded-xl transition-all ${
                  detections.helmet 
                    ? 'border-emerald-500 bg-emerald-500/15' 
                    : scanning ? 'border-amber-400/60 border-dashed animate-pulse' : 'border-slate-700/50'
                }`}
              >
                {detections.helmet && (
                  <span className="absolute -top-3 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                    ✓ HELMET 96%
                  </span>
                )}
              </div>

              <div 
                className={`absolute top-24 left-1/2 -translate-x-1/2 w-32 h-16 border-2 rounded-xl transition-all ${
                  detections.mask 
                    ? 'border-emerald-500 bg-emerald-500/15' 
                    : scanning ? 'border-amber-400/60 border-dashed animate-pulse' : 'border-slate-700/50'
                }`}
              >
                {detections.mask && (
                  <span className="absolute -top-3 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                    ✓ MASK 92%
                  </span>
                )}
              </div>

              <div 
                className={`absolute top-36 left-1/2 -translate-x-1/2 w-52 h-36 border-2 rounded-xl transition-all ${
                  detections.vest 
                    ? 'border-emerald-500 bg-emerald-500/15' 
                    : scanning ? 'border-amber-400/60 border-dashed animate-pulse' : 'border-slate-700/50'
                }`}
              >
                {detections.vest && (
                  <span className="absolute -top-3 left-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow">
                    ✓ HI-VIS VEST 94%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              onClick={handleStartScan}
              disabled={scanning}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg cursor-pointer ${
                scanning 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-orange-500/20'
              }`}
            >
              <Scan className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
              <span>{scanning ? `AI Scanning (${scanProgress}%)` : `Run AI PPE Scan`}</span>
            </button>

            {soundEnabled && (
              <button
                onClick={() => speakGuidance(t.ppeScanPrompt, language)}
                title="Hear audio guidance"
                className="p-3.5 bg-slate-800 hover:bg-slate-700 rounded-2xl text-amber-400 border border-slate-700 cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Verification Status & Geo-Tagged Attendance */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Active Trainee Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <span className="text-slate-400 block text-xs font-semibold mb-2">Trainee Worker Profile:</span>
            <select
              aria-label="Trainee Worker Profile"
              value={trainee.id}
              onChange={(e) => {
                const found = availableTrainees.find(tr => tr.id === e.target.value);
                if (found) onTraineeChange(found);
              }}
              className="w-full bg-slate-950 text-white font-bold rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer text-xs sm:text-sm"
            >
              {availableTrainees.map(tr => (
                <option key={tr.id} value={tr.id}>
                  {tr.avatar} {tr.name} ({tr.workerNumber})
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>{trainee.unit}</span>
              <span className="text-amber-400 font-semibold">{trainee.daysInService} Days Service</span>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Safety Gear Status Checklist</span>
            </h3>

            <div className="space-y-2">
              {[
                { key: 'helmet', label: t.ppeHelmet, detected: detections.helmet, conf: '96%' },
                { key: 'vest', label: t.ppeVest, detected: detections.vest, conf: '94%' },
                { key: 'mask', label: t.ppeMask, detected: detections.mask, conf: '92%' },
                { key: 'gloves', label: t.ppeGloves, detected: detections.gloves, conf: '89%' },
              ].map((item) => (
                <div 
                  key={item.key}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    item.detected 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                      : 'bg-slate-850 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      item.detected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {item.detected ? '✓' : '•'}
                    </div>
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                  {item.detected && (
                    <span className="text-[10px] font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
                      {item.conf}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Geo-Tagged Attendance Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 text-xs space-y-2 shadow-xl">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Geo-Tagged Attendance Log</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 text-slate-300 text-[11px]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{geoData.locationName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono text-slate-400">{geoData.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={!allPassed}
            className={`w-full py-4 px-4 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 transition-all shadow-xl ${
              allPassed 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/30 cursor-pointer animate-pulse' 
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{allPassed ? t.startARSimulation : "Scan PPE Gear or Click Quick-Pass Above"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
