# ARAKSHA (सुरक्षा / ᱟᱨᱚᱠᱥᱷᱟ)
### AR-Based Vocational Training Simulator for Industrial Safety & Competency Certification

**Smart India Hackathon (SIH 2026)**  
**Problem Statement ID:** `SIH26041`  
**Problem Statement Title:** AR-Based Vocational Training Simulator for Industrial Safety in Jharkhand's Mining & Manufacturing Sector  
**Theme:** Smart Education | **Category:** Software  
**Team ID:** 139519 | **Team Name:** Techwolves  

---

## 📌 Executive Summary

Mining and manufacturing in Jharkhand face severe safety challenges:
- **48 fatal mine accidents** were recorded by the **Directorate General of Mines Safety (DGMS)** in Jharkhand during 2022–23.
- A disproportionately high share of casualties involved **new recruits under 30 days of orientation**.
- Traditional training relies on printed manuals and lecture-based instruction with **<20% retention**.
- Testing lacks realistic behavioral evaluation, and paper safety certificates are easily forged.
- Underground mining drifts suffer from **zero cellular connectivity** and low-literacy workforces speaking regional languages (Hindi, Santali).

**ARAKSHA** solves these challenges by delivering an interactive, lightweight Augmented Reality (AR) simulator running smoothly on **₹10,000–₹12,000 budget Android smartphones** (no expensive VR headsets required), paired with an automated **AI Pre-Entry PPE Inspection Gate**, **Reaction-Based Scoring**, **Offline-First SQLite Mesh Sync**, and **Tamper-Proof DGMS QR Certification** compliant with the **Mines Act 1952**, **Factories Act 1948**, and the **Occupational Safety, Health and Working Conditions (OSH) Code, 2020**.

---

## 🚀 Key Modules & Innovation (Mapped to PPT Specifications)

### 1. Mandatory AI PPE Inspection Gate (Pre-Simulation)
- **Computer Vision Gatekeeper**: Real-time camera or simulated AI verification for safety gear:
  - Mining Hard Hat / Helmet (96% confidence)
  - High-Visibility Reflective Vest (94% confidence)
  - Dust Respirator / Mask (92% confidence)
  - Heavy-Duty Work Gloves (89% confidence)
- **Geo-Tagged Session Attendance**: Automatically captures GPS coordinates (`23.7957° N, 86.4304° E` - BCCL Dhanbad Pit 3), worker ID, and timestamp to eliminate fraudulent sign-in sheets.

### 2. Realistic Industrial AR Scenarios
1. **Underground Methane (CH₄) Gas Leak & SCSR Protocol**:
   - 3D mine tunnel environment with timber cribbing, mine cart tracks, and dynamic gas particle cloud.
   - Real-time Multi-Gas Telemetry HUD (CH₄ % LEL, CO ppm, O₂ %).
   - 5-step SOP sequence: Detector calibration $\rightarrow$ Spark isolation $\rightarrow$ Auxiliary fan start $\rightarrow$ Self-Rescuer (SCSR) donning $\rightarrow$ Green laser escape trail evacuation.
2. **Machinery Safety & Lockout-Tagout (LOTO)**:
   - 3D heavy industrial conveyor belt and crusher machinery.
   - 5-point procedure: Team notification $\rightarrow$ 415V breaker disconnection $\rightarrow$ Safety padlock $\rightarrow$ DGMS Danger Tag $\rightarrow$ Zero-Energy test button.
3. **Factory Floor Fire & PASS Extinguisher Evacuation**:
   - Raging electrical fire simulation with universal **PASS** technique (Pull, Aim, Squeeze, Sweep).
   - Dynamic fire particle dampening and emergency exit route navigation.

### 3. Reaction-Based Scoring & Behavioral Risk Profiling
- **Real-Time Stopwatch**: Measures response reaction time (ms) against target benchmarks ($<8.0$s).
- **Sequence Validation**: Detects order-of-operation errors and penalizes procedural violations.
- **Safety Comprehension Index**: Projects 1-week retention from $<20\%$ manual baseline to $>80\%$.
- **Behavioral Risk Categorization**:
  - 🟢 **LOW RISK**: Qualified for underground shift deployment.
  - 🟡 **MODERATE RISK**: Flagged for supervisor refresher.
  - 🔴 **HIGH RISK**: Immediate intervention (crucial for $<30$-day recruits).

### 4. Tamper-Proof QR Certification & Public Verification Portal
- Generates official, digitally signed certificates (`DGMS-JH-2026-AR-XXXXXX`) with SHA cryptographic signatures.
- Vector QR Code containing certificate hash and verification payload.
- In-app **DGMS Public Validator**: Auditors and safety officers can look up any certificate ID to inspect the tamper-proof ledger.

### 5. Multilingual Voice Guidance (Low-Literacy miners)
- Full localized interface and voice-over narration in:
  - **English (EN)**
  - **हिन्दी (Hindi)**
  - **ᱥᱟᱱᱛᱟᱲᱤ (Santali in Ol Chiki script ᱚᱞ ᱪᱤᱠᱤ)**
- Spoken step-by-step instructions via Web Speech Synthesis, eliminating reading barriers.

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
- **DGMS Circulars & Statistics** (Jharkhand Fatal Mine Accident Statistics 2022–2023)

---

## 👥 Team Techwolves (Team ID: 139519)
- **Smart India Hackathon (SIH 2026)**
- Built with dedication for worker safety in Jharkhand's mining and manufacturing hubs.
