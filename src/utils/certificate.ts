import { AssessmentResult } from '../types';

export function generateSignature(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
  return `SIG-DGMS-${hex}-${Date.now().toString(36).toUpperCase()}`;
}

export function generateCertificateId(workerNo: string, scenarioId: string): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  const code = scenarioId.substring(0, 3).toUpperCase();
  return `DGMS-JH-2026-${code}-${workerNo.slice(-3)}${rand}`;
}

// Generate an SVG QR code pattern without bulky external QR packages
export function generateQRCodeSVG(data: string, size = 180): string {
  // 21x21 grid pattern simulation with finder patterns and deterministic data matrix
  const matrixSize = 21;
  const grid: boolean[][] = Array(matrixSize).fill(false).map(() => Array(matrixSize).fill(false));

  // Add 3 corner finder patterns (7x7)
  const addFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          grid[startY + r][startX + c] = true;
        }
      }
    }
  };

  addFinder(0, 0); // top-left
  addFinder(14, 0); // top-right
  addFinder(0, 14); // bottom-left

  // Pseudo-random deterministic fill based on data string characters
  let seed = 0;
  for (let i = 0; i < data.length; i++) {
    seed = (seed * 31 + data.charCodeAt(i)) % 1000000007;
  }

  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Don't overwrite finders
      const inTL = r < 8 && c < 8;
      const inTR = r < 8 && c >= 13;
      const inBL = r >= 13 && c < 8;
      if (!inTL && !inTR && !inBL) {
        if (lcg() > 0.45) {
          grid[r][c] = true;
        }
      }
    }
  }

  // Build SVG path
  const cellSize = size / matrixSize;
  let paths = '';
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (grid[r][c]) {
        const x = c * cellSize;
        const y = r * cellSize;
        paths += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#111827" />`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#ffffff" rx="8"/>${paths}</svg>`;
}

const CERT_STORAGE_KEY = 'araksha_certificates_db';

export function saveCertificate(result: AssessmentResult): void {
  try {
    const existing = getStoredCertificates();
    const filtered = existing.filter(c => c.certificateId !== result.certificateId);
    filtered.unshift(result);
    localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error("Failed saving certificate locally", e);
  }
}

export function getStoredCertificates(): AssessmentResult[] {
  try {
    const raw = localStorage.getItem(CERT_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AssessmentResult[];
  } catch {
    return [];
  }
}

export function lookupCertificate(certId: string): AssessmentResult | null {
  const all = getStoredCertificates();
  const trimmed = certId.trim().toUpperCase();
  const match = all.find(c => c.certificateId.toUpperCase() === trimmed);
  if (match) return match;

  // Fallback demo mock if searching for default mock certificates
  if (trimmed.includes('DGMS-JH-2026')) {
    return {
      id: 'demo-cert-1',
      certificateId: trimmed,
      traineeId: 'TR-10492',
      traineeName: 'Birsa Munda Soren',
      workerNumber: 'BCCL-DNB-4910',
      unit: 'BCCL Dhanbad Coking Coal Division (Pit 3 Underground)',
      scenarioId: 'gas_leak',
      scenarioName: 'Underground Methane Gas Leak & SCSR Protocol',
      date: new Date().toISOString().split('T')[0],
      reactionTimeSeconds: 2.8,
      expectedReactionTime: 6.0,
      sequenceAccuracy: 100,
      ppeCompliance: 100,
      comprehensionScore: 96,
      riskLevel: 'LOW',
      passed: true,
      isNewRecruit: true,
      signatureHash: 'SIG-DGMS-7C81B-OFFICIAL-VALID',
      syncedToCloud: true,
    };
  }
  return null;
}
