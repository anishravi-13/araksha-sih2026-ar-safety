import React from 'react';
import { ShieldCheck, Play, Award, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface WorkflowStepperProps {
  currentStage: 'ppe' | 'simulator' | 'certificate';
  ppeVerified: boolean;
  onSelectStage: (stage: 'ppe' | 'simulator' | 'certificate') => void;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStage,
  ppeVerified,
  onSelectStage
}) => {
  const steps = [
    {
      id: 'ppe',
      label: 'Step 1: Safety Gear Check',
      sub: 'AI Camera / 1-Click Verification',
      icon: ShieldCheck,
      completed: ppeVerified,
      active: currentStage === 'ppe'
    },
    {
      id: 'simulator',
      label: 'Step 2: 3D AR Simulator',
      sub: 'Gas Leak, LOTO & Fire Scenarios',
      icon: Play,
      completed: false,
      active: currentStage === 'simulator'
    },
    {
      id: 'certificate',
      label: 'Step 3: Official Certification',
      sub: 'Verifiable Digital QR Certificate',
      icon: Award,
      completed: false,
      active: currentStage === 'certificate'
    }
  ];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Stage wizard buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => onSelectStage(step.id as 'ppe' | 'simulator' | 'certificate')}
                  className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-xl border text-left transition-all cursor-pointer whitespace-nowrap ${
                    step.active
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-500/80 text-white shadow-md shadow-amber-500/10'
                      : step.completed
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/60'
                      : 'bg-slate-850/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    step.active
                      ? 'bg-amber-500 text-slate-950'
                      : step.completed
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.completed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{step.label}</div>
                    <div className="text-[10px] text-slate-400 hidden sm:block leading-tight">{step.sub}</div>
                  </div>
                </button>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Quick status pill */}
        <div className="hidden lg:flex items-center space-x-2 text-xs bg-slate-850 px-3 py-1 rounded-full border border-slate-750 text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Practice hazardous emergencies with zero real-world risk</span>
        </div>
      </div>
    </div>
  );
};
