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
  RotateCcw,
  Camera,
  Layers
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
  const [cameraPreset, setCameraPreset] = useState<'overview' | 'focus' | 'evac'>('overview');
  const [reactionTimerMs, setReactionTimerMs] = useState(0);
  const [hazardTriggered, setHazardTriggered] = useState(true);
  const [mistakeCount, setMistakeCount] = useState(0);

  const timerRef = useRef<number | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);

  const scenarioStepsData: Record<ScenarioId, { title: string; subtitle: string; steps: string[]; actionLabels: string[]; voiceKey: string }> = {
    gas_leak: {
      title: t.scenarioGasTitle,
      subtitle: "Underground Incline • Hazard Threshold: CH₄ > 2.0% LEL",
      steps: [
        "1. Calibrate & Inspect Gas Detector (LEL > 2.0% Threshold)",
        "2. De-energize Local Electrical Switches to Prevent Sparks",
        "3. Engage Auxiliary Ventilation Duct Fan",
        "4. Don Self-Contained Breathing Rescuer (SCSR) Pack",
        "5. Evacuate Along Illuminated Laser Guidance Trail to Intake Airway"
      ],
      actionLabels: [
        "Inspect Gas Detector",
        "Cut Off Electrical Switches",
        "Start Auxiliary Vent Fan",
        "Equip SCSR Breathing Pack",
        "Evacuate to Safe Airway Shaft"
      ],
      voiceKey: t.voicePromptGas
    },
    loto: {
      title: t.scenarioLotoTitle,
      subtitle: "Conveyor Isolation Station • Zero-Energy Verification Protocol",
      steps: [
        "1. Issue Warning to Conveyor Maintenance Crew",
        "2. Disconnect Primary 415V Power Breaker Lever",
        "3. Fasten Brass Padlock & Locking Hasp (Lockout)",
        "4. Affix Warning Danger Tag with Name and Date (Tagout)",
        "5. Press Test Start Button to Confirm Zero Stored Energy"
      ],
      actionLabels: [
        "Warn Operations Crew",
        "Disconnect 415V Breaker Switch",
        "Attach Safety Padlock (Lockout)",
        "Hang Danger Tag (Tagout)",
        "Test Button: Verify Zero Energy"
      ],
      voiceKey: t.voicePromptLoto
    },
    fire_evacuation: {
      title: t.scenarioFireTitle,
      subtitle: "Workshop Floor • Electrical Equipment Fire Suppression",
      steps: [
        "1. Pull Extinguisher Safety Pin (P)",
        "2. Aim Discharge Nozzle at Base of Fire (A)",
        "3. Squeeze Trigger Handle to Release Extinguishing Agent (S)",
        "4. Sweep Nozzle Side-to-Side Across Flame Perimeter (S)",
        "5. Evacuate Crew via Emergency Exit Door to Assembly Area"
      ],
      actionLabels: [
        "P: Pull Extinguisher Pin",
        "A: Aim Nozzle at Base of Fire",
        "S: Squeeze Trigger Handle",
        "S: Sweep Nozzle Across Fire",
        "Evacuate via Exit Route"
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
    setCameraPreset('overview');

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

  useEffect(() => {
    restartScenario(selectedScenario);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeaking();
    };
  }, [selectedScenario]);

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

    // Contextual camera angle switch
    if (nextIndex === 1 || nextIndex === 2) {
      setCameraPreset('focus');
    } else if (nextIndex >= 4) {
      setCameraPreset('evac');
    }

    if (nextIndex >= activeSteps.length) {
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
    <div className={`space-y-4 ${isBudgetPhoneMode ? 'max-w-md mx-auto border-4 border-slate-700 rounded-2xl p-2 bg-[#090d16] shadow-xl' : 'max-w-5xl mx-auto'}`}>
      
      {/* Scenario Module Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#111726] p-2 rounded-xl border border-slate-800">
        <button
          onClick={() => restartScenario('gas_leak')}
          className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${
            selectedScenario === 'gas_leak'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          <div className={`p-2 rounded-md ${selectedScenario === 'gas_leak' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold leading-tight text-white">1. Methane Gas Protocol</div>
            <div className="text-[10px] text-slate-400">Mine Drift Incline</div>
          </div>
        </button>

        <button
          onClick={() => restartScenario('loto')}
          className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${
            selectedScenario === 'loto'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          <div className={`p-2 rounded-md ${selectedScenario === 'loto' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold leading-tight text-white">2. Machinery LOTO</div>
            <div className="text-[10px] text-slate-400">Conveyor Belt Isolation</div>
          </div>
        </button>

        <button
          onClick={() => restartScenario('fire_evacuation')}
          className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-colors cursor-pointer ${
            selectedScenario === 'fire_evacuation'
              ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-850'
          }`}
        >
          <div className={`p-2 rounded-md ${selectedScenario === 'fire_evacuation' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold leading-tight text-white">3. PASS Fire Protocol</div>
            <div className="text-[10px] text-slate-400">Workshop Evacuation</div>
          </div>
        </button>
      </div>

      {/* Main 3D Simulation Viewport */}
      <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-[#070b12] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
        
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

        {/* 3D WebGL Layer */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <ARScene3D
            scenarioId={selectedScenario}
            stepProgress={currentStepIndex}
            hazardActive={hazardTriggered}
            cameraPassthrough={cameraPassthrough}
            cameraPreset={cameraPreset}
            onObjectClick={() => handleStepAction(currentStepIndex)}
            isExtinguishing={selectedScenario === 'fire_evacuation' && currentStepIndex >= 3}
          />
        </div>

        {/* Floating Action Callout */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <button
            onClick={() => handleStepAction(currentStepIndex)}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md border border-amber-300 flex items-center space-x-2 cursor-pointer transition-colors"
          >
            <span>Next Action: {currentActionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* HUD Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-between">
          
          {/* Top Status & Stopwatch */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">
                {selectedScenario === 'gas_leak' ? 'CH₄ Level: 2.8% LEL' : selectedScenario === 'loto' ? 'Machinery Energized' : 'Electrical Fire Detected'}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1.5 rounded-lg text-xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-mono font-bold text-amber-400">
                {(reactionTimerMs / 1000).toFixed(1)}s
              </span>
            </div>
          </div>

          {/* Bottom Telemetry & Camera Angle Controls */}
          <div className="flex items-end justify-between gap-2 sm:gap-3">
            {/* Live Sensor Telemetry (for gas leak) */}
            {selectedScenario === 'gas_leak' && (
              <div className="bg-slate-900/95 border border-slate-700/80 p-2.5 rounded-lg text-xs space-y-1 shadow-lg pointer-events-auto">
                <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] font-semibold border-b border-slate-800 pb-1">
                  <Gauge className="w-3 h-3 text-cyan-400" />
                  <span>Gas Sensor Readings</span>
                </div>
                <div className="flex space-x-1.5 font-mono text-[10px] text-center pt-0.5">
                  <div className="bg-slate-800 px-2 py-0.5 rounded text-amber-400 font-bold">CH₄ 2.8%</div>
                  <div className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">CO 45 ppm</div>
                  <div className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">O₂ 18.2%</div>
                </div>
              </div>
            )}

            {/* Camera View Presets */}
            <div className="flex items-center space-x-1 pointer-events-auto bg-slate-900/95 border border-slate-700/80 p-1 rounded-lg text-xs">
              <button
                onClick={() => setCameraPreset('overview')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  cameraPreset === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setCameraPreset('focus')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  cameraPreset === 'focus' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Focus
              </button>
              <button
                onClick={() => setCameraPreset('evac')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  cameraPreset === 'evac' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Exit Path
              </button>
            </div>

            {/* Viewport Toggles */}
            <div className="flex items-center space-x-1.5 pointer-events-auto ml-auto">
              <button
                onClick={() => setCameraPassthrough(!cameraPassthrough)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  cameraPassthrough 
                    ? 'bg-amber-500 text-slate-950 border-amber-400' 
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{cameraPassthrough ? t.cameraARFeed : t.simulation3DFeed}</span>
              </button>

              <button
                onClick={() => restartScenario(selectedScenario)}
                title="Reset simulation"
                className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-300 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {soundEnabled && (
                <button
                  onClick={() => speakGuidance(activeSteps[currentStepIndex] || "", language)}
                  className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-amber-400 cursor-pointer"
                  title="Speak Step Instructions"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step Sequence Checklist */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              {t.stepSequence}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Execute each mandatory step sequentially to ensure safe field protocol:
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 font-semibold">
            Step {currentStepIndex + 1} of {activeSteps.length}
          </span>
        </div>

        <div className="space-y-2">
          {activeSteps.map((stepText, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={idx}
                onClick={() => handleStepAction(idx)}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                  isCompleted
                    ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-400'
                    : isCurrent
                    ? 'bg-slate-800 border-amber-500 text-white'
                    : 'bg-slate-900/30 border-slate-800 text-slate-500 hover:text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-mono font-bold ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950'
                      : isCurrent
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{stepText}</span>
                </div>

                {isCurrent && (
                  <span className="shrink-0 ml-2 px-2.5 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg flex items-center space-x-1">
                    <span>Execute</span>
                    <ArrowRight className="w-3 h-3" />
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
