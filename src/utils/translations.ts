export interface LocalizedDictionary {
  appName: string;
  tagline: string;
  platformBadge: string;
  sectorTagline: string;
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
  quickPassButton: string;
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
    tagline: "AR Industrial Safety & Competency Certification Platform",
    platformBadge: "Enterprise Safety Edition",
    sectorTagline: "Vocational Safety Simulator for Mining, Steel & Manufacturing",
    selectLanguage: "Language / भाषा / ᱯᱟᱹᱨᱥᱤ",
    traineeMode: "3D AR Simulator",
    supervisorConsole: "Supervisor Console",
    dgmsAudit: "DGMS Audit & Reports",
    certificateValidator: "Verify Certificate",
    offlineStatus: "Underground Ready (Offline)",
    meshSync: "Pithead Mesh Sync",
    ppeCheckTitle: "Pre-Entry Safety Gear Inspection",
    ppeCheckSubtitle: "Verify your safety equipment before entering the virtual mine or industrial plant",
    ppeHelmet: "Safety Hard Hat",
    ppeVest: "Hi-Vis Reflective Vest",
    ppeMask: "Dust Respirator / Mask",
    ppeGloves: "Heavy-Duty Work Gloves",
    ppeScanPrompt: "Align yourself in front of the camera for safety inspection",
    ppeVerified: "PPE Compliance Verified! Geo-tagged attendance recorded.",
    startARSimulation: "Start 3D AR Simulator",
    quickPassButton: "Instant Quick-Pass & Start 3D Test",
    scenariosTitle: "Interactive Safety Scenarios",
    scenarioGasTitle: "Underground Methane Gas Leak & Evacuation",
    scenarioGasDesc: "Detect toxic gas, activate auxiliary ventilation, equip self-rescuer mask, and follow laser escape route.",
    scenarioLotoTitle: "Machinery Lockout-Tagout (LOTO)",
    scenarioLotoDesc: "Isolate 415V breaker, apply brass padlock, hang danger tag, and verify zero electrical energy.",
    scenarioFireTitle: "Factory Floor Fire & PASS Extinguisher",
    scenarioFireDesc: "Extinguish electrical fire using Pull-Aim-Squeeze-Sweep technique and evacuate safely.",
    enterAR: "Enter Simulator",
    reactionTimer: "Reaction Stopwatch",
    hazardAlert: "EMERGENCY HAZARD TRIGGERED",
    stepSequence: "Step-by-Step Safety Procedure",
    voiceGuidance: "Audio Voice Guidance Active",
    instantResult: "Competency Test Passed",
    comprehensionScore: "Safety Retention Score",
    riskRating: "Behavioral Risk Category",
    newRecruitAlert: "High-Priority Safety Watch (<30 Days Recruit)",
    generateQRCertificate: "View & Download QR Certificate",
    verifyCertificate: "Verify Certificate Authenticity",
    dgmsExport: "Download DGMS Form V Compliance Report",
    meshSyncSuccess: "Offline underground records synced successfully to Surface Hub via local mesh!",
    passText: "SIMULATION TEST PASSED",
    failText: "TEST FAILED - RETRAINING REQUIRED",
    lowRisk: "LOW RISK (Safe for Underground Shift)",
    moderateRisk: "MODERATE RISK (Supervisor Refresher Required)",
    highRisk: "HIGH RISK (Mandatory Re-test)",
    cameraARFeed: "Camera AR View",
    simulation3DFeed: "Interactive 3D Engine",
    voicePromptGas: "Warning! Methane levels rising. Check gas detector, isolate power, and equip your self-rescuer mask.",
    voicePromptLoto: "Attention! Turn off breaker, attach padlock, and hang danger tag before maintenance.",
    voicePromptFire: "Emergency! Remember the PASS rule: Pull pin, Aim nozzle, Squeeze handle, Sweep across base.",
    emergencyEvacuate: "Follow the green illuminated AR floor path to the emergency intake airway shaft immediately!"
  },
  hi: {
    appName: "अरक्षा (ARAKSHA)",
    tagline: "एआर औद्योगिक सुरक्षा एवं योग्यता प्रमाणन प्लेटफॉर्म",
    platformBadge: "उद्यम सुरक्षा संस्करण",
    sectorTagline: "खनन, इस्पात एवं विनिर्माण हेतु व्यावसायिक सुरक्षा सिम्युलेटर",
    selectLanguage: "भाषा चुनें",
    traineeMode: "3D एआर सिम्युलेटर",
    supervisorConsole: "पर्यवेक्षक कंसोल",
    dgmsAudit: "डीजीएमएस ऑडिट एवं रिपोर्ट",
    certificateValidator: "प्रमाणपत्र सत्यापन",
    offlineStatus: "ऑफ़लाइन मोड (भूमिगत खदान हेतु तैयार)",
    meshSync: "पिटहेड मेश सिंक",
    ppeCheckTitle: "प्रवेश-पूर्व सुरक्षा उपकरण जांच",
    ppeCheckSubtitle: "वर्चुअल खदान या संयंत्र में प्रवेश से पहले सुरक्षा उपकरण जांच आवश्यक",
    ppeHelmet: "सुरक्षा हेलमेट",
    ppeVest: "उच्च-दृश्यता जैकेट",
    ppeMask: "धूल मास्क / श्वासयंत्र",
    ppeGloves: "सुरक्षा दस्ताने",
    ppeScanPrompt: "कैमरे के सामने सीधे खड़े होकर सुरक्षा उपकरण दिखाएं",
    ppeVerified: "सुरक्षा उपकरण 100% सत्यापित! जियो-टैग उपस्थिति दर्ज हुई।",
    startARSimulation: "3D एआर सिम्युलेटर शुरू करें",
    quickPassButton: "तुरंत पास करें और 3D टेस्ट शुरू करें",
    scenariosTitle: "इंटरैक्टिव सुरक्षा परिदृश्य",
    scenarioGasTitle: "भूमिगत मीथेन गैस रिसाव एवं निकास",
    scenarioGasDesc: "विषाक्त गैस पहचानें, वेंटिलेशन चालू करें, स्व-बचाव मास्क पहनें और लेज़र निकास मार्ग का पालन करें।",
    scenarioLotoTitle: "मशीनरी लॉकआउट-टैगआउट (LOTO)",
    scenarioLotoDesc: "415V ब्रेकर बंद करें, पैडलॉक लगाएं, डेंजर टैग लगाएं और शून्य ऊर्जा सत्यापित करें।",
    scenarioFireTitle: "संयंत्र आग एवं पास अग्निशामक",
    scenarioFireDesc: "पुल-एम-स्क्वीज़-स्वीप (PASS) नियम से आग बुझाएं और सुरक्षित बाहर निकलें।",
    enterAR: "सिम्युलेटर में जाएं",
    reactionTimer: "प्रतिक्रिया समय",
    hazardAlert: "आपातकालीन खतरा उत्पन्न हुआ",
    stepSequence: "अनिवार्य सुरक्षा चरण",
    voiceGuidance: "ध्वनि मार्गदर्शन सक्रिय",
    instantResult: "योग्यता परीक्षा उत्तीर्ण",
    comprehensionScore: "सुरक्षा अवधारण स्कोर",
    riskRating: "व्यवहारिक जोखिम श्रेणी",
    newRecruitAlert: "नए कर्मी निगरानी (<30 दिन) - उच्च प्राथमिकता",
    generateQRCertificate: "क्यूआर प्रमाणपत्र देखें एवं डाउनलोड करें",
    verifyCertificate: "प्रमाणपत्र की प्रामाणिकता जांचें",
    dgmsExport: "डीजीएमएस फॉर्म V रिपोर्ट डाउनलोड करें",
    meshSyncSuccess: "भूमिगत खदान का डेटा मेश वाई-फाई से सफलतापूर्वक सिंक हुआ!",
    passText: "सिम्युलेशन परीक्षा उत्तीर्ण",
    failText: "अनुत्तीर्ण - पुनः प्रशिक्षण आवश्यक",
    lowRisk: "कम जोखिम (खदान कार्य हेतु सुरक्षित)",
    moderateRisk: "मध्यम जोखिम (पर्यवेक्षक मार्गदर्शन आवश्यक)",
    highRisk: "उच्च जोखिम (पुनः परीक्षा अनिवार्य)",
    cameraARFeed: "कैमरा एआर दृश्य",
    simulation3DFeed: "इंटरैक्टिव 3डी इंजन दृश्य",
    voicePromptGas: "सावधान! मीथेन गैस बढ़ रही है। गैस मीटर देखें, बिजली बंद करें और स्व-बचाव मास्क लगाएं।",
    voicePromptLoto: "ध्यान दें! ब्रेकर बंद करें, ताला लगाएं और चेतावनी टैग लगाएं।",
    voicePromptFire: "आपातकाल! पास नियम अपनाएं: पिन खींचें, आधार पर निशाना साधें, हैंडल दबाएं और घुमाएं।",
    emergencyEvacuate: "तुरंत हरी लेज़र लाइट के निकास मार्ग से सुरक्षित बाहर निकलें!"
  },
  sat: {
    appName: "ᱟᱨᱚᱠᱥᱷᱟ (ARAKSHA)",
    tagline: "ᱮ.ᱟᱨ. ᱠᱷᱟᱫᱟᱱ ᱟᱨ ᱠᱟᱹᱨᱜᱟᱲ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱮᱪᱮᱫ",
    platformBadge: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱤᱥᱴᱚᱢ",
    sectorTagline: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱠᱷᱟᱫᱟᱱ ᱞᱟᱹᱜᱤᱫ ᱮ.ᱟᱨ. ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱤᱢᱩᱞᱮᱴᱚᱨ",
    selectLanguage: "ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ",
    traineeMode: "᱓D ᱮ.ᱟᱨ. ᱥᱮᱪᱮᱫ",
    supervisorConsole: "ᱥᱩᱯᱚᱨᱵᱷᱟᱭᱡᱚᱨ ᱠᱚᱱᱥᱳᱞ",
    dgmsAudit: "DGMS ᱨᱤᱯᱳᱨᱴ ᱟᱨ ᱚᱰᱤᱴ",
    certificateValidator: "ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱯᱩᱥᱴᱟᱹᱣ",
    offlineStatus: "ᱚᱯᱷᱞᱟᱭᱤᱱ ᱢᱳᱰ (ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ)",
    meshSync: "ᱯᱤᱴᱦᱮᱰ ᱢᱮᱥ ᱥᱤᱝᱠ",
    ppeCheckTitle: "ᱠᱟᱹᱢᱤ ᱢᱟᱬᱟᱝ ᱨᱮ PPE ᱪᱮᱠ",
    ppeCheckSubtitle: "ᱠᱷᱟᱫᱟᱱ ᱵᱚᱞᱚᱱ ᱢᱟᱬᱟᱝ ᱦᱮᱞᱢᱮᱴ, ᱜᱞᱳᱵᱷᱥ, ᱵᱷᱮᱥᱴ ᱪᱮᱠ ᱢᱮ",
    ppeHelmet: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱦᱮᱞᱢᱮᱴ",
    ppeVest: "ᱦᱟᱭ-ᱵᱷᱤᱥ ᱵᱷᱮᱥᱴ",
    ppeMask: "ᱫᱷᱩᱲᱤ ᱢᱟᱥᱠ",
    ppeGloves: "ᱛᱤ ᱜᱞᱳᱵᱷᱥ",
    ppeScanPrompt: "ᱠᱮᱢᱮᱨᱟ ᱥᱟᱢᱟᱝ ᱨᱮ ᱛᱤᱸᱜᱩᱱ ᱢᱮ",
    ppeVerified: "PPE ᱴᱷᱤᱠ ᱜᱮᱭᱟ! ᱦᱟᱡᱤᱨᱤ ᱚᱞ ᱮᱱᱟ᱾",
    startARSimulation: "᱓D ᱥᱤᱢᱩᱞᱮᱴᱚᱨ ᱮᱦᱚᱵ",
    quickPassButton: "ᱞᱚᱜᱚᱱ ᱯᱟᱥ & ᱓D ᱴᱮᱥᱴ ᱮᱦᱚᱵ",
    scenariosTitle: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱮ.ᱟᱨ. ᱥᱮᱪᱮᱫ ᱠᱚ",
    scenarioGasTitle: "ᱠᱷᱟᱫᱟᱱ ᱜᱮᱥ ᱞᱤᱠ (Gas Leak)",
    scenarioGasDesc: "ᱵᱤᱥ ᱜᱮᱥ ᱪᱤᱱᱦᱟᱹᱣ, ᱯᱷᱮᱱ ᱪᱟᱹᱞᱩ, ᱥᱮᱞᱯᱷ-ᱨᱮᱥᱠᱤᱭᱩ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜ ᱢᱮ᱾",
    scenarioLotoTitle: "ᱢᱮᱥᱤᱱ ᱞᱚᱠ-ᱟᱣᱩᱴ ᱴᱮᱜ-ᱟᱣᱩᱴ (LOTO)",
    scenarioLotoDesc: "ᱵᱤᱡᱽᱞᱤ ᱥᱩᱭᱤᱪ ᱵᱚᱸᱫᱽ, ᱛᱟᱞᱟ ᱞᱟᱜᱟᱣ ᱟᱨ ᱰᱮᱸᱡᱚᱨ ᱴᱮᱜ ᱟᱠᱟ ᱢᱮ᱾",
    scenarioFireTitle: "ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱟᱨ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠ",
    scenarioFireDesc: "PASS ᱱᱤᱭᱚᱢ ᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱯᱮ ᱟᱨ ᱦᱟᱹᱨᱭᱟᱹᱲ ᱰᱟᱦᱟᱨ ᱛᱮ ᱵᱟᱦᱨᱮ ᱪᱟᱞᱟᱜ ᱯᱮ᱾",
    enterAR: "ᱮ.ᱟᱨ. ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ",
    reactionTimer: "ᱨᱤᱭᱮᱠᱥᱚᱱ ᱚᱠᱛᱚ",
    hazardAlert: "ᱵᱚᱛᱚᱨᱟᱱ ᱜᱷᱚᱴᱚᱱ ᱦᱩᱭ ᱮᱱᱟ!",
    stepSequence: "ᱫᱷᱟᱯ-ᱫᱷᱟᱯ ᱠᱟᱹᱢᱤ",
    voiceGuidance: "ᱟᱲᱟᱝ ᱛᱮ ᱞᱟᱹᱭ ᱟᱠᱟᱱᱟ",
    instantResult: "ᱥᱮᱪᱮᱫ ᱨᱮᱡᱟᱞᱴ",
    comprehensionScore: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱠᱳᱨ",
    riskRating: "ᱵᱮᱵᱷᱟᱨ ᱨᱤᱥᱠ ᱛᱷᱚᱠ",
    newRecruitAlert: "ᱱᱟᱣᱟ ᱠᱟᱹᱢᱤᱭᱟᱹ (<᱓᱐ ᱢᱟᱦᱟᱸ) - ᱵᱤᱥᱮᱥ ᱱᱚᱡᱚᱨ",
    generateQRCertificate: "QR ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱧᱟᱢ ᱢᱮ",
    verifyCertificate: "ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱥᱟᱹᱨᱤ ᱪᱮᱠ ᱢᱮ",
    dgmsExport: "DGMS Form V ᱨᱤᱯᱳᱨᱴ ᱰᱟᱣᱩᱱᱞᱳᱰ",
    meshSyncSuccess: "ᱠᱷᱟᱫᱟᱱ ᱰᱮᱴᱟ ᱵᱟᱦᱨᱮ ᱨᱮ ᱥᱤᱝᱠ ᱮᱱᱟ!",
    passText: "ᱯᱟᱥ ᱮᱱᱟᱢ",
    failText: "ᱯᱷᱮᱞ - ᱟᱨᱦᱚᱸ ᱥᱮᱪᱮᱫ ᱞᱟᱹᱠᱛᱤ",
    lowRisk: "ᱠᱚᱢ ᱵᱚᱛᱚᱨ (ᱠᱟᱹᱢᱤ ᱞᱟᱹᱜᱤᱫ ᱴᱷᱤᱠ ᱜᱮᱭᱟ)",
    moderateRisk: "ᱛᱟᱞᱟᱢᱟᱞᱟ ᱵᱚᱛᱚᱨ",
    highRisk: "ᱰᱷᱮᱨ ᱵᱚᱛᱚᱨ",
    cameraARFeed: "ᱮ.ᱟᱨ. ᱠᱮᱢᱮᱨᱟ ᱧᱮᱞ",
    simulation3DFeed: "᱓D ᱤᱧᱡᱤᱱ ᱧᱮᱞ",
    voicePromptGas: "ᱦᱩᱥᱤᱭᱟᱹᱨ! ᱢᱤᱛᱷᱮᱱ ᱜᱮᱥ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ᱾ ᱞᱚᱜᱚᱱ ᱵᱤᱡᱽᱞᱤ ᱵᱚᱸᱫᱽ ᱢᱮ᱾",
    voicePromptLoto: "ᱫᱷᱮᱭᱟᱱ ᱢᱮ! ᱠᱚᱱᱵᱷᱮᱭᱚᱨ ᱴᱷᱤᱠ ᱢᱟᱬᱟᱝ ᱨᱮ ᱛᱟᱞᱟ ᱞᱟᱜᱟᱣ ᱢᱮ᱾",
    voicePromptFire: "ᱟᱯᱟᱛᱠᱟᱞ! ᱥᱮᱸᱜᱮᱞ ᱞᱟᱜᱟᱣ ᱮᱱᱟ᱾ PASS ᱱᱤᱭᱚᱢ ᱛᱮ ᱤᱬᱤᱡ ᱢᱮ᱾",
    emergencyEvacuate: "ᱦᱟᱹᱨᱭᱟᱹᱲ ᱞᱟᱭᱤᱴ ᱦᱚᱨ ᱛᱮ ᱞᱚᱜᱚᱱ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱯᱮ!"
  }
};
