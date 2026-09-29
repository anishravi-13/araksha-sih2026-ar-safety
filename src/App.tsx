import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { WorkflowStepper } from './components/WorkflowStepper';
import { PPEVerification } from './components/PPEVerification';
import { ARContainer } from './components/ARSimulator/ARContainer';
import { AssessmentResultModal } from './components/AssessmentResultModal';
import { CertificateView } from './components/CertificateView';
import { SupervisorConsole } from './components/SupervisorConsole';
import { DGMSValidator } from './components/DGMSValidator';
import { DGMSAuditReportModal } from './components/DGMSAuditReportModal';
import { OfflineMeshSyncModal } from './components/OfflineMeshSyncModal';
import { AssessmentResult, Language, PPEScanResult, TraineeProfile } from './types';
import { mockTraineeProfiles } from './utils/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState<'trainee' | 'supervisor' | 'dgms' | 'validator'>('trainee');
  const [language, setLanguage] = useState<Language>('en');
  const [isOffline, setIsOffline] = useState(false);
  const [isBudgetPhoneMode, setIsBudgetPhoneMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Active trainee & PPE gate status
  const [activeTrainee, setActiveTrainee] = useState<TraineeProfile>(mockTraineeProfiles[0]);
  const [ppeVerified, setPpeVerified] = useState(false);
  const [currentWorkflowStage, setCurrentWorkflowStage] = useState<'ppe' | 'simulator' | 'certificate'>('ppe');

  // Assessment & Certificate state
  const [activeAssessmentResult, setActiveAssessmentResult] = useState<AssessmentResult | null>(null);
  const [activeCertificateToView, setActiveCertificateToView] = useState<AssessmentResult | null>(null);
  const [validatorTargetCertId, setValidatorTargetCertId] = useState<string | undefined>(undefined);
  const [showDGMSExportModal, setShowDGMSExportModal] = useState(false);
  const [showMeshSyncModal, setShowMeshSyncModal] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(3);

  const handlePPEComplete = (_result: PPEScanResult) => {
    setPpeVerified(true);
    setCurrentWorkflowStage('simulator');
  };

  const handleFinishAssessment = (result: AssessmentResult) => {
    setActiveAssessmentResult(result);
    setPendingSyncCount(prev => prev + 1);
  };

  const handleStageSelect = (stage: 'ppe' | 'simulator' | 'certificate') => {
    setCurrentWorkflowStage(stage);
    setActiveTab('trainee');
    if (stage === 'simulator') {
      setPpeVerified(true);
    } else if (stage === 'ppe') {
      setPpeVerified(false);
    } else if (stage === 'certificate') {
      if (activeAssessmentResult) {
        setActiveCertificateToView(activeAssessmentResult);
      } else {
        // Look up default recent certificate
        setActiveTab('validator');
      }
    }
  };

  const handleVerifyInPortal = (certId: string) => {
    setValidatorTargetCertId(certId);
    setActiveTab('validator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        isBudgetPhoneMode={isBudgetPhoneMode}
        setIsBudgetPhoneMode={setIsBudgetPhoneMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenMeshSync={() => setShowMeshSyncModal(true)}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Guided 3-Step Workflow Stepper */}
      <WorkflowStepper
        currentStage={currentWorkflowStage}
        ppeVerified={ppeVerified}
        onSelectStage={handleStageSelect}
      />

      {/* Main Application Content Area */}
      <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
        {/* Tab 1: Trainee Experience */}
        {activeTab === 'trainee' && (
          <div className="space-y-6">
            {!ppeVerified ? (
              <PPEVerification
                language={language}
                trainee={activeTrainee}
                onTraineeChange={setActiveTrainee}
                availableTrainees={mockTraineeProfiles}
                onComplete={handlePPEComplete}
                soundEnabled={soundEnabled}
              />
            ) : (
              <div className="space-y-4">
                {/* Back to PPE check / Active status pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-800 shadow-md">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300">
                      Trainee: <strong className="text-white font-bold">{activeTrainee.name}</strong> ({activeTrainee.workerNumber})
                    </span>
                    <span className="text-slate-600 hidden sm:inline">•</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                      ✓ Safety Gear Verified
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setPpeVerified(false);
                        setCurrentWorkflowStage('ppe');
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                    >
                      Re-scan PPE Gear
                    </button>
                  </div>
                </div>

                {/* 3D AR Simulator Container */}
                <ARContainer
                  language={language}
                  trainee={activeTrainee}
                  soundEnabled={soundEnabled}
                  onFinishAssessment={handleFinishAssessment}
                  isBudgetPhoneMode={isBudgetPhoneMode}
                />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Supervisor Console */}
        {activeTab === 'supervisor' && (
          <SupervisorConsole
            onExportDGMS={() => setShowDGMSExportModal(true)}
            onOpenMeshSync={() => setShowMeshSyncModal(true)}
          />
        )}

        {/* Tab 3: DGMS Audit & Reports Direct Launch */}
        {activeTab === 'dgms' && (
          <div className="space-y-6">
            <SupervisorConsole
              onExportDGMS={() => setShowDGMSExportModal(true)}
              onOpenMeshSync={() => setShowMeshSyncModal(true)}
            />
            {/* Direct preview trigger */}
            <div className="text-center pt-4">
              <button
                onClick={() => setShowDGMSExportModal(true)}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:from-emerald-500 hover:to-teal-500 cursor-pointer transition-all transform hover:scale-[1.02]"
              >
                Launch DGMS Form V Compliance Inspector Document
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Public / Auditor Certificate Validator */}
        {activeTab === 'validator' && (
          <DGMSValidator
            initialCertId={validatorTargetCertId}
            onSelectCertificate={(cert) => setActiveCertificateToView(cert)}
            onBackToSimulator={() => {
              setActiveTab('trainee');
              setPpeVerified(true);
              setCurrentWorkflowStage('simulator');
            }}
          />
        )}
      </main>

      {/* Assessment Result Modal */}
      {activeAssessmentResult && (
        <AssessmentResultModal
          result={activeAssessmentResult}
          language={language}
          onClose={() => setActiveAssessmentResult(null)}
          onViewCertificate={() => {
            setActiveCertificateToView(activeAssessmentResult);
            setActiveAssessmentResult(null);
            setCurrentWorkflowStage('certificate');
          }}
          onRetry={() => {
            setActiveAssessmentResult(null);
          }}
        />
      )}

      {/* Digital QR Certificate Full View */}
      {activeCertificateToView && (
        <CertificateView
          certificate={activeCertificateToView}
          onClose={() => setActiveCertificateToView(null)}
          onVerifyInPortal={handleVerifyInPortal}
        />
      )}

      {/* DGMS Form V Compliance Modal */}
      {showDGMSExportModal && (
        <DGMSAuditReportModal
          onClose={() => setShowDGMSExportModal(false)}
        />
      )}

      {/* Offline Mesh Sync Modal */}
      {showMeshSyncModal && (
        <OfflineMeshSyncModal
          onClose={() => setShowMeshSyncModal(false)}
          pendingCount={pendingSyncCount}
          onSyncComplete={() => {
            setPendingSyncCount(0);
          }}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ARAKSHA © 2026 • Industrial Safety &amp; Competency Certification Platform</span>
          <span>Complies with Mines Act 1952, Factories Act 1948 &amp; OSH Code 2020</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
