export type Language = 'en' | 'hi' | 'sat';

export type Sector = 'mining' | 'steel' | 'mica';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface TraineeProfile {
  id: string;
  name: string;
  workerNumber: string;
  sector: Sector;
  unit: string;
  daysInService: number; // For tracking <30 day new recruits
  avatar: string;
  role: string;
  assignedSupervisor: string;
}

export interface PPEScanResult {
  helmet: boolean;
  vest: boolean;
  mask: boolean;
  gloves: boolean;
  confidence: {
    helmet: number;
    vest: number;
    mask: number;
    gloves: number;
  };
  geoLat: number;
  geoLng: number;
  timestamp: string;
  passed: boolean;
}

export type ScenarioId = 'gas_leak' | 'loto' | 'fire_evacuation';

export interface ScenarioStep {
  id: string;
  titleKey: string;
  descKey: string;
  completed: boolean;
  isHazardAction?: boolean;
}

export interface AssessmentResult {
  id: string;
  certificateId: string;
  traineeId: string;
  traineeName: string;
  workerNumber: string;
  unit: string;
  scenarioId: ScenarioId;
  scenarioName: string;
  date: string;
  reactionTimeSeconds: number;
  expectedReactionTime: number;
  sequenceAccuracy: number; // 0-100
  ppeCompliance: number; // 0-100
  comprehensionScore: number; // 0-100
  riskLevel: RiskLevel;
  passed: boolean;
  isNewRecruit: boolean; // <30 days
  signatureHash: string;
  syncedToCloud: boolean;
}

export interface CrewMember {
  id: string;
  name: string;
  role: string;
  unit: string;
  daysInService: number;
  lastTrainedDate: string;
  riskLevel: RiskLevel;
  safetyScore: number;
  status: 'Certified' | 'Overdue' | 'Under Training' | 'Flagged';
  syncedOffline: boolean;
}

export interface DGMSStatutoryRecord {
  actCitation: string;
  standardCode: string;
  totalCertifiedWorkers: number;
  totalNewRecruitsTracked: number;
  criticalIncidentSimulationsCompleted: number;
  highRiskRecruitsRemediated: number;
  auditPeriod: string;
  inspectionStatus: 'Compliant' | 'Pending Review';
}
