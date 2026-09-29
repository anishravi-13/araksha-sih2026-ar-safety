import { CrewMember, DGMSStatutoryRecord, TraineeProfile } from '../types';

export const mockTraineeProfiles: TraineeProfile[] = [
  {
    id: 'TR-10492',
    name: 'Birsa Munda Soren',
    workerNumber: 'BCCL-DNB-4910',
    sector: 'mining',
    unit: 'BCCL Dhanbad Coking Coal Division (Underground Pit 3)',
    daysInService: 12, // High risk new recruit <30 days
    avatar: '👷‍♂️',
    role: 'Underground Drill Operator Trainee',
    assignedSupervisor: 'R. K. Sharma (Mine Safety Manager)'
  },
  {
    id: 'TR-10822',
    name: 'Amit Kumar Mahato',
    workerNumber: 'BSL-BOK-3829',
    sector: 'steel',
    unit: 'Bokaro Steel Plant (Blast Furnace & Continuous Casting)',
    daysInService: 24, // New recruit <30 days
    avatar: '👨‍🏭',
    role: 'Rolling Mill Maintenance Technician',
    assignedSupervisor: 'Sunil Hansda (Plant Safety Incharge)'
  },
  {
    id: 'TR-09183',
    name: 'Rameshwar Tudu',
    workerNumber: 'KDM-MIC-1102',
    sector: 'mica',
    unit: 'Koderma Mica Processing & Quarry Zone',
    daysInService: 180,
    avatar: '👷',
    role: 'Heavy Earth Moving Machinery (HEMM) Operator',
    assignedSupervisor: 'Deepak Roy (Mines Foreman)'
  }
];

export const mockCrewMembers: CrewMember[] = [
  {
    id: 'CR-001',
    name: 'Birsa Munda Soren',
    role: 'Drill Operator Trainee',
    unit: 'BCCL Dhanbad - Pit 3',
    daysInService: 12,
    lastTrainedDate: '2026-09-28',
    riskLevel: 'HIGH',
    safetyScore: 68,
    status: 'Flagged',
    syncedOffline: true
  },
  {
    id: 'CR-002',
    name: 'Santosh Kumar Verma',
    role: 'Shaft Ventilation Crew',
    unit: 'BCCL Dhanbad - Pit 3',
    daysInService: 19,
    lastTrainedDate: '2026-09-25',
    riskLevel: 'MODERATE',
    safetyScore: 82,
    status: 'Under Training',
    syncedOffline: true
  },
  {
    id: 'CR-003',
    name: 'Amit Kumar Mahato',
    role: 'Mill Technician',
    unit: 'Bokaro Steel Plant',
    daysInService: 24,
    lastTrainedDate: '2026-09-29',
    riskLevel: 'LOW',
    safetyScore: 94,
    status: 'Certified',
    syncedOffline: false
  },
  {
    id: 'CR-004',
    name: 'Sunita Hembrom',
    role: 'Haul Road Flag Operator',
    unit: 'Tata Steel Jamshedpur',
    daysInService: 8,
    lastTrainedDate: '2026-09-22',
    riskLevel: 'HIGH',
    safetyScore: 58,
    status: 'Overdue',
    syncedOffline: true
  },
  {
    id: 'CR-005',
    name: 'Prakash Chandra Bauri',
    role: 'Electrical Substation Attendant',
    unit: 'Bokaro Steel Plant',
    daysInService: 340,
    lastTrainedDate: '2026-09-15',
    riskLevel: 'LOW',
    safetyScore: 98,
    status: 'Certified',
    syncedOffline: true
  },
  {
    id: 'CR-006',
    name: 'Raju Murmu',
    role: 'Roof Bolting Crew',
    unit: 'BCCL Dhanbad - Pit 7',
    daysInService: 16,
    lastTrainedDate: '2026-09-27',
    riskLevel: 'HIGH',
    safetyScore: 71,
    status: 'Flagged',
    syncedOffline: true
  },
  {
    id: 'CR-007',
    name: 'Shankar Lal Mahto',
    role: 'Crusher Belt Supervisor',
    unit: 'Koderma Mica Zone',
    daysInService: 480,
    lastTrainedDate: '2026-09-10',
    riskLevel: 'LOW',
    safetyScore: 96,
    status: 'Certified',
    syncedOffline: true
  }
];

export const mockDGMSStatutoryRecord: DGMSStatutoryRecord = {
  actCitation: "Mines Act 1952, Section 22A & Factories Act 1948, Subsumed under OSH Code 2020",
  standardCode: "DGMS Circular (Legis) No. 01/2026 - Mandated AR Emergency Simulation",
  totalCertifiedWorkers: 1248,
  totalNewRecruitsTracked: 142,
  criticalIncidentSimulationsCompleted: 3890,
  highRiskRecruitsRemediated: 38,
  auditPeriod: "Quarterly Audit (Q3 2026) - Jharkhand Industrial Region",
  inspectionStatus: "Compliant"
};
