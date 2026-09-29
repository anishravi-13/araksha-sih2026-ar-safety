# ARAKSHA (सुरक्षा / ᱟᱨᱚᱠᱥᱷᱟ)
### AR-Based Vocational Training Simulator for Industrial Safety & Competency Certification

**ARAKSHA** is an enterprise-grade, augmented reality (AR) industrial safety and vocational training platform built specifically for high-risk mining, steel, and heavy manufacturing environments.

---

## 📌 Problem & Context

Heavy industries such as underground coal mining, steel mills, and mineral quarries face severe safety training bottlenecks:
- Traditional classroom lectures and printed manuals result in **<20% safety retention** when workers encounter real underground emergencies.
- Disproportionately high accident rates occur among **new recruits during their first 30 days of orientation**.
- Traditional testing uses static multiple-choice questions without real-world behavioral or reaction-time verification.
- Paper certificates are frequently misplaced, damaged, or forged.
- Deep underground sites suffer from **zero cellular or internet connectivity** and multi-lingual workforces speaking regional languages (Hindi, Santali).

**ARAKSHA** solves these challenges by combining interactive 3D Web/Mobile AR scenarios that run smoothly on **affordable ₹10,000–₹12,000 mid-range Android smartphones**, automated **AI Pre-Entry PPE Scanning**, **Reaction-Based Scoring**, **Offline-First Mesh Synchronization**, and **Tamper-Proof Digital QR Certificates** compliant with the **Mines Act 1952**, **Factories Act 1948**, and the **OSH Code, 2020**.

---

## 🚀 Core Features & Architecture

### 1. Pre-Entry AI PPE Inspection Gate
- **Live Camera & Virtual Inspection**: Automatic computer vision verification for safety gear before unlocking training simulations:
  - Safety Hard Hat / Mining Helmet (96% confidence)
  - Hi-Vis Reflective Vest (94% confidence)
  - Dust Respirator / Mask (92% confidence)
  - Heavy-Duty Work Gloves (89% confidence)
- **Instant Quick-Pass Option**: One-click bypass for instant testing and simulator evaluation.
- **Geo-Tagged Attendance**: Automatically logs GPS coordinates (`23.7957° N, 86.4304° E`), worker ID, and shift timestamp.

### 2. Interactive 3D AR Emergency Simulations
1. **Underground Methane (CH₄) Gas Leak & Evacuation**:
   - 3D mine drift tunnel with timber cribbing, mine tracks, and toxic gas particle cloud.
   - Real-time Multi-Gas Telemetry HUD (CH₄ % LEL, CO ppm, O₂ %).
   - 5-step SOP sequence: Detector calibration $\rightarrow$ Spark isolation $\rightarrow$ Auxiliary fan start $\rightarrow$ Self-Rescuer (SCSR) donning $\rightarrow$ Green laser escape trail evacuation.
2. **Machinery Safety & Lockout-Tagout (LOTO)**:
   - 3D heavy industrial conveyor belt and crusher machinery.
   - 5-point procedure: Team notification $\rightarrow$ 415V breaker disconnection $\rightarrow$ Safety padlock $\rightarrow$ DGMS Danger Tag $\rightarrow$ Zero-Energy test button.
3. **Factory Floor Fire & PASS Extinguisher Evacuation**:
   - Raging electrical fire simulation with universal **PASS** technique (Pull, Aim, Squeeze, Sweep).
   - Dynamic fire particle dampening and emergency exit route navigation.
- **Dual Engine Mode**: Switch between pure 3D canvas simulation or camera AR passthrough.

### 3. Reaction-Based Scoring & Behavioral Risk Profiling
- **Real-Time Stopwatch**: Measures response reaction time (ms) against target benchmarks ($<8.0$s).
- **Sequence Validation**: Detects order-of-operation errors and penalizes procedural violations.
- **Safety Comprehension Index**: Boosts safety recall from $<20\%$ manual baseline to $>80\%$.
- **Behavioral Risk Categorization**:
  - 🟢 **LOW RISK**: Qualified for underground shift deployment.
  - 🟡 **MODERATE RISK**: Flagged for supervisor refresher.
  - 🔴 **HIGH RISK**: Immediate intervention required.

### 4. Tamper-Proof QR Certification & Validator Portal
- Generates official, digitally signed certificates (`DGMS-JH-2026-AR-XXXXXX`) with SHA cryptographic signatures.
- Vector QR Code containing certificate hash and verification payload.
- In-app **DGMS Public Validator**: Auditors and safety officers can look up any certificate ID to inspect the tamper-proof ledger.

### 5. Multilingual Voice Guidance
- Full localized interface and voice-over narration in:
  - **English (EN)**
  - **हिन्दी (Hindi)**
  - **ᱥᱟᱱᱛᱟᱲᱤ (Santali in Ol Chiki script ᱚᱞ ᱪᱤᱠᱤ)**
- Spoken step-by-step instructions via Web Speech Synthesis, eliminating literacy barriers.

### 6. Underground Offline-First Architecture & Pithead Mesh Sync
- Full simulation and assessment functionality operate completely offline with encrypted local storage.
- **Pithead Mesh Sync Simulator**: Simulates peer-to-peer data relay over Bluetooth / Local Wi-Fi when crew members return from underground shafts to the surface terminal.

### 7. Supervisor & Safety Officer Command Center
- **<30-Day Orientation Watchlist**: Direct radar targeting new recruits to curb fatal incidents.
- Multi-site regional aggregation across **BCCL Dhanbad (Coal)**, **Bokaro Steel (SAIL)**, **Koderma Mica Quarry**, and **Tata Steel Jamshedpur**.
- **One-Click DGMS Form V Compliance Export**: Official periodic audit return report ready for printing or PDF export.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & UI** | Tailwind CSS v4, Lucide Icons |
| **AR & 3D Engine** | Three.js WebGL Engine, WebXR / Camera Feed Overlay |
| **Audio & Speech** | Web Speech Synthesis API, Web Audio API Sound Synthesizer |
| **Data & Storage** | Offline LocalStorage / IndexedDB / Encrypted SQLite architecture |
| **Certification** | Vector SVG QR Code Engine, Cryptographic hash signing |
| **Target Hardware** | Mid-range Android smartphones (₹10,000–₹12,000) & Desktop browsers |

---

## 🏃 Getting Started & Running Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/anishravi-13/araksha-sih2026-ar-safety.git
cd araksha-sih2026-ar-safety

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📜 Statutory & Legal Foundations
- **Mines Act, 1952** (Sections 22A & 23 - Safety & Accident Reporting)
- **Factories Act, 1948** (Chapter IV - Safety Provisions)
- **Occupational Safety, Health and Working Conditions Code, 2020 (OSH Code)**
- **DGMS Circulars & Statistics** (Directorate General of Mines Safety)
