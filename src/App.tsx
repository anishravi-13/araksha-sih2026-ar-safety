import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SIHPitchBanner } from './components/SIHPitchBanner';
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

  // Assessment & Certificate state
  const [activeAssessmentResult, setActiveAssessmentResult] = useState<AssessmentResult | null>(null);
  const [activeCertificateToView, setActiveCertificateToView] = useState<AssessmentResult | null>(null);
  const [showDGMSExportModal, setShowDGMSExportModal] = useState(false);
  const [showMeshSyncModal, setShowMeshSyncModal] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(3);

  const handlePPEComplete = (_result: PPEScanResult) => {
    setPpeVerified(true);
  };

  const handleFinishAssessment = (result: AssessmentResult) => {
    setActiveAssessmentResult(result);
    setPendingSyncCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* SIH Hackathon & Team Metadata Pitch Banner */}
      <SIHPitchBanner />

      {/* Main App Navigation Bar */}
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
                {/* Back to PPE check shortcut */}
                <div className="flex items-center justify-between text-xs bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300">
                      Trainee: <strong className="text-white">{activeTrainee.name}</strong> ({activeTrainee.workerNumber})
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-emerald-400 font-semibold">PPE Verified</span>
                  </div>

                  <button
                    onClick={() => setPpeVerified(false)}
                    className="text-amber-400 hover:text-amber-300 font-medium underline"
                  >
                    Re-verify PPE Camera
                  </button>
                </div>

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
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 font-black text-sm rounded-xl shadow-xl hover:from-emerald-500 hover:to-teal-500 cursor-pointer"
              >
                Launch DGMS Form V Compliance Inspector Document
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Public / Auditor Certificate Validator */}
        {activeTab === 'validator' && (
          <DGMSValidator
            onSelectCertificate={(cert) => setActiveCertificateToView(cert)}
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
          <span>ARAKSHA © 2026 • Smart India Hackathon Prototype (SIH26041)</span>
          <span>Designed by Team Techwolves (ID: 139519) • Mining &amp; Manufacturing Safety</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
