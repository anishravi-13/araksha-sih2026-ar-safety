import React from 'react';
import { ShieldCheck, Play, Award, CheckCircle, ChevronRight } from 'lucide-react';

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
      stepNum: '01',
      label: 'Safety Gear Clearance',
      sub: 'Shift Entry Inspection',
      icon: ShieldCheck,
      completed: ppeVerified,
      active: currentStage === 'ppe'
    },
    {
      id: 'simulator',
      stepNum: '02',
      label: 'Field Simulator',
      sub: 'Interactive 3D SOP Test',
      icon: Play,
      completed: false,
      active: currentStage === 'simulator'
    },
    {
      id: 'certificate',
      stepNum: '03',
      label: 'Official Credential',
      sub: 'Statutory Verification & Audit',
      icon: Award,
      completed: false,
      active: currentStage === 'certificate'
    }
  ];

  return (
    <div className="bg-[#0e1422] border-b border-slate-800/80 py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Step Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 w-full md:w-auto overflow-x-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => onSelectStage(step.id as 'ppe' | 'simulator' | 'certificate')}
                  className={`flex items-center space-x-3 px-3.5 py-2 rounded-xl text-left transition-colors cursor-pointer whitespace-nowrap ${
                    step.active
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                      : step.completed
                      ? 'text-emerald-400 hover:bg-slate-850'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                    step.active
                      ? 'bg-amber-500 text-slate-950'
                      : step.completed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.completed ? <CheckCircle className="w-3.5 h-3.5" /> : step.stepNum}
                  </div>
                  <div>
                    <div className="text-xs font-semibold leading-tight text-white">{step.label}</div>
                    <div className="text-[10px] text-slate-400 hidden sm:block leading-tight">{step.sub}</div>
                  </div>
                </button>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* System Status pill */}
        <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Field Simulation Protocol active • Standards compliant</span>
        </div>
      </div>
    </div>
  );
};
