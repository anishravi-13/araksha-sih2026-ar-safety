import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Volume2, 
  Scan, 
  ShieldCheck, 
  Radio,
  ArrowRight,
  UserCheck
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
    locationName: "BCCL Dhanbad - Pit No. 3 Incline Surface Station (Jharkhand)",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' | Shift A'
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    }, 500);

    setTimeout(() => {
      setDetections(prev => ({ ...prev, vest: true }));
      setScanProgress(65);
      soundEffects.playClick();
    }, 1000);

    setTimeout(() => {
      setDetections(prev => ({ ...prev, mask: true }));
      setScanProgress(85);
      soundEffects.playClick();
    }, 1500);

    setTimeout(() => {
      setDetections(prev => ({ ...prev, gloves: true }));
      setScanProgress(100);
      setScanning(false);
      soundEffects.playSuccess();

      if (soundEnabled) {
        speakGuidance(t.ppeVerified, language);
      }
    }, 2000);
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
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Clearance Banner */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Shift Safety Clearance Point</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t.ppeCheckTitle}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
              {t.ppeCheckSubtitle}
            </p>
          </div>

          {/* Quick Clearance Button */}
          <button
            onClick={handleInstantQuickPass}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <span>{t.quickPassButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Kiosk Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Sensor / Camera Feed */}
        <div className="lg:col-span-7 bg-[#111726] border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-semibold text-slate-300">
                {useWebcam ? 'Optical Camera Sensor' : 'Equipment Calibration View'}
              </span>
            </div>

            <button
              onClick={() => setUseWebcam(!useWebcam)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 flex items-center space-x-1.5 cursor-pointer transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{useWebcam ? 'Virtual Model' : 'Enable WebCam'}</span>
            </button>
          </div>

          {/* Viewfinder Window */}
          <div className="relative aspect-4/3 w-full bg-[#080c14] rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {useWebcam ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center select-none bg-[#090e18]">
                {/* Clean Worker Silhouette */}
                <svg viewBox="0 0 200 240" className="w-48 h-60 opacity-90 drop-shadow-md">
                  {/* Helmet */}
                  <path 
                    d="M 60,65 C 60,35 140,35 140,65 Z" 
                    fill={detections.helmet ? "#d97706" : "#334155"} 
                    stroke="#b45309" 
                    strokeWidth="2.5" 
                  />
                  {/* Cap Lamp */}
                  <ellipse cx="100" cy="50" rx="9" ry="6" fill="#fef08a" />
                  {/* Head */}
                  <ellipse cx="100" cy="80" rx="24" ry="24" fill="#cbd5e1" />
                  {/* Goggles / Mask */}
                  <rect 
                    x="78" 
                    y="73" 
                    width="44" 
                    height="13" 
                    rx="4" 
                    fill={detections.mask ? "#047857" : "#475569"} 
                    stroke={detections.mask ? "#10b981" : "#64748b"}
                    strokeWidth="1.5"
                  />
                  <rect 
                    x="86" 
                    y="90" 
                    width="28" 
                    height="16" 
                    rx="3" 
                    fill={detections.mask ? "#2563eb" : "#475569"} 
                  />
                  {/* Hi Vis Vest */}
                  <path 
                    d="M 60,115 L 140,115 L 155,200 L 45,200 Z" 
                    fill={detections.vest ? "#ca8a04" : "#334155"} 
                    stroke="#a16207"
                    strokeWidth="2"
                  />
                  <line x1="50" y1="165" x2="150" y2="165" stroke="#f8fafc" strokeWidth="5" />
                  {/* Work Gloves */}
                  <circle cx="40" cy="185" r="13" fill={detections.gloves ? "#1d4ed8" : "#475569"} />
                  <circle cx="160" cy="185" r="13" fill={detections.gloves ? "#1d4ed8" : "#475569"} />
                </svg>

                <div className="absolute bottom-3 text-center text-xs text-slate-400 font-medium">
                  {trainee.name} • {trainee.role}
                </div>
              </div>
            )}

            {/* Subtle Scanning Line Animation */}
            {scanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                  className="w-full h-0.5 bg-amber-400 shadow-[0_0_8px_#f59e0b]"
                  style={{
                    position: 'absolute',
                    top: `${scanProgress}%`,
                    transition: 'top 0.2s ease-out'
                  }}
                />
              </div>
            )}

            {/* Bounding Boxes */}
            <div className="absolute inset-0 pointer-events-none p-4">
              <div 
                className={`absolute top-6 left-1/2 -translate-x-1/2 w-44 h-24 border rounded-lg transition-colors ${
                  detections.helmet 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : scanning ? 'border-amber-500/70 border-dashed' : 'border-slate-800'
                }`}
              >
                {detections.helmet && (
                  <span className="absolute -top-2.5 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                    HELMET CONFIRMED
                  </span>
                )}
              </div>

              <div 
                className={`absolute top-24 left-1/2 -translate-x-1/2 w-32 h-16 border rounded-lg transition-colors ${
                  detections.mask 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : scanning ? 'border-amber-500/70 border-dashed' : 'border-slate-800'
                }`}
              >
                {detections.mask && (
                  <span className="absolute -top-2.5 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                    RESPIRATOR CONFIRMED
                  </span>
                )}
              </div>

              <div 
                className={`absolute top-36 left-1/2 -translate-x-1/2 w-52 h-36 border rounded-lg transition-colors ${
                  detections.vest 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : scanning ? 'border-amber-500/70 border-dashed' : 'border-slate-800'
                }`}
              >
                {detections.vest && (
                  <span className="absolute -top-2.5 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                    HI-VIS VEST CONFIRMED
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Trigger Scan Button */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              onClick={handleStartScan}
              disabled={scanning}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer ${
                scanning 
                  ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700'
              }`}
            >
              <Scan className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
              <span>{scanning ? `Verifying Equipment (${scanProgress}%)` : `Run Optical Scan`}</span>
            </button>

            {soundEnabled && (
              <button
                onClick={() => speakGuidance(t.ppeScanPrompt, language)}
                title="Hear audio instructions"
                className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl text-slate-300 border border-slate-700 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Worker Badge & Clearance Checklist */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          
          {/* Worker Badge */}
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold mb-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>Assigned Personnel Badge:</span>
            </div>
            <select
              aria-label="Worker Badge"
              value={trainee.id}
              onChange={(e) => {
                const found = availableTrainees.find(tr => tr.id === e.target.value);
                if (found) onTraineeChange(found);
              }}
              className="w-full bg-[#090e18] text-white font-semibold rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer text-xs sm:text-sm"
            >
              {availableTrainees.map(tr => (
                <option key={tr.id} value={tr.id}>
                  {tr.name} ({tr.workerNumber})
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>{trainee.unit}</span>
              <span className="font-mono text-amber-400">{trainee.daysInService} Days Service</span>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-4 shadow-lg">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
              Equipment Clearance Status
            </h3>

            <div className="space-y-2">
              {[
                { key: 'helmet', label: t.ppeHelmet, detected: detections.helmet },
                { key: 'vest', label: t.ppeVest, detected: detections.vest },
                { key: 'mask', label: t.ppeMask, detected: detections.mask },
                { key: 'gloves', label: t.ppeGloves, detected: detections.gloves },
              ].map((item) => (
                <div 
                  key={item.key}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                    item.detected 
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      item.detected ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'
                    }`}>
                      {item.detected ? '✓' : '•'}
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  {item.detected && (
                    <span className="text-[10px] font-mono text-emerald-400">PASSED</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Shift Attendance Record */}
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-3.5 text-xs space-y-1.5 shadow-lg">
            <div className="flex items-center space-x-1.5 text-slate-400 font-semibold text-[11px]">
              <Radio className="w-3 h-3 text-cyan-400" />
              <span>Shift Location Verification</span>
            </div>
            <div className="text-[11px] text-slate-300">
              <div className="truncate">{geoData.locationName}</div>
              <div className="text-slate-400 font-mono mt-0.5">{geoData.timestamp}</div>
            </div>
          </div>

          {/* Final Enter Simulator Button */}
          <button
            onClick={handleProceed}
            disabled={!allPassed}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-colors ${
              allPassed 
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-sm' 
                : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{allPassed ? t.startARSimulation : "Complete Scan or Click Direct Clearance Above"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
