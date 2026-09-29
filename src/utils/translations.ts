export interface LocalizedDictionary {
  appName: string;
  tagline: string;
  sihTitle: string;
  problemStatement: string;
  team: string;
  selectLanguage: string;
  traineeMode: string;
  supervisorConsole: string;
  dgmsAudit: string;
  certificateValidator: string;
  offlineStatus: string;
  meshSync: string;
  ppeCheckTitle: string;
  ppeCheckSubtitle: string;
  ppeHelmet: string;
  ppeVest: string;
  ppeMask: string;
  ppeGloves: string;
  ppeScanPrompt: string;
  ppeVerified: string;
  startARSimulation: string;
  scenariosTitle: string;
  scenarioGasTitle: string;
  scenarioGasDesc: string;
  scenarioLotoTitle: string;
  scenarioLotoDesc: string;
  scenarioFireTitle: string;
  scenarioFireDesc: string;
  enterAR: string;
  reactionTimer: string;
  hazardAlert: string;
  stepSequence: string;
  voiceGuidance: string;
  instantResult: string;
  comprehensionScore: string;
  riskRating: string;
  newRecruitAlert: string;
  generateQRCertificate: string;
  verifyCertificate: string;
  dgmsExport: string;
  meshSyncSuccess: string;
  passText: string;
  failText: string;
  lowRisk: string;
  moderateRisk: string;
  highRisk: string;
  cameraARFeed: string;
  simulation3DFeed: string;
  voicePromptGas: string;
  voicePromptLoto: string;
  voicePromptFire: string;
  emergencyEvacuate: string;
}

