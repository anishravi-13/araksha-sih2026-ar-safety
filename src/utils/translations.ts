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
    tagline: "Industrial Safety & Vocational Competency System",
    platformBadge: "Enterprise Safety Console",
    sectorTagline: "Field Training Simulator for Mines, Steel Plants & Heavy Manufacturing",
    selectLanguage: "Language",
    traineeMode: "Field Simulator",
    supervisorConsole: "Crew Operations",
    dgmsAudit: "Statutory Compliance",
    certificateValidator: "Verify Certificate",
    offlineStatus: "Underground Link (Offline)",
    meshSync: "Surface Mesh Sync",
    ppeCheckTitle: "Shift Safety Clearance & Gear Check",
    ppeCheckSubtitle: "Verify required personal protective equipment before entering industrial simulation",
    ppeHelmet: "Mining Hard Hat (Class E)",
    ppeVest: "High-Visibility Reflective Vest",
    ppeMask: "Particulate Dust Respirator",
    ppeGloves: "Heavy-Duty Work Gloves",
    ppeScanPrompt: "Position yourself facing the sensor kiosk to complete equipment verification",
    ppeVerified: "All protective gear confirmed. Shift attendance timestamped and recorded.",
    startARSimulation: "Launch Field Simulation",
    quickPassButton: "Direct Clearance & Launch Simulator",
    scenariosTitle: "Standard Operating Procedure Modules",
    scenarioGasTitle: "Underground Gas Detection & Evacuation",
    scenarioGasDesc: "Verify gas concentration on detector, isolate electrical sparks, engage fan, and evacuate along marked drift.",
    scenarioLotoTitle: "Machinery Isolation & Lockout-Tagout",
    scenarioLotoDesc: "Isolate main 415V breaker, apply physical brass padlock, hang danger tag, and verify zero stored energy.",
    scenarioFireTitle: "Workshop Electrical Fire & Extinguisher Protocol",
    scenarioFireDesc: "Deploy fire extinguisher using universal PASS method and guide crew through designated emergency exit.",
    enterAR: "Enter Simulator",
    reactionTimer: "Response Timer",
    hazardAlert: "FIELD HAZARD IDENTIFIED",
    stepSequence: "Mandatory Operational Procedure",
    voiceGuidance: "Spoken Instructions",
    instantResult: "Field Assessment Result",
    comprehensionScore: "Safety Retention Rating",
    riskRating: "Behavioral Risk Rating",
    newRecruitAlert: "Orientation Watch (<30 Days Service)",
    generateQRCertificate: "View Official Digital Certificate",
    verifyCertificate: "Validate Certificate Record",
    dgmsExport: "Export Statutory Form V Return",
    meshSyncSuccess: "Offline field records synced to surface operations hub.",
    passText: "SIMULATION PASSED",
    failText: "RETRAINING MANDATED",
    lowRisk: "LOW RISK (Cleared for Active Duty)",
    moderateRisk: "MODERATE RISK (Supervisor Review Required)",
    highRisk: "HIGH RISK (Mandatory Retraining)",
    cameraARFeed: "Live Camera View",
    simulation3DFeed: "Interactive 3D View",
    voicePromptGas: "Alert: Methane concentration rising. Check gas detector, cut power sources, and equip self-rescuer.",
    voicePromptLoto: "Caution: Turn off main breaker, secure safety padlock, and hang danger tag before maintenance.",
    voicePromptFire: "Emergency: Follow the PASS protocol. Pull pin, aim at base of fire, squeeze handle, and sweep.",
    emergencyEvacuate: "Follow green floor guidance markers immediately to intake airway shaft."
  },
  hi: {
    appName: "ARAKSHA (सुरक्षा)",
    tagline: "औद्योगिक सुरक्षा एवं व्यावसायिक योग्यता प्रणाली",
    platformBadge: "उद्यम सुरक्षा कंसोल",
    sectorTagline: "खनन, इस्पात एवं विनिर्माण हेतु व्यावसायिक सुरक्षा सिम्युलेटर",
    selectLanguage: "भाषा",
    traineeMode: "फील्ड सिम्युलेटर",
    supervisorConsole: "क्रू ऑपरेशंस",
    dgmsAudit: "वैधानिक अनुपालन",
    certificateValidator: "प्रमाणपत्र सत्यापन",
    offlineStatus: "भूमिगत लिंक (ऑफ़लाइन)",
    meshSync: "सरफेस मेश सिंक",
    ppeCheckTitle: "शिफ्ट सुरक्षा उपकरण निरीक्षण",
    ppeCheckSubtitle: "सिम्युलेटर में जाने से पहले आवश्यक सुरक्षा उपकरण की जांच करें",
    ppeHelmet: "सुरक्षा हार्ड हैट",
    ppeVest: "उच्च-दृश्यता रिफ्लेक्टिव जैकेट",
    ppeMask: "धूल श्वासयंत्र / मास्क",
    ppeGloves: "सुरक्षा कार्य दस्ताने",
    ppeScanPrompt: "सुरक्षा जांच पूरी करने के लिए कैमरे के सामने सीधे खड़े हों",
    ppeVerified: "सभी सुरक्षा उपकरण सत्यापित। शिफ्ट उपस्थिति दर्ज हुई।",
    startARSimulation: "फील्ड सिम्युलेटर शुरू करें",
    quickPassButton: "सीधे क्लीयरेंस दें एवं सिम्युलेटर शुरू करें",
    scenariosTitle: "मानक संचालन प्रक्रिया मॉड्यूल",
    scenarioGasTitle: "भूमिगत गैस रिसाव एवं निकास प्रक्रिया",
    scenarioGasDesc: "गैस स्तर जांचें, बिजली बंद करें, वेंटिलेशन चलाएं और चिन्हित मार्ग से बाहर निकलें।",
    scenarioLotoTitle: "मशीनरी लॉकआउट-टैगआउट (LOTO)",
    scenarioLotoDesc: "मुख्य 415V ब्रेकर बंद करें, पैडलॉक लगाएं, डेंजर टैग लगाएं और शून्य ऊर्जा जांचें।",
    scenarioFireTitle: "कार्यशाला आग एवं अग्निशामक प्रक्रिया",
    scenarioFireDesc: "PASS विधि द्वारा आग बुझाएं और आपातकालीन निकास का पालन करें।",
    enterAR: "सिम्युलेटर में जाएं",
    reactionTimer: "प्रतिक्रिया समय",
    hazardAlert: "खतरा उत्पन्न हुआ",
    stepSequence: "अनिवार्य संचालन चरण",
    voiceGuidance: "ध्वनि निर्देश",
    instantResult: "मूल्यांकन परिणाम",
    comprehensionScore: "सुरक्षा अवधारण स्कोर",
    riskRating: "व्यवहारिक जोखिम रेटिंग",
    newRecruitAlert: "नए कर्मी निगरानी (<30 दिन)",
    generateQRCertificate: "आधिकारिक डिजिटल प्रमाणपत्र देखें",
    verifyCertificate: "प्रमाणपत्र की सत्यता जांचें",
    dgmsExport: "वैधानिक फॉर्म V रिपोर्ट डाउनलोड करें",
    meshSyncSuccess: "भूमिगत रिकॉर्ड सरफेस हब में सफलतापूर्वक सिंक हुए।",
    passText: "सिम्युलेशन उत्तीर्ण",
    failText: "पुनः प्रशिक्षण अनिवार्य",
    lowRisk: "कम जोखिम (कार्य हेतु स्वीकृत)",
    moderateRisk: "मध्यम जोखिम (पर्यवेक्षक मार्गदर्शन आवश्यक)",
    highRisk: "उच्च जोखिम (पुनः प्रशिक्षण आवश्यक)",
    cameraARFeed: "कैमरा दृश्य",
    simulation3DFeed: "इंटरैक्टिव 3डी दृश्य",
    voicePromptGas: "सावधान: गैस स्तर बढ़ रहा है। डिटेक्टर जांचें, बिजली बंद करें और मास्क लगाएं।",
    voicePromptLoto: "ध्यान दें: ब्रेकर बंद करें, ताला लगाएं और चेतावनी टैग लगाएं।",
    voicePromptFire: "आपातकाल: पास नियम अपनाएं। पिन खींचें, आधार पर निशाना साधें, हैंडल दबाएं और घुमाएं।",
    emergencyEvacuate: "हरे निकास मार्ग का पालन करते हुए तुरंत बाहर निकलें।"
  },
  sat: {
    appName: "ARAKSHA (ᱟᱨᱚᱠᱥᱷᱟ)",
    tagline: "ᱠᱷᱟᱫᱟᱱ ᱟᱨ ᱠᱟᱹᱨᱜᱟᱲ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱤᱥᱴᱚᱢ",
    platformBadge: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱠᱚᱱᱥᱳᱞ",
    sectorTagline: "ᱠᱷᱟᱫᱟᱱ ᱞᱟᱹᱜᱤᱫ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱤᱢᱩᱞᱮᱴᱚᱨ",
    selectLanguage: "ᱯᱟᱹᱨᱥᱤ",
    traineeMode: "ᱥᱤᱢᱩᱞᱮᱴᱚᱨ",
    supervisorConsole: "ᱠᱟᱹᱢᱤᱭᱟᱹ ᱠᱚᱱᱥᱳᱞ",
    dgmsAudit: "ᱚᱰᱤᱴ & ᱨᱤᱯᱳᱨᱴ",
    certificateValidator: "ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱯᱩᱥᱴᱟᱹᱣ",
    offlineStatus: "ᱚᱯᱷᱞᱟᱭᱤᱱ (ᱠᱷᱟᱫᱟᱱ ᱵᱷᱤᱛᱨᱤ)",
    meshSync: "ᱯᱤᱴᱦᱮᱰ ᱥᱤᱝᱠ",
    ppeCheckTitle: "ᱠᱟᱹᱢᱤ ᱢᱟᱬᱟᱝ ᱨᱮ ᱨᱩᱠᱷᱤᱭᱟᱹ ᱪᱮᱠ",
    ppeCheckSubtitle: "ᱥᱤᱢᱩᱞᱮᱴᱚᱨ ᱵᱚᱞᱚᱱ ᱢᱟᱬᱟᱝ ᱥᱟᱢᱟᱱ ᱪᱮᱠ ᱢᱮ",
    ppeHelmet: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱦᱮᱞᱢᱮᱴ",
    ppeVest: "ᱦᱟᱭ-ᱵᱷᱤᱥ ᱵᱷᱮᱥᱴ",
    ppeMask: "ᱫᱷᱩᱲᱤ ᱢᱟᱥᱠ",
    ppeGloves: "ᱛᱤ ᱜᱞᱳᱵᱷᱥ",
    ppeScanPrompt: "ᱠᱮᱢᱮᱨᱟ ᱥᱟᱢᱟᱝ ᱨᱮ ᱛᱤᱸᱜᱩᱱ ᱢᱮ",
    ppeVerified: "ᱡᱚᱛᱚ ᱥᱟᱢᱟᱱ ᱴᱷᱤᱠ ᱜᱮᱭᱟ! ᱦᱟᱡᱤᱨᱤ ᱚᱞ ᱮᱱᱟ᱾",
    startARSimulation: "ᱥᱤᱢᱩᱞᱮᱴᱚᱨ ᱮᱦᱚᱵ",
    quickPassButton: "ᱞᱚᱜᱚᱱ ᱠᱞᱤᱭᱟᱨ & ᱥᱤᱢᱩᱞᱮᱴᱚᱨ ᱮᱦᱚᱵ",
    scenariosTitle: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱢᱚᱰᱩᱞ ᱠᱚ",
    scenarioGasTitle: "ᱠᱷᱟᱫᱟᱱ ᱜᱮᱥ ᱞᱤᱠ (Gas Leak)",
    scenarioGasDesc: "ᱜᱮᱥ ᱪᱤᱱᱦᱟᱹᱣ, ᱯᱷᱮᱱ ᱪᱟᱹᱞᱩ, ᱥᱮᱞᱯᱷ-ᱨᱮᱥᱠᱤᱭᱩ ᱢᱟᱥᱠ ᱦᱚᱨᱚᱜ ᱢᱮ᱾",
    scenarioLotoTitle: "ᱢᱮᱥᱤᱱ ᱞᱚᱠ-ᱟᱣᱩᱴ ᱴᱮᱜ-ᱟᱣᱩᱴ (LOTO)",
    scenarioLotoDesc: "ᱵᱤᱡᱽᱞᱤ ᱥᱩᱭᱤᱪ ᱵᱚᱸᱫᱽ, ᱛᱟᱞᱟ ᱞᱟᱜᱟᱣ ᱟᱨ ᱰᱮᱸᱡᱚᱨ ᱴᱮᱜ ᱟᱠᱟ ᱢᱮ᱾",
    scenarioFireTitle: "ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱟᱨ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠ",
    scenarioFireDesc: "PASS ᱱᱤᱭᱚᱢ ᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱯᱮ ᱟᱨ ᱵᱟᱦᱨᱮ ᱪᱟᱞᱟᱜ ᱯᱮ᱾",
    enterAR: "ᱥᱤᱢᱩᱞᱮᱴᱚᱨ ᱨᱮ ᱵᱚᱞᱚᱱ ᱢᱮ",
    reactionTimer: "ᱨᱤᱭᱮᱠᱥᱚᱱ ᱚᱠᱛᱚ",
    hazardAlert: "ᱵᱚᱛᱚᱨᱟᱱ ᱜᱷᱚᱴᱚᱱ!",
    stepSequence: "ᱫᱷᱟᱯ-ᱫᱷᱟᱯ ᱠᱟᱹᱢᱤ",
    voiceGuidance: "ᱟᱲᱟᱝ ᱛᱮ ᱞᱟᱹᱭ",
    instantResult: "ᱥᱮᱪᱮᱫ ᱨᱮᱡᱟᱞᱴ",
    comprehensionScore: "ᱨᱩᱠᱷᱤᱭᱟᱹ ᱥᱠᱳᱨ",
    riskRating: "ᱵᱮᱵᱷᱟᱨ ᱨᱤᱥᱠ ᱛᱷᱚᱠ",
    newRecruitAlert: "ᱱᱟᱣᱟ ᱠᱟᱹᱢᱤᱭᱟᱹ (<᱓᱐ ᱢᱟᱦᱟᱸ)",
    generateQRCertificate: "QR ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱧᱟᱢ ᱢᱮ",
    verifyCertificate: "ᱥᱟᱨᱴᱤᱯᱷᱤᱠᱮᱴ ᱥᱟᱹᱨᱤ ᱪᱮᱠ ᱢᱮ",
    dgmsExport: "Form V ᱨᱤᱯᱳᱨᱴ ᱰᱟᱣᱩᱱᱞᱳᱰ",
    meshSyncSuccess: "ᱰᱮᱴᱟ ᱵᱟᱦᱨᱮ ᱨᱮ ᱥᱤᱝᱠ ᱮᱱᱟ!",
    passText: "ᱯᱟᱥ ᱮᱱᱟᱢ",
    failText: "ᱟᱨᱦᱚᱸ ᱥᱮᱪᱮᱫ ᱞᱟᱹᱠᱛᱤ",
    lowRisk: "ᱠᱚᱢ ᱵᱚᱛᱚᱨ (ᱠᱟᱹᱢᱤ ᱞᱟᱹᱜᱤᱫ ᱴᱷᱤᱠ)",
    moderateRisk: "ᱛᱟᱞᱟᱢᱟᱞᱟ ᱵᱚᱛᱚᱨ",
    highRisk: "ᱰᱷᱮᱨ ᱵᱚᱛᱚᱨ (ᱫᱚᱦᱲᱟ ᱥᱮᱪᱮᱫ)",
    cameraARFeed: "ᱠᱮᱢᱮᱨᱟ ᱧᱮᱞ",
    simulation3DFeed: "᱓D ᱤᱧᱡᱤᱱ ᱧᱮᱞ",
    voicePromptGas: "ᱦᱩᱥᱤᱭᱟᱹᱨ: ᱜᱮᱥ ᱚᱰᱚᱠᱚᱜ ᱠᱟᱱᱟ᱾ ᱵᱤᱡᱽᱞᱤ ᱵᱚᱸᱫᱽ ᱢᱮ᱾",
    voicePromptLoto: "ᱫᱷᱮᱭᱟᱱ ᱢᱮ: ᱛᱟᱞᱟ ᱟᱨ ᱴᱮᱜ ᱞᱟᱜᱟᱣ ᱢᱮ᱾",
    voicePromptFire: "ᱟᱯᱟᱛᱠᱟᱞ: PASS ᱱᱤᱭᱚᱢ ᱛᱮ ᱥᱮᱸᱜᱮᱞ ᱤᱬᱤᱡ ᱢᱮ᱾",
    emergencyEvacuate: "ᱦᱟᱹᱨᱭᱟᱹᱲ ᱦᱚᱨ ᱛᱮ ᱞᱚᱜᱚᱱ ᱵᱟᱦᱨᱮ ᱚᱰᱚᱠᱚᱜ ᱯᱮ!"
  }
};
