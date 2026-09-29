import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  Volume2, 
  CheckCircle, 
  Clock, 
  Gauge, 
  Flame, 
  Lock, 
  Wind, 
  Eye, 
  RotateCcw, 
  Activity, 
  Check, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { AssessmentResult, Language, ScenarioId, TraineeProfile } from '../../types';
import { translations } from '../../utils/translations';
import { soundEffects, speakGuidance, stopSpeaking } from '../../utils/speech';
import { ARScene3D } from './ARScene3D';
import { generateCertificateId, generateSignature, saveCertificate } from '../../utils/certificate';

interface ARContainerProps {
  language: Language;
  trainee: TraineeProfile;
  soundEnabled: boolean;
  onFinishAssessment: (result: AssessmentResult) => void;
  isBudgetPhoneMode: boolean;
}

export const ARContainer: React.FC<ARContainerProps> = ({
  language,
  trainee,
  soundEnabled,
  onFinishAssessment,
  isBudgetPhoneMode
}) => {
  const t = translations[language];
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>('gas_leak');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [cameraPassthrough, setCameraPassthrough] = useState(false);
  const [reactionTimerMs, setReactionTimerMs] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [hazardTriggered, setHazardTriggered] = useState(true);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [gasReadings, setGasReadings] = useState({ ch4: 2.8, co: 45, o2: 18.2 });

  const timerRef = useRef<number | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);

  // Scenarios data
  const scenarioStepsData: Record<ScenarioId, { title: string; steps: string[]; voiceKey: string }> = {
    gas_leak: {
      title: t.scenarioGasTitle,
      steps: [
        "1. Calibrate & Inspect Multi-Gas Detector (LEL > 2.0% Critical Alert)",
        "2. De-energize Local Electrical Switches to Eliminate Spark Risk",
        "3. Engage Auxiliary Ventilation Fan Ducting",
        "4. Deploy Self-Contained Self-Rescuer (SCSR) Chemical Breathing Pack",
        "5. Evacuate Following Green AR Ground Laser Waypoints to Intake Airway"
      ],
      voiceKey: t.voicePromptGas
    },
    loto: {
      title: t.scenarioLotoTitle,
      steps: [
        "1. Announce Shutdown Warning to Belt Operations Crew",
        "2. Disengage Main 415V Heavy Circuit Breaker Switch",
        "3. Apply Safety Padlock & Locking Hasp (Lockout)",
        "4. Affix DGMS Danger Tag with Trainee Name & Shift Timestamp (Tagout)",
        "5. Press Test Start Button to Verify Certified Zero-Energy State"
      ],
      voiceKey: t.voicePromptLoto
    },
    fire_evacuation: {
      title: t.scenarioFireTitle,
      steps: [
        "1. Pull Extinguisher Safety Pin (P)",
        "2. Aim Nozzle at the Base of the Electrical Fire (A)",
        "3. Squeeze Trigger Lever to Discharge CO2/Foam Agent (S)",
        "4. Sweep Nozzle Side-to-Side Across Entire Fire Perimeter (S)",
        "5. Evacuate to Designated Surface Assembly Point via AR Exit Route"
      ],
      voiceKey: t.voicePromptFire
    }
  };

  // Start scenario timer and hazard alarm
  useEffect(() => {
    setCurrentStepIndex(0);
    setReactionTimerMs(0);
    setTimerRunning(true);
    setHazardTriggered(true);
    setMistakeCount(0);

    if (soundEnabled) {
      soundEffects.playAlarm();
      const prompt = scenarioStepsData[selectedScenario].voiceKey;
      speakGuidance(prompt, language);
    }

    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      setReactionTimerMs(Date.now() - start);
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, [selectedScenario, language]);

  // Handle webcam background for AR passthrough
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (cameraPassthrough) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (cameraVideoRef.current) {
            cameraVideoRef.current.srcObject = s;
          }
        })
        .catch(() => {
          setCameraPassthrough(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [cameraPassthrough]);

  const activeSteps = scenarioStepsData[selectedScenario].steps;

  const handleStepAction = (index: number) => {
    if (index !== currentStepIndex) {
      // Wrong sequence order penalty
      soundEffects.playClick();
      setMistakeCount(prev => prev + 1);
      return;
    }

    soundEffects.playClick();
    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);

    if (nextIndex >= activeSteps.length) {
      // Finished scenario
      if (timerRef.current) clearInterval(timerRef.current);
      setTimerRunning(false);
      setHazardTriggered(false);
      soundEffects.playSuccess();

      const reactionSeconds = parseFloat((reactionTimerMs / 1000).toFixed(1));
      const accuracy = Math.max(70, 100 - mistakeCount * 10);
      const passed = accuracy >= 80 && reactionSeconds <= 18;
      
      // Calculate Behavioral Risk
      let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
      if (!passed || accuracy < 75 || reactionSeconds > 14) {
        riskLevel = 'HIGH';
      } else if (accuracy < 90 || reactionSeconds > 9) {
        riskLevel = 'MODERATE';
      }

      const certId = generateCertificateId(trainee.workerNumber, selectedScenario);
      const signatureHash = generateSignature(`${trainee.id}-${certId}-${Date.now()}`);

      const result: AssessmentResult = {
        id: `ASSESS-${Date.now()}`,
        certificateId: certId,
        traineeId: trainee.id,
        traineeName: trainee.name,
        workerNumber: trainee.workerNumber,
        unit: trainee.unit,
        scenarioId: selectedScenario,
        scenarioName: scenarioStepsData[selectedScenario].title,
        date: new Date().toISOString().split('T')[0],
        reactionTimeSeconds: reactionSeconds,
        expectedReactionTime: 8.0,
        sequenceAccuracy: accuracy,
        ppeCompliance: 100,
        comprehensionScore: Math.round((accuracy * 0.6) + (Math.max(0, 100 - reactionSeconds * 3) * 0.4)),
        riskLevel,
        passed,
        isNewRecruit: trainee.daysInService < 30,
        signatureHash,
        syncedToCloud: false
      };

      saveCertificate(result);
      onFinishAssessment(result);
    } else {
      // Step audio feedback
      if (soundEnabled && nextIndex === activeSteps.length - 1) {
        speakGuidance(t.emergencyEvacuate, language);
      }
    }
  };

  return (
    <div className={`space-y-4 ${isBudgetPhoneMode ? 'max-w-md mx-auto border-8 border-slate-750 rounded-[40px] p-2 bg-slate-950 shadow-2xl ring-4 ring-amber-500/20' : 'max-w-7xl mx-auto'}`}>
      
      {/* Phone Viewport Header Badge */}
      {isBudgetPhoneMode && (
        <div className="flex items-center justify-between px-3 py-1 bg-slate-900 rounded-t-2xl text-[10px] text-amber-400 font-mono">
          <span>₹10–12k Mid-Range Android (ARCore 60 FPS)</span>
          <span className="text-emerald-400">Low-Poly Mode</span>
        </div>
      )}

      {/* Scenario Selectors */}
      <div className="grid grid-cols-3 gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
        <button
          onClick={() => setSelectedScenario('gas_leak')}
          className={`flex items-center justify-center space-x-1.5 p-2 rounded-lg text-xs font-bold transition-all ${
            selectedScenario === 'gas_leak'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span className="truncate">1. Methane Gas Leak</span>
        </button>

        <button
          onClick={() => setSelectedScenario('loto')}
          className={`flex items-center justify-center space-x-1.5 p-2 rounded-lg text-xs font-bold transition-all ${
            selectedScenario === 'loto'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span className="truncate">2. Machinery LOTO</span>
        </button>

        <button
          onClick={() => setSelectedScenario('fire_evacuation')}
          className={`flex items-center justify-center space-x-1.5 p-2 rounded-lg text-xs font-bold transition-all ${
            selectedScenario === 'fire_evacuation'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span className="truncate">3. PASS Fire Evac</span>
        </button>
      </div>

      {/* Simulation Stage */}
      <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        
        {/* Real Camera Feed (if enabled) */}
        {cameraPassthrough && (
          <video
            ref={cameraVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        )}

        {/* 3D WebGL Three.js Layer */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <ARScene3D
            scenarioId={selectedScenario}
            stepProgress={currentStepIndex}
            hazardActive={hazardTriggered}
            cameraPassthrough={cameraPassthrough}
            onObjectClick={() => handleStepAction(currentStepIndex)}
          />
        </div>

        {/* AR Heads-Up Display (HUD) Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none p-3 sm:p-5 flex flex-col justify-between">
          
          {/* Top HUD: Reaction Stopwatch & Hazard Alert Bar */}
          <div className="flex items-center justify-between gap-2">
            {/* Live Hazard Strobe Indicator */}
            <div className="flex items-center space-x-2 bg-red-950/85 backdrop-blur-md border border-red-500/60 px-3 py-1.5 rounded-xl shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
              <div>
                <span className="text-[10px] font-bold text-red-300 block uppercase tracking-wider">
                  {t.hazardAlert}
                </span>
                <span className="text-xs font-black text-white">
                  {selectedScenario === 'gas_leak' ? 'CH₄ METHANE LEVEL: 2.8% LEL' : selectedScenario === 'loto' ? 'UNGUARDED 415V ROLLER' : 'CLASS B ELECTRICAL FIRE'}
                </span>
              </div>
            </div>

            {/* Reaction Stopwatch */}
            <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl shadow-lg">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">
                  {t.reactionTimer}
                </span>
                <span className="font-mono text-xs sm:text-sm font-extrabold text-amber-300">
                  {(reactionTimerMs / 1000).toFixed(2)}s
                </span>
              </div>
            </div>
          </div>

          {/* Center Overlay: Target Reticle & Visual Instruction */}
          <div className="self-center text-center">
            <div className="inline-block bg-slate-900/80 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full text-xs text-amber-300 font-semibold mb-2">
              Step {currentStepIndex + 1} of {activeSteps.length}: Action Required
            </div>
          </div>

          {/* Bottom HUD: Live Gauges & Controls */}
          <div className="flex items-end justify-between gap-3">
            {/* Multi-Gas / Machinery Gauge telemetry */}
            {selectedScenario === 'gas_leak' && (
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2 sm:p-3 rounded-xl text-xs space-y-1 shadow-lg pointer-events-auto">
                <div className="flex items-center space-x-1.5 text-slate-300 font-bold border-b border-slate-800 pb-1">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                  <span>DGMS Multi-Gas Telemetry</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center pt-1">
                  <div className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/40">
                    <span className="block text-[9px] text-slate-400">CH₄ (LEL)</span>
                    <span className="font-bold">2.8%</span>
                  </div>
                  <div className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/40">
                    <span className="block text-[9px] text-slate-400">CO</span>
                    <span className="font-bold">45 ppm</span>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/40">
                    <span className="block text-[9px] text-slate-400">O₂</span>
                    <span className="font-bold">18.2%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Camera AR / 3D Toggle */}
            <div className="flex items-center space-x-2 pointer-events-auto ml-auto">
              <button
                onClick={() => setCameraPassthrough(!cameraPassthrough)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 backdrop-blur-md transition-all ${
                  cameraPassthrough 
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg' 
                    : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{cameraPassthrough ? t.cameraARFeed : t.simulation3DFeed}</span>
              </button>

              {soundEnabled && (
                <button
                  onClick={() => speakGuidance(activeSteps[currentStepIndex] || "", language)}
                  className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl text-amber-400"
                  title="Speak Step Instructions"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Trainee Action Buttons */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.stepSequence}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Trainee: <strong className="text-white">{trainee.name}</strong> ({trainee.daysInService} Days)
          </span>
        </div>

        {/* Steps List */}
        <div className="grid grid-cols-1 gap-2.5">
          {activeSteps.map((stepText, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={idx}
                onClick={() => handleStepAction(idx)}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                  isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-500 text-white shadow-lg ring-1 ring-amber-400/50 cursor-pointer animate-pulse'
                    : 'bg-slate-850/60 border-slate-800 text-slate-500 cursor-not-allowed opacity-75'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{stepText}</span>
                </div>

                {isCurrent && (
                  <span className="shrink-0 ml-2 px-2.5 py-1 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-lg flex items-center space-x-1 shadow">
                    <span>Execute</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