export const translations: Record<'en' | 'hi' | 'sat', LocalizedDictionary> = {
  en: {
    appName: "ARAKSHA",
    tagline: "AR-Based Industrial Safety & Competency Certification Platform",
    sihTitle: "Smart India Hackathon 2026 | Problem ID: SIH26041",
    problemStatement: "AR Vocational Training Simulator for Jharkhand Mining & Manufacturing",
    team: "Techwolves (Team ID: 139519)",
    selectLanguage: "Language / भाषा / ᱯᱟᱹᱨᱥᱤ",
    traineeMode: "Trainee AR Simulator",
    supervisorConsole: "Supervisor Console",
    dgmsAudit: "DGMS Audit & Reports",
    certificateValidator: "Verify Certificate",
    offlineStatus: "Offline Mode (Underground Ready)",
    meshSync: "Pithead Mesh Sync",
    ppeCheckTitle: "Mandatory Pre-Entry AI PPE Inspection",
    ppeCheckSubtitle: "Camera verification required before underground or factory floor simulator unlocks",
    ppeHelmet: "Safety Hard Hat",
    ppeVest: "Hi-Vis Reflective Vest",
    ppeMask: "Dust Respirator / Mask",
    ppeGloves: "Heavy-Duty Work Gloves",
    ppeScanPrompt: "Align your upper body inside the frame for computer vision verification",
    ppeVerified: "PPE Compliance 100% Verified. Geo-tagged attendance logged.",
    startARSimulation: "Launch AR Scenario",
    scenariosTitle: "Industrial Safety AR Scenarios",
    scenarioGasTitle: "Underground Methane Gas Leak & SCSR Protocol",
    scenarioGasDesc: "Detect toxic gas, trigger ventilation duct, don self-rescuer mask, follow laser escape path.",
    scenarioLotoTitle: "Conveyor Belt & Crusher LOTO (Lockout-Tagout)",
    scenarioLotoDesc: "Isolate 415V electrical circuit, apply safety padlock, attach danger tag, verify zero energy.",
    scenarioFireTitle: "Factory Floor Fire & PASS Extinguisher Evacuation",
    scenarioFireDesc: "Extinguish raging electrical fire using Pull-Aim-Squeeze-Sweep technique & follow evacuation route.",
    enterAR: "Enter AR Training",
    reactionTimer: "Reaction Time",
    hazardAlert: "CRITICAL HAZARD TRIGGERED",
    stepSequence: "Mandatory Action Sequence",
    voiceGuidance: "Spoken Voice Guidance Active",
    instantResult: "Instant Competency Assessment",
    comprehensionScore: "Safety Retention Score",
    riskRating: "Behavioral Risk Category",
    newRecruitAlert: "Orientation Watch (<30 Days Recruit) - High Priority Monitoring",
    generateQRCertificate: "View & Download Tamper-Proof QR Certificate",
    verifyCertificate: "Verify Certificate Authenticity",
    dgmsExport: "Export Official DGMS Form V Compliance Report",
    meshSyncSuccess: "Offline underground logs successfully synced to Surface Hub via Mesh Wi-Fi/Bluetooth!",
    passText: "COMPETENCY PASSED",
    failText: "ASSESSMENT FAILED - RE-TRAINING REQUIRED",
    lowRisk: "LOW RISK (Safe for Underground Shift)",
    moderateRisk: "MODERATE RISK (Mandatory Supervisor Refresher)",
    highRisk: "HIGH RISK (Immediate Intervention Required)",
    cameraARFeed: "Live AR Camera View",
    simulation3DFeed: "Interactive 3D Engine",
    voicePromptGas: "Warning! Methane levels exceeding threshold. Check multi-gas meter, isolate power, and prepare SCSR self-rescuer.",
    voicePromptLoto: "Attention worker! Always lock out and tag the breaker panel before inspecting the conveyor belt.",
    voicePromptFire: "Emergency! Electrical fire detected. Remember PASS: Pull the pin, Aim at base, Squeeze lever, Sweep across.",
    emergencyEvacuate: "Follow the illuminated green AR markers to safe intake airway shaft immediately!"
  },
  hi: {
    appName: "अरक्षा (ARAKSHA)",
    tagline: "एआर-आधारित औद्योगिक सुरक्षा एवं योग्यता प्रमाणन प्लेटफॉर्म",
    sihTitle: "स्मार्ट इंडिया हैकथॉन 2026 | समस्या आईडी: SIH26041",
    problemStatement: "झारखंड के खनन एवं विनिर्माण क्षेत्र हेतु संवर्धित वास्तविकता (AR) सुरक्षा सिम्युलेटर",
    team: "टेकवोल्व्स (टीम आईडी: 139519)",
    selectLanguage: "भाषा चुनें",
    traineeMode: "प्रशिक्षु एआर सिम्युलेटर",
    supervisorConsole: "पर्यवेक्षक कंसोल",
    dgmsAudit: "डीजीएमएस ऑडिट एवं रिपोर्ट",
    certificateValidator: "प्रमाणपत्र सत्यापन",
    offlineStatus: "ऑफ़लाइन मोड (भूमिगत खदान हेतु तैयार)",
    meshSync: "पिटहेड मेश सिंक",
    ppeCheckTitle: "प्रशिक्षण-पूर्व अनिवार्य एआई पीपीई जांच",
    ppeCheckSubtitle: "खदान या संयंत्र सिम्युलेटर शुरू करने से पहले कैमरा द्वारा सुरक्षा उपकरण सत्यापन आवश्यक",
    ppeHelmet: "सुरक्षा हेलमेट",
    ppeVest: "उच्च-दृश्यता परावर्तक जैकेट",
    ppeMask: "धूल मास्क / श्वासयंत्र",
    ppeGloves: "सुरक्षा दस्ताने",
    ppeScanPrompt: "कंप्यूटर विज़न सत्यापन हेतु कैमरे के सामने सीधे खड़े हों",
    ppeVerified: "पीपीई अनुपालन 100% सत्यापित। जियो-टैग उपस्थिति दर्ज हुई।",
    startARSimulation: "एआर परिदृश्य प्रारंभ करें",
    scenariosTitle: "औद्योगिक सुरक्षा एआर परिदृश्य",
    scenarioGasTitle: "भूमिगत मीथेन गैस रिसाव एवं एससीएचआर प्रोटोकॉल",
    scenarioGasDesc: "विषाक्त गैस पहचानें, वेंटिलेशन चालू करें, स्व-बचाव मास्क पहनें और लेज़र निकास मार्ग का पालन करें।",
    scenarioLotoTitle: "कन्वेयर बेल्ट एवं क्रशर लोटो (लॉकआउट-टैगआउट)",
    scenarioLotoDesc: "415V सर्किट अलग करें, सुरक्षा पैडलॉक लगाएं, डेंजर टैग लगाएं और शून्य ऊर्जा सत्यापित करें।",
    scenarioFireTitle: "संयंत्र आग एवं पास अग्निशामक निकास एआर",
    scenarioFireDesc: "पुल-एम-स्क्वीज़-स्वीप (PASS) तकनीक से आग बुझाएं और आपातकालीन निकास का पालन करें।",
    enterAR: "एआर प्रशिक्षण शुरू करें",
    reactionTimer: "प्रतिक्रिया समय",
    hazardAlert: "गंभीर खतरा उत्पन्न हुआ",
    stepSequence: "अनिवार्य सुरक्षा चरण",
    voiceGuidance: "ध्वनि मार्गदर्शन सक्रिय (पढ़ने की आवश्यकता नहीं)",
    instantResult: "तत्काल योग्यता मूल्यांकन",
    comprehensionScore: "सुरक्षा अवधारण स्कोर",
    riskRating: "व्यवहारिक जोखिम श्रेणी",
    newRecruitAlert: "नए कर्मी निगरानी (<30 दिन) - उच्च प्राथमिकता सतर्कता",
    generateQRCertificate: "क्यूआर प्रमाणपत्र देखें एवं डाउनलोड करें",
    verifyCertificate: "प्रमाणपत्र की प्रामाणिकता जांचें",
    dgmsExport: "आधिकारिक डीजीएमएस फॉर्म V रिपोर्ट डाउनलोड करें",
    meshSyncSuccess: "भूमिगत खदान का डेटा मेश वाई-फाई/ब्लूटूथ से सफलतापूर्वक सिंक हुआ!",
    passText: "योग्यता उत्तीर्ण",
    failText: "अनुत्तीर्ण - पुनः प्रशिक्षण आवश्यक",
    lowRisk: "कम जोखिम (खदान कार्य हेतु सुरक्षित)",
    moderateRisk: "मध्यम जोखिम (पर्यवेक्षक मार्गदर्शन आवश्यक)",
    highRisk: "उच्च जोखिम (तुरंत अतिरिक्त प्रशिक्षण अनिवार्य)",
    cameraARFeed: "लाइव एआर कैमरा दृश्य",
    simulation3DFeed: "इंटरैक्टिव 3डी इंजन दृश्य",
    voicePromptGas: "सावधान! मीथेन गैस स्तर बढ़ रहा है। तुरंत गैस मीटर देखें, बिजली बंद करें और स्व-बचाव मास्क लगाएं।",
    voicePromptLoto: "ध्यान दें! कन्वेयर की मरम्मत से पहले मुख्य ब्रेकर पर ताला और चेतावनी टैग लगाना अनिवार्य है।",
    voicePromptFire: "आपातकाल! आग लगी है। पास नियम अपनाएं: पिन खींचें, आधार पर निशाना साधें, हैंडल दबाएं और घुमाएं।",
    emergencyEvacuate: "तुरंत हरी लेज़र लाइट के निकास मार्ग की ओर सुरक्षित बाहर निकलें!"
  },
  sat: {
    appName: "ᱟᱨᱚᱠᱥᱷᱟ (ARAKSHA)",
    tagline: "ᱮ.ᱟᱨ. ᱦᱚᱛᱮᱛᱮ ᱠᱷᱟᱫᱟᱱ ᱟᱨ ᱠᱟᱹᱨᱜᱟᱲ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱮᱪᱮᱫ",
    sihTitle: "ᱥᱢᱟᱨᱴ ᱤᱱᱰᱤᱭᱟ ᱦᱮᱠᱟᱛᱷᱚᱱ ᱒᱐᱒᱖ | ID: SIH26041",
    problemStatement: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱠᱷᱟᱫᱟᱱ ᱞᱟᱹᱜᱤᱫ ᱮ.ᱟᱨ. ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱤᱢᱩᱞᱮᱴᱚᱨ",
    team: "ᱴᱮᱠᱣᱩᱞᱵᱷᱥ (Techwolves - 139519)",
    selectLanguage: "ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ",
    traineeMode: "ᱠᱟᱹᱢᱤᱭᱟᱹ ᱮ.ᱟᱨ. ᱥᱮᱪᱮᱫ (Trainee)",
    supervisorConsole: "ᱥᱩᱯᱚᱨᱵᱷᱟᱭᱡᱚᱨ ᱠᱚᱱᱥᱳᱞ",
    dgmsAudit: "DGMS ᱨᱤᱯᱳᱨᱴ ᱟᱨ ᱚᱰᱤᱴ",
    certificateValidator: "ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱯᱩᱥᱴᱟᱹᱣ",
    offlineStatus: "ᱚᱯᱷᱞᱟᱭᱤᱱ ᱢᱳᱰ (ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ)",
    meshSync: "ᱯᱤᱴᱦᱮᱰ ᱢᱮᱥ ᱥᱤᱝᱠ",
    ppeCheckTitle: "ᱠᱟᱹᱢᱤ ᱢᱟᱬᱟᱝ ᱨᱮ PPE ᱪᱮᱠ (AI Camera)",
    ppeCheckSubtitle: "ᱠᱷᱟᱫᱟᱱ ᱵᱚᱞᱚᱱ ᱢᱟᱬᱟᱝ ᱦᱮᱞᱢᱮᱴ, ᱜᱞᱳᱵᱷᱥ, ᱵᱷᱮᱥᱴ ᱪᱮᱠ ᱞᱟᱹᱠᱛᱤᱭᱟᱱ",
    ppeHelmet: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱦᱮᱞᱢᱮᱴ",
    ppeVest: "ᱦᱟᱭ-ᱵᱷᱤᱥ ᱵᱷᱮᱥᱴ",
    ppeMask: "ᱫᱷᱩᱲᱤ ᱢᱟᱥᱠ",
    ppeGloves: "ᱛᱤ ᱜᱞᱳᱵᱷᱥ",
    ppeScanPrompt: "ᱠᱮᱢᱮᱨᱟ ᱥᱟᱢᱟᱝ ᱨᱮ ᱛᱤᱸᱜᱩᱱ ᱯᱮ",
    ppeVerified: "PPE ᱴᱷᱤᱠ ᱜᱮᱭᱟ! ᱦᱟᱡᱤᱨᱤ ᱚᱞ ᱮᱱᱟ᱾",
    startARSimulation: "ᱮ.ᱟᱨ. ᱥᱮᱪᱮᱫ ᱮᱦᱚᱵ",
    scenariosTitle: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱮ.ᱟᱨ. ᱥᱮᱪᱮᱫ ᱠᱚ",
    scenarioGasTitle: "ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱜᱮᱥ ᱞᱤᱠ (Gas Leak Protocol)",
    scenarioGasDesc: "ᱵᱤᱥ ᱜᱮᱥ ᱪᱤᱱᱦᱟᱹᱣ, ᱯᱷᱮᱱ ᱪᱟᱹᱞᱩ, ᱥᱮᱞᱯᱷ-ᱨᱮᱥᱠᱤᱭᱩ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜ ᱟᱨ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱦᱚᱨ᱾",
    scenarioLotoTitle: "ᱢᱮᱥᱤᱱ ᱞᱚᱠ-ᱟᱣᱩᱴ ᱴᱮᱜ-ᱟᱣᱩᱴ (LOTO)",
    scenarioLotoDesc: "ᱵᱤᱡᱽᱞᱤ ᱥᱩᱭᱤᱪ ᱵᱚᱸᱫᱽ, ᱛᱟᱞᱟ ᱞᱟᱜᱟᱣ ᱟᱨ ᱰᱮᱸᱡᱚᱨ ᱴᱮᱜ ᱟᱠᱟ ᱢᱮ᱾",
    scenarioFireTitle: "ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱟᱨ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠ",
    scenarioFireDesc: "PASS ᱱᱤᱭᱚᱢ ᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱯᱮ ᱟᱨ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱰᱟᱦᱟᱨ ᱛᱮ ᱵᱟᱦᱨᱮ ᱪᱟᱞᱟᱜ ᱯᱮ᱾",
    enterAR: "ᱮ.ᱟᱨ. ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ",
    reactionTimer: "ᱨᱤᱭᱮᱠᱥᱚᱱ ᱚᱠᱛᱚ",
    hazardAlert: "ᱵᱚᱛᱚᱨᱟᱱ ᱜᱷᱚᱴᱚᱱ ᱦᱩᱭ ᱮᱱᱟ!",
    stepSequence: "ᱫᱷᱟᱯ-ᱫᱷᱟᱯ ᱠᱟᱹᱢᱤ",
    voiceGuidance: "ᱟᱲᱟᱝ ᱛᱮ ᱞᱟᱹᱭ ᱟᱠᱟᱱᱟ (ᱯᱟᱲᱦᱟᱣ ᱵᱟᱝ ᱞᱟᱹᱠᱛᱤᱭᱟ)",
    instantResult: "ᱥᱮᱪᱮᱫ ᱨᱮᱡᱟᱞᱴ",
    comprehensionScore: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱠᱳᱨ",
    riskRating: "ᱵᱮᱵᱷᱟᱨ ᱨᱤᱥᱠ ᱛᱷᱚᱠ",
    newRecruitAlert: "ᱱᱟᱣᱟ ᱠᱟᱹᱢᱤᱭᱟᱹ (<᱓᱐ ᱢᱟᱦᱟᱸ) - ᱵᱤᱥᱮᱥ ᱱᱚᱡᱚᱨ",
    generateQRCertificate: "QR ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱧᱟᱢ ᱢᱮ",
    verifyCertificate: "ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱥᱟᱹᱨᱤ ᱪᱮᱠ ᱢᱮ",
    dgmsExport: "DGMS Form V ᱨᱤᱯᱳᱨᱴ ᱰᱟᱣᱩᱱᱞᱳᱰ",
    meshSyncSuccess: "ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ ᱠᱷᱚᱱ ᱰᱮᱴᱟ ᱵᱟᱦᱨᱮ ᱯᱤᱴᱦᱮᱰ ᱨᱮ ᱥᱤᱝᱠ ᱮᱱᱟ!",
    passText: "ᱯᱟᱥ ᱮᱱᱟᱢ (合格)",
    failText: "ᱯᱷᱮᱞ - ᱟᱨᱦᱚᱸ ᱥᱮᱪᱮᱫ ᱞᱟᱹᱠᱛᱤ",
    lowRisk: "ᱠᱚᱢ ᱵᱚᱛᱚᱨ (ᱠᱷᱟᱫᱟᱱ ᱠᱟᱹᱢᱤ ᱞᱟᱹᱜᱤᱫ ᱴᱷᱤᱠ ᱜᱮᱭᱟ)",
    moderateRisk: "ᱛᱟᱞᱟᱢᱟᱞᱟ ᱵᱚᱛᱚᱨ (ᱥᱩᱯᱚᱨᱵᱷᱟᱭᱡᱚᱨ ᱜᱚᱲᱚ ᱞᱟᱹᱠᱛᱤ)",
    highRisk: "ᱰᱷᱮᱨ ᱵᱚᱛᱚᱨ (ᱱᱟᱣᱟ ᱥᱮᱪᱮᱫ ᱞᱟᱹᱠᱛᱤ)",
    cameraARFeed: "ᱮ.ᱟᱨ. ᱠᱮᱢᱮᱨᱟ ᱧᱮᱞ",
    simulation3DFeed: "᱓D ᱤᱧᱡᱤᱱ ᱧᱮᱞ",
    voicePromptGas: "ᱦᱩᱥᱤᱭᱟᱹᱨ! ᱢᱤᱛᱷᱮᱱ ᱜᱮᱥ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ᱾ ᱞᱚᱜᱚᱱ ᱵᱤᱡᱽᱞᱤ ᱵᱚᱸᱫᱽ ᱟᱨ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜ ᱢᱮ᱾",
    voicePromptLoto: "ᱫᱷᱮᱭᱟᱱ ᱢᱮ! ᱠᱚᱱᱵᱷᱮᱭᱚᱨ ᱴᱷᱤᱠ ᱢᱟᱬᱟᱝ ᱨᱮ ᱛᱟᱞᱟ ᱟᱨ ᱴᱮᱜ ᱞᱟᱜᱟᱣ ᱢᱮ᱾",
    voicePromptFire: "ᱟᱯᱟᱛᱠᱟᱞ! ᱥᱮᱸᱜᱮᱞ ᱞᱟᱜᱟᱣ ᱮᱱᱟ᱾ PASS ᱱᱤᱭᱚᱢ ᱛᱮ ᱤᱬᱤᱡ ᱢᱮ ᱟᱨ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱢᱮ᱾",
    emergencyEvacuate: "ᱦᱟᱹᱨᱭᱟᱹᱲ ᱞᱟᱭᱤᱴ ᱦᱚᱨ ᱛᱮ ᱞᱚᱜᱚᱱ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱯᱮ!"
  }
};
