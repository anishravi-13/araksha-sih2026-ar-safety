import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  Volume2, 
  Clock, 
  Gauge, 
  Flame, 
  Lock, 
  Wind, 
  Eye, 
  Check, 
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw
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
  const [hazardTriggered, setHazardTriggered] = useState(true);
  const [mistakeCount, setMistakeCount] = useState(0);

  const timerRef = useRef<number | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);

  // Scenarios data
  const scenarioStepsData: Record<ScenarioId, { title: string; steps: string[]; actionLabels: string[]; voiceKey: string }> = {
    gas_leak: {
      title: t.scenarioGasTitle,
      steps: [
        "1. Calibrate & Inspect Multi-Gas Detector (LEL > 2.0% Critical Alert)",
        "2. De-energize Local Electrical Switches to Eliminate Spark Risk",
        "3. Engage Auxiliary Ventilation Fan Ducting",
        "4. Deploy Self-Contained Self-Rescuer (SCSR) Chemical Breathing Pack",
        "5. Evacuate Following Green AR Ground Laser Waypoints to Intake Airway"
      ],
      actionLabels: [
        "Calibrate Gas Detector",
        "Cut Off Power Switches",
        "Start Auxiliary Ventilation Fan",
        "Equip SCSR Oxygen Pack",
        "Evacuate to Safe Airway Shaft"
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
      actionLabels: [
        "Notify Operations Crew",
        "Disconnect 415V Breaker Switch",
        "Attach Safety Padlock (Lockout)",
        "Hang Danger Warning Tag (Tagout)",
        "Test Button: Verify Zero Energy"
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
      actionLabels: [
        "P: Pull Extinguisher Safety Pin",
        "A: Aim Nozzle at Base of Fire",
        "S: Squeeze Trigger Lever Handle",
        "S: Sweep Nozzle Across Fire",
        "Evacuate via Green Route"
      ],
      voiceKey: t.voicePromptFire
    }
  };

  const restartScenario = (scenarioId: ScenarioId) => {
    setSelectedScenario(scenarioId);
    setCurrentStepIndex(0);
    setReactionTimerMs(0);
    setHazardTriggered(true);
    setMistakeCount(0);

    if (timerRef.current) clearInterval(timerRef.current);
    const start = Date.now();
    timerRef.current = window.setInterval(() => {
      setReactionTimerMs(Date.now() - start);
    }, 50);

    if (soundEnabled) {
      soundEffects.playAlarm();
      const prompt = scenarioStepsData[scenarioId].voiceKey;
      speakGuidance(prompt, language);
    }
  };

  // Start scenario timer and hazard alarm
  useEffect(() => {
    restartScenario(selectedScenario);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, [selectedScenario]);

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

  const activeScenarioData = scenarioStepsData[selectedScenario];
  const activeSteps = activeScenarioData.steps;
  const currentActionLabel = activeScenarioData.actionLabels[currentStepIndex] || "Proceed";

  const handleStepAction = (index: number) => {
    if (index !== currentStepIndex) {
      soundEffects.playClick();
      setMistakeCount(prev => prev + 1);
      return;
    }

    soundEffects.playClick();
    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);

    if (nextIndex >= activeSteps.length) {
      // Completed all steps
      if (timerRef.current) clearInterval(timerRef.current);
      setHazardTriggered(false);
      soundEffects.playSuccess();

      const reactionSeconds = parseFloat((reactionTimerMs / 1000).toFixed(1));
      const accuracy = Math.max(75, 100 - mistakeCount * 8);
      const passed = true;
      
      let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
      if (accuracy < 80 || reactionSeconds > 15) {
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
        scenarioName: activeScenarioData.title,
        date: new Date().toISOString().split('T')[0],
        reactionTimeSeconds: reactionSeconds,
        expectedReactionTime: 8.0,
        sequenceAccuracy: accuracy,
        ppeCompliance: 100,
        comprehensionScore: Math.min(98, Math.round((accuracy * 0.6) + (Math.max(0, 100 - reactionSeconds * 2.5) * 0.4))),
        riskLevel,
        passed,
        isNewRecruit: trainee.daysInService < 30,
        signatureHash,
        syncedToCloud: false
      };

      saveCertificate(result);
      onFinishAssessment(result);
    } else {
      if (soundEnabled && nextIndex === activeSteps.length - 1) {
        speakGuidance(t.emergencyEvacuate, language);
      }
    }
  };

  return (
    <div className={`space-y-4 ${isBudgetPhoneMode ? 'max-w-md mx-auto border-8 border-slate-750 rounded-[44px] p-2.5 bg-slate-950 shadow-2xl ring-4 ring-amber-500/20' : 'max-w-7xl mx-auto'}`}>
      
      {/* Phone Viewport Header Badge */}
      {isBudgetPhoneMode && (
        <div className="flex items-center justify-between px-3 py-1 bg-slate-900 rounded-t-2xl text-[10px] text-amber-400 font-mono">
          <span>₹10–12k Mid-Range Android AR Simulation (60 FPS)</span>
          <span className="text-emerald-400">Optimized</span>
        </div>
      )}

      {/* Scenario Selectors with Friendly Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-900 p-2.5 rounded-2xl border border-slate-800 shadow-xl">
        <button
          onClick={() => restartScenario('gas_leak')}
          className={`flex items-center space-x-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
            selectedScenario === 'gas_leak'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg ring-1 ring-emerald-400'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold leading-tight">1. Methane Gas Leak</div>
            <div className="text-[10px] text-slate-300">Underground Mine Drift</div>
          </div>
        </button>

        <button
          onClick={() => restartScenario('loto')}
          className={`flex items-center space-x-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
            selectedScenario === 'loto'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg ring-1 ring-amber-400'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold leading-tight">2. Machinery LOTO</div>
            <div className="text-[10px] text-slate-300">Conveyor Belt Lockout</div>
          </div>
        </button>

        <button
          onClick={() => restartScenario('fire_evacuation')}
          className={`flex items-center space-x-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
            selectedScenario === 'fire_evacuation'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg ring-1 ring-red-400'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <div className="p-2 rounded-lg bg-red-500/20 text-red-300">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold leading-tight">3. PASS Fire Evac</div>
            <div className="text-[10px] text-slate-300">Extinguisher &amp; Exit Route</div>
          </div>
        </button>
      </div>

      {/* Main 3D Simulation Stage */}
      <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        
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
            isExtinguishing={selectedScenario === 'fire_evacuation' && currentStepIndex >= 3}
          />
        </div>

        {/* Floating "Next Action" Interactive Callout Overlay right on 3D viewport */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <button
            onClick={() => handleStepAction(currentStepIndex)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-orange-500/40 border-2 border-amber-300 flex items-center space-x-2 animate-bounce cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>👉 Next Step: {currentActionLabel}</span>
          </button>
        </div>

        {/* AR Heads-Up Display (HUD) Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
          
          {/* Top HUD: Stopwatch & Hazard Alert Bar */}
          <div className="flex items-center justify-between gap-2">
            {/* Live Hazard Strobe Indicator */}
            <div className="flex items-center space-x-2 bg-red-950/85 backdrop-blur-md border border-red-500/60 px-3.5 py-2 rounded-2xl shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <div>
                <span className="text-[10px] font-black text-red-300 block uppercase tracking-wider">
                  {t.hazardAlert}
                </span>
                <span className="text-xs font-bold text-white">
                  {selectedScenario === 'gas_leak' ? 'CH₄ METHANE HAZARD: 2.8% LEL' : selectedScenario === 'loto' ? '415V MOVING ROLLER CONVEYOR' : 'INDUSTRIAL ELECTRICAL FIRE'}
                </span>
              </div>
            </div>

            {/* Reaction Stopwatch */}
            <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3.5 py-2 rounded-2xl shadow-lg">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block">
                  {t.reactionTimer}
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-amber-300">
                  {(reactionTimerMs / 1000).toFixed(2)}s
                </span>
              </div>
            </div>
          </div>

          {/* Bottom HUD: Telemetry & View Controls */}
          <div className="flex items-end justify-between gap-3">
            {/* Multi-Gas telemetry for gas leak */}
            {selectedScenario === 'gas_leak' && (
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-2xl text-xs space-y-1.5 shadow-xl pointer-events-auto">
                <div className="flex items-center space-x-1.5 text-slate-300 font-bold border-b border-slate-800 pb-1">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-Time Multi-Gas Telemetry</span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] text-center pt-0.5">
                  <div className="bg-red-500/20 text-red-300 px-2 py-1 rounded-lg border border-red-500/40">
                    <span className="block text-[9px] text-slate-400">CH₄</span>
                    <span className="font-black">2.8%</span>
                  </div>
                  <div className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded-lg border border-amber-500/40">
                    <span className="block text-[9px] text-slate-400">CO</span>
                    <span className="font-black">45 ppm</span>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-lg border border-emerald-500/40">
                    <span className="block text-[9px] text-slate-400">O₂</span>
                    <span className="font-black">18.2%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Viewport Toggles */}
            <div className="flex items-center space-x-2 pointer-events-auto ml-auto">
              <button
                onClick={() => setCameraPassthrough(!cameraPassthrough)}
                className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 backdrop-blur-md transition-all cursor-pointer ${
                  cameraPassthrough 
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg' 
                    : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{cameraPassthrough ? t.cameraARFeed : t.simulation3DFeed}</span>
              </button>

              <button
                onClick={() => restartScenario(selectedScenario)}
                title="Restart this scenario"
                className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {soundEnabled && (
                <button
                  onClick={() => speakGuidance(activeSteps[currentStepIndex] || "", language)}
                  className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl text-amber-400 cursor-pointer"
                  title="Speak Step Instructions"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step Sequence Checklist and Action Trigger */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.stepSequence}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Complete each required safety procedure step in exact order:
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Step {currentStepIndex + 1} of {activeSteps.length}
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
                className={`w-full text-left p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : isCurrent
                    ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border-amber-500 text-white shadow-lg ring-2 ring-amber-400/60'
                    : 'bg-slate-850/50 border-slate-800 text-slate-500 hover:text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">{stepText}</span>
                </div>

                {isCurrent && (
                  <span className="shrink-0 ml-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black rounded-xl flex items-center space-x-1.5 shadow-lg">
                    <span>Click to Execute</span>
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
