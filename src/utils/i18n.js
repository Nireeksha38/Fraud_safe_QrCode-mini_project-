// Multilingual translations system supporting English, Kannada, Hindi, Malayalam, Tamil, Telugu

export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧", speechLang: "en-US" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳", speechLang: "kn-IN" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", speechLang: "hi-IN" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳", speechLang: "ml-IN" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳", speechLang: "ta-IN" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳", speechLang: "te-IN" },
];

export const TRANSLATIONS = {
  en: {
    appName: "FraudSafe QR",
    tagline: "Secure Payments & Voice Verification",
    welcome: "Welcome Back",
    guestUser: "User",
    login: "Login",
    register: "Register",
    phonePlaceholder: "Enter 10-digit Phone Number",
    pinPlaceholder: "Enter 4-digit PIN",
    dontHaveAccount: "Don't have an account? Register",
    alreadyHaveAccount: "Already have an account? Login",
    loginSuccess: "Logged in successfully",
    registerSuccess: "Account created successfully",
    invalidCredentials: "Invalid phone or PIN",
    fillAllFields: "Please fill all fields",
    
    // Dashboard & Tabs
    home: "Home",
    scanQR: "Scan QR",
    galleryQR: "Scan Gallery",
    transactions: "History",
    wallet: "Wallet",
    chatbot: "Chatbot",
    settings: "Settings",
    
    // Home Cards
    walletBalance: "Wallet Balance",
    addMoney: "Add Money",
    sendMoney: "Send Money",
    recentActivity: "Recent Activity",
    securityStatus: "System Security Active",
    securityDesc: "Real-time AI QR fraud analysis & voice assistance enabled",
    quickActions: "Quick Actions",
    trySampleQRs: "Try Sample Test QRs",
    trySampleDesc: "Test genuine, phishing, and high-risk QR scenarios",

    // Scanner
    alignQR: "Align QR Code within the frame",
    torch: "Flash",
    flip: "Flip",
    pickFromGallery: "Pick Image from Gallery",
    analyzingQR: "Analyzing QR Code...",
    scannedDetails: "Scanned QR Details",
    scanAnother: "Scan Another Code",
    
    // Fraud Engine Status
    statusSafe: "Safe & Verified",
    statusSafeDesc: "Valid UPI format and verified merchant identity. Safe to proceed.",
    statusFraud: "Suspicious / Fraud Alert",
    statusFraudDesc: "Potential fraud or tampering detected. Exercise extreme caution!",
    statusCaution: "Caution / Review Required",
    statusCautionDesc: "Unverified payee or missing fixed amount. Double check details.",
    
    // Review & Payment
    reviewPayment: "Review Payment",
    payingTo: "Paying To",
    merchantUPI: "Payee UPI ID",
    amount: "Amount",
    enterAmount: "Enter Amount",
    riskAssessment: "Risk Assessment",
    riskScore: "Risk Score",
    safetyFlags: "Safety Analysis",
    confirmAndPay: "Confirm & Enter PIN",
    cancel: "Cancel",
    proceedAnyway: "Proceed with Caution",
    paymentBlocked: "Payment Blocked for Safety",
    
    // PIN Modal
    enterTxnPin: "Enter 4-Digit Transaction PIN",
    pinSubtitle: "Authorized authentication required to transfer funds",
    confirmPin: "Confirm Payment",
    biometricAuth: "Unlock with Biometrics",
    incorrectPin: "Incorrect PIN! Please try again.",
    paymentSuccess: "Transaction Successful!",
    paymentFailed: "Payment Failed",
    newBalance: "Updated Balance",
    viewReceipt: "View Receipt",
    close: "Close",

    // Wallet Screen
    myWallet: "Digital Wallet",
    cardHolder: "CARD HOLDER",
    quickTopUp: "Quick Top Up",
    walletTopUpSuccess: "Money added to wallet successfully!",
    insufficientFunds: "Insufficient wallet balance",

    // History Screen
    allTransactions: "All Transactions",
    filterAll: "All",
    filterSafe: "Safe",
    filterFraud: "Fraud Alerts",
    noTransactions: "No transactions recorded yet",
    searchPlaceholder: "Search by Merchant or UPI ID...",

    // Settings Screen
    appPreferences: "Preferences & Accessibility",
    changeLoginPin: "Change Login PIN",
    changeTxnPin: "Change Transaction PIN",
    enableBiometrics: "Biometric Authentication",
    enableVoice: "Multilingual Voice Alerts",
    voiceSpeed: "Voice Speed",
    selectLanguage: "Select Language",
    resetData: "Reset App Data & Cache",
    aboutApp: "About FraudSafe QR",
    aboutText: "CSE Mini Project: Fraud-Safe QR Application with Multilingual Voice Assistance. Built with React Native & Expo.",

    // Chatbot Screen
    botGreeting: "Hello! I am your FraudSafe Assistant. Ask me about QR safety, fraud alerts, or wallet operations.",
    askQuestionPlaceholder: "Type your query or choose below...",
    send: "Send",
    speakReply: "Play Voice",

    // Voice Announcements
    speechSafe: "Payment of {amount} rupees to {merchant}. Transaction is safe and verified.",
    speechFraud: "Warning! Suspicious QR Code detected for {merchant}. High risk of fraud detected.",
    speechCaution: "Caution! Please verify merchant {merchant} before paying {amount} rupees.",
    speechSuccess: "Transaction of {amount} rupees to {merchant} was successful.",
    speechIncorrectPin: "Incorrect PIN entered. Transaction blocked.",
  },

  kn: {
    appName: "ಫ್ರಾಡ್‌ಸೇಫ್ QR",
    tagline: "ಸುರಕ್ಷಿತ ಪಾವತಿ ಮತ್ತು ಧ್ವನಿ ಪರಿಶೀಲನೆ",
    welcome: "ಮರಳಿ ಸ್ವಾಗತ",
    guestUser: "ಬಳಕೆದಾರ",
    login: "ಲಾಗಿನ್",
    register: "ಖಾತೆ ತೆರೆಯಿರಿ",
    phonePlaceholder: "10-ಅಂಕಿಯ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
    pinPlaceholder: "4-ಅಂಕಿಯ ಪಿನ್ ನಮೂದಿಸಿ",
    dontHaveAccount: "ಖಾತೆ ಇಲ್ಲವೇ? ನೋಂದಾಯಿಸಿ",
    alreadyHaveAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ? ಲಾಗಿನ್ ಮಾಡಿ",
    loginSuccess: "ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ",
    registerSuccess: "ಖಾತೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ",
    invalidCredentials: "ತಪ್ಪಾದ ಫೋನ್ ಅಥವಾ ಪಿನ್",
    fillAllFields: "ದಯವಿಟ್ಟು ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ",
    
    home: "ಮುಖಪುಟ",
    scanQR: "QR ಸ್ಕ್ಯಾನ್",
    galleryQR: "ಗ್ಯಾಲರಿ ಸ್ಕ್ಯಾನ್",
    transactions: "ಇತಿಹಾಸ",
    wallet: "ವಾಲೆಟ್",
    chatbot: "ಚಾಟ್‌ಬಾಟ್",
    settings: "ಸೆಟ್ಟಿಂಗ್ಸ್",
    
    walletBalance: "ವಾಲೆಟ್ ಬ್ಯಾಲೆನ್ಸ್",
    addMoney: "ಹಣ ಸೇರಿಸಿ",
    sendMoney: "ಹಣ ಕಳುಹಿಸಿ",
    recentActivity: "ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು",
    securityStatus: "ಭದ್ರತಾ ವ್ಯವಸ್ಥೆ ಸಕ್ರಿಯವಾಗಿದೆ",
    securityDesc: "ನೈಜ-ಸಮಯದ AI QR ವಂಚನೆ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಧ್ವನಿ ಬೆಂಬಲ ಸಕ್ರಿಯವಾಗಿದೆ",
    quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
    trySampleQRs: "ಮಾದರಿ QR ಕೋಡ್‌ಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ",
    trySampleDesc: "ಅಧಿಕೃತ, ನಕಲಿ ಮತ್ತು ವಂಚನೆಯ QR ಸನ್ನಿವೇಶಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ",

    alignQR: "QR ಕೋಡ್ ಅನ್ನು ಚೌಕಟ್ಟಿನ ಒಳಗೆ ಇರಿಸಿ",
    torch: "ಫ್ಲ್ಯಾಶ್",
    flip: "ಕ್ಯಾಮೆರಾ ಬದಲಿಸಿ",
    pickFromGallery: "ಗ್ಯಾಲರಿಯಿಂದ ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ",
    analyzingQR: "QR ಕೋಡ್ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    scannedDetails: "ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ QR ವಿವರಗಳು",
    scanAnother: "ಮತ್ತೊಂದು ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    
    statusSafe: "ಸುರಕ್ಷಿತ ಮತ್ತು ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    statusSafeDesc: "ಮಾನ್ಯವಾದ UPI ಫಾರ್ಮ್ಯಾಟ್ ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ವ್ಯಾಪಾರಿ. ಪಾವತಿಗೆ ಸುರಕ್ಷಿತ.",
    statusFraud: "ಸಂಶಯಾಸ್ಪದ / ವಂಚನೆಯ ಎಚ್ಚರಿಕೆ",
    statusFraudDesc: "ವಂಚನೆ ಅಥವಾ ಬದಲಾವಣೆ ಪತ್ತೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಅತ್ಯಂತ ಎಚ್ಚರಿಕೆಯಿಂದಿರಿ!",
    statusCaution: "ಎಚ್ಚರಿಕೆ / ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ",
    statusCautionDesc: "ದೃಢೀಕರಿಸದ ಸ್ವೀಕೃತಿದಾರ ಅಥವಾ ಅನಿಶ್ಚಿತ ಮೊತ್ತ. ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    
    reviewPayment: "ಪಾವತಿ ಪರಿಶೀಲಿಸಿ",
    payingTo: "ಸ್ವೀಕೃತಿದಾರರು",
    merchantUPI: "ವ್ಯಾಪಾರಿ UPI ID",
    amount: "ಮೊತ್ತ",
    enterAmount: "ಮೊತ್ತ ನಮೂದಿಸಿ",
    riskAssessment: "ಅಪಾಯದ ಮೌಲ್ಯಮಾಪನ",
    riskScore: "ಅಪಾಯದ ಅಂಕ",
    safetyFlags: "ಭದ್ರತಾ ವಿಶ್ಲೇಷಣೆ",
    confirmAndPay: "ಖಚಿತಪಡಿಸಿ & ಪಿನ್ ನಮೂದಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    proceedAnyway: "ಎಚ್ಚರಿಕೆಯೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
    paymentBlocked: "ಸುರಕ್ಷತೆಗಾಗಿ ಪಾವತಿಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ",
    
    enterTxnPin: "4-ಅಂಕಿಯ ವಹಿವಾಟು ಪಿನ್ ನಮೂದಿಸಿ",
    pinSubtitle: "ಹಣ ವರ್ಗಾವಣೆ ಮಾಡಲು ಅಧಿಕೃತ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ",
    confirmPin: "ಪಾವತಿ ದೃಢೀಕರಿಸಿ",
    biometricAuth: "ಬಯೋಮೆಟ್ರಿಕ್ ಮೂಲಕ ಅನ್‌ಲಾಕ್ ಮಾಡಿ",
    incorrectPin: "ತಪ್ಪಾದ ಪಿನ್! ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    paymentSuccess: "ವಹಿವಾಟು ಯಶಸ್ವಿಯಾಗಿದೆ!",
    paymentFailed: "ಪಾವತಿ ವಿಫಲವಾಗಿದೆ",
    newBalance: "ನವೀಕರಿಸಿದ ಬ್ಯಾಲೆನ್ಸ್",
    viewReceipt: "ರಶೀದಿ ವೀಕ್ಷಿಸಿ",
    close: "ಮುಚ್ಚಿ",

    myWallet: "ಡಿಜಿಟಲ್ ವಾಲೆಟ್",
    cardHolder: "ಕಾರ್ಡ್ ಹೊಂದಿರುವವರು",
    quickTopUp: "ತ್ವರಿತ ರೀಚಾರ್ಜ್",
    walletTopUpSuccess: "ವಾಲೆಟ್‌ಗೆ ಹಣವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!",
    insufficientFunds: "ವಾಲೆಟ್‌ನಲ್ಲಿ ಸಾಕಷ್ಟು ಬ್ಯಾಲೆನ್ಸ್ ಇಲ್ಲ",

    allTransactions: "ಎಲ್ಲಾ ವಹಿವಾಟುಗಳು",
    filterAll: "ಎಲ್ಲವೂ",
    filterSafe: "ಸುರಕ್ಷಿತ",
    filterFraud: "ವಂಚನೆ ಎಚ್ಚರಿಕೆಗಳು",
    noTransactions: "ಇನ್ನೂ ಯಾವುದೇ ವಹಿವಾಟುಗಳಿಲ್ಲ",
    searchPlaceholder: "ವ್ಯಾಪಾರಿ ಅಥವಾ UPI ID ಮೂಲಕ ಹುಡುಕಿ...",

    appPreferences: "ಆದ್ಯತೆಗಳು ಮತ್ತು ಪ್ರವೇಶಿಸುವಿಕೆ",
    changeLoginPin: "ಲಾಗಿನ್ ಪಿನ್ ಬದಲಾಯಿಸಿ",
    changeTxnPin: "ವಹಿವಾಟು ಪಿನ್ ಬದಲಾಯಿಸಿ",
    enableBiometrics: "ಬಯೋಮೆಟ್ರಿಕ್ ದೃಢೀಕರಣ",
    enableVoice: "ಬಹುಭಾಷಾ ಧ್ವನಿ ಎಚ್ಚರಿಕೆಗಳು",
    voiceSpeed: "ಧ್ವನಿ ವೇಗ",
    selectLanguage: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    resetData: "ಡೆಮೊ ಡೇಟಾ ಮರುಹೊಂದಿಸಿ",
    aboutApp: "ಫ್ರಾಡ್‌ಸೇಫ್ QR ಬಗ್ಗೆ",
    aboutText: "CSE ಮಿನಿ ಪ್ರಾಜೆಕ್ಟ್: ಬಹುಭಾಷಾ ಧ್ವನಿ ಬೆಂಬಲದೊಂದಿಗೆ ವಂಚನೆ-ಮುಕ್ತ QR ಅಪ್ಲಿಕೇಶನ್.",

    botGreeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಫ್ರಾಡ್‌ಸೇಫ್ ಸಹಾಯಕ. QR ಸುರಕ್ಷತೆ, ವಂಚನೆ ಎಚ್ಚರಿಕೆಗಳು ಅಥವಾ ವಾಲೆಟ್ ಬಗ್ಗೆ ಕೇಳಿ.",
    askQuestionPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    send: "ಕಳುಹಿಸಿ",
    speakReply: "ಧ್ವನಿ ಪ್ಲೇ ಮಾಡಿ",

    speechSafe: "{merchant} ಗೆ {amount} ರೂಪಾಯಿ ಪಾವತಿ. ವಹಿವಾಟು ಸುರಕ್ಷಿತವಾಗಿದೆ ಮತ್ತು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.",
    speechFraud: "ಎಚ್ಚರಿಕೆ! {merchant} ಗಾಗಿ ಸಂಶಯಾಸ್ಪದ QR ಕೋಡ್ ಕಂಡುಬಂದಿದೆ. ಹೆಚ್ಚಿನ ವಂಚನೆಯ ಅಪಾಯವಿದೆ.",
    speechCaution: "ಎಚ್ಚರಿಕೆ! {amount} ರೂಪಾಯಿ ಪಾವತಿಸುವ ಮೊದಲು ವ್ಯಾಪಾರಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    speechSuccess: "{merchant} ಗೆ {amount} ರೂಪಾಯಿಗಳ ಪಾವತಿ ಯಶಸ್ವಿಯಾಗಿದೆ.",
    speechIncorrectPin: "ತಪ್ಪಾದ ಪಿನ್ ನಮೂದಿಸಲಾಗಿದೆ. ಪಾವತಿಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ.",
  },

  hi: {
    appName: "फ्रॉडसेफ QR",
    tagline: "सुरक्षित भुगतान और बहुभाषी वॉयस सत्यापन",
    welcome: "स्वागत है",
    guestUser: "उपयोगकर्ता",
    login: "लॉग इन",
    register: "खाता बनाएं",
    phonePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",
    pinPlaceholder: "4 अंकों का पिन दर्ज करें",
    dontHaveAccount: "खाता नहीं है? पंजीकरण करें",
    alreadyHaveAccount: "पहले से खाता है? लॉग इन करें",
    loginSuccess: "सफलतापूर्वक लॉग इन किया गया",
    registerSuccess: "खाता सफलतापूर्वक बनाया गया",
    invalidCredentials: "अमान्य फोन नंबर या पिन",
    fillAllFields: "कृपया सभी फ़ील्ड भरें",
    
    home: "होम",
    scanQR: "QR स्कैन",
    galleryQR: "गैलरी स्कैन",
    transactions: "इतिहास",
    wallet: "वॉलेट",
    chatbot: "चैटबॉट",
    settings: "सेटिंग्स",
    
    walletBalance: "वॉलेट बैलेंस",
    addMoney: "पैसे जोड़ें",
    sendMoney: "पैसे भेजें",
    recentActivity: "हाल की गतिविधियां",
    securityStatus: "सिस्टम सुरक्षा सक्रिय है",
    securityDesc: "रीयल-टाइम AI QR धोखाधड़ी विश्लेषण और वॉयस सहायता सक्षम है",
    quickActions: "त्वरित क्रियाएं",
    trySampleQRs: "नमूना टेस्ट QR आज़माएं",
    trySampleDesc: "असली, फ़िशिंग और जोखिम भरे QR परिदृश्यों का परीक्षण करें",

    alignQR: "QR कोड को फ्रेम के अंदर रखें",
    torch: "फ्लैश",
    flip: "कैमरा बदलें",
    pickFromGallery: "गैलरी से फोटो चुनें",
    analyzingQR: "QR कोड का विश्लेषण हो रहा है...",
    scannedDetails: "स्कैन किए गए QR विवरण",
    scanAnother: "दूसरा कोड स्कैन करें",
    
    statusSafe: "सुरक्षित और सत्यापित",
    statusSafeDesc: "मान्य UPI प्रारूप और सत्यापित मर्चेंट पहचान। भुगतान के लिए सुरक्षित।",
    statusFraud: "संदिग्ध / धोखाधड़ी चेतावनी",
    statusFraudDesc: "संभावित धोखाधड़ी या छेड़छाड़ का पता चला। अत्यधिक सावधानी बरतें!",
    statusCaution: "सावधानी / समीक्षा आवश्यक",
    statusCautionDesc: "असत्यापित प्राप्तकर्ता या अनिश्चित राशि। विवरण जांचें।",
    
    reviewPayment: "भुगतान की समीक्षा करें",
    payingTo: "प्राप्तकर्ता",
    merchantUPI: "मर्चेंट UPI ID",
    amount: "राशि",
    enterAmount: "राशि दर्ज करें",
    riskAssessment: "जोखिम मूल्यांकन",
    riskScore: "जोखिम स्कोर",
    safetyFlags: "सुरक्षा विश्लेषण",
    confirmAndPay: "पुष्टि करें और पिन दर्ज करें",
    cancel: "रद्द करें",
    proceedAnyway: "सावधानी से आगे बढ़ें",
    paymentBlocked: "सुरक्षा के लिए भुगतान रोका गया",
    
    enterTxnPin: "4-अंकीय ट्रांजेक्शन पिन दर्ज करें",
    pinSubtitle: "धन हस्तांतरित करने के लिए अधिकृत सत्यापन आवश्यक है",
    confirmPin: "भुगतान की पुष्टि करें",
    biometricAuth: "बायोमेट्रिक से अनलॉक करें",
    incorrectPin: "गलत पिन! कृपया पुन: प्रयास करें।",
    paymentSuccess: "लेन-देन सफल रहा!",
    paymentFailed: "भुगतान विफल रहा",
    newBalance: "अपडेट किया गया बैलेंस",
    viewReceipt: "रसीद देखें",
    close: "बंद करें",

    myWallet: "डिजिटल वॉलेट",
    cardHolder: "कार्ड धारक",
    quickTopUp: "त्वरित टॉप अप",
    walletTopUpSuccess: "वॉलेट में सफलतापूर्वक पैसे जोड़े गए!",
    insufficientFunds: "वॉलेट में अपर्याप्त बैलेंस",

    allTransactions: "सभी लेन-देन",
    filterAll: "सभी",
    filterSafe: "सुरक्षित",
    filterFraud: "धोखाधड़ी अलर्ट",
    noTransactions: "अभी कोई लेन-देन दर्ज नहीं है",
    searchPlaceholder: "मर्चेंट या UPI ID द्वारा खोजें...",

    appPreferences: "प्राथमिकताएं और सुगमता",
    changeLoginPin: "लॉगिन पिन बदलें",
    changeTxnPin: "ट्रांजेक्शन पिन बदलें",
    enableBiometrics: "बायोमेट्रिक प्रमाणीकरण",
    enableVoice: "बहुभाषी वॉयस अलर्ट",
    voiceSpeed: "आवाज़ की गति",
    selectLanguage: "भाषा चुनें",
    resetData: "डेमो डेटा रीसेट करें",
    aboutApp: "फ्रॉडसेफ QR के बारे में",
    aboutText: "CSE मिनी प्रोजेक्ट: बहुभाषी वॉयस इंटरेक्शन के साथ फ्रॉड-सेफ QR पेमेंट सिस्टम।",

    botGreeting: "नमस्ते! मैं आपका फ्रॉडसेफ सहायक हूँ। QR सुरक्षा, अलर्ट या वॉलेट के बारे में पूछें।",
    askQuestionPlaceholder: "अपना प्रश्न टाइप करें...",
    send: "भेजें",
    speakReply: "आवाज़ सुनें",

    speechSafe: "{merchant} को {amount} रुपये का भुगतान। लेन-देन सुरक्षित और सत्यापित है।",
    speechFraud: "चेतावनी! {merchant} के लिए संदिग्ध क्यूआर कोड मिला है। धोखाधड़ी का अत्यधिक जोखिम है।",
    speechCaution: "सावधानी! {amount} रुपये का भुगतान करने से पहले प्राप्तकर्ता को सत्यापित करें।",
    speechSuccess: "{merchant} को {amount} रुपये का भुगतान सफलतापूर्वक पूरा हुआ।",
    speechIncorrectPin: "गलत पिन दर्ज किया गया। भुगतान अवरुद्ध कर दिया गया है।",
  },

  ml: {
    appName: "ഫ്രോഡ് സേഫ് QR",
    tagline: "സുരക്ഷിത പേയ്‌മെന്റും വോയ്‌സ് സ്ഥിരീകരണവും",
    welcome: "സ്വാഗതം",
    guestUser: "ഉപയോക്താവ്",
    login: "ലോഗിൻ",
    register: "രജിസ്റ്റർ ചെയ്യുക",
    phonePlaceholder: "10 അക്ക ഫോൺ നമ്പർ നൽകുക",
    pinPlaceholder: "4 അക്ക പിൻ നൽകുക",
    dontHaveAccount: "അക്കൗണ്ട് ഇല്ലേ? രജിസ്റ്റർ ചെയ്യുക",
    alreadyHaveAccount: "നിലവിൽ അക്കൗണ്ടുണ്ടോ? ലോഗിൻ ചെയ്യുക",
    loginSuccess: "വിജയകരമായി ലോഗിൻ ചെയ്തു",
    registerSuccess: "അക്കൗണ്ട് വിജയകരമായി സൃഷ്ടിച്ചു",
    invalidCredentials: "തെറ്റായ ഫോൺ നമ്പർ അല്ലെങ്കിൽ പിൻ",
    fillAllFields: "എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക",
    
    home: "ഹോം",
    scanQR: "QR സ്കാൻ",
    galleryQR: "ഗ്യാലറി സ്കാൻ",
    transactions: "ചരിത്രം",
    wallet: "വാലറ്റ്",
    chatbot: "ചാറ്റ്ബോട്ട്",
    settings: "സെറ്റിംഗ്സ്",
    
    walletBalance: "വാലറ്റ് ബാലൻസ്",
    addMoney: "പണം ചേർക്കുക",
    sendMoney: "പണം അയക്കുക",
    recentActivity: "സമീപകാല ഇടപാടുകൾ",
    securityStatus: "സിസ്റ്റം സുരക്ഷ സജീവം",
    securityDesc: "തത്സമയ AI QR തട്ടിപ്പ് വിശകലനവും വോയ്‌സ് പിന്തുണയും പ്രവർത്തനക്ഷമമാണ്",
    quickActions: "പ്രധാന പ്രവർത്തനങ്ങൾ",
    trySampleQRs: "സാമ്പിൾ QR കോഡുകൾ പരീക്ഷിക്കുക",
    trySampleDesc: "യഥാർത്ഥ, വ്യാജ, തട്ടിപ്പ് QR സാഹചര്യങ്ങൾ പരീക്ഷിക്കുക",

    alignQR: "QR കോഡ് ഫ്രെയിമിനുള്ളിൽ വയ്ക്കുക",
    torch: "ഫ്ലാഷ്",
    flip: "ക്യാമറ മാറ്റുക",
    pickFromGallery: "ഗ്യാലറിയിൽ നിന്ന് ഫോട്ടോ തിരഞ്ഞെടുക്കുക",
    analyzingQR: "QR കോഡ് വിശകലനം ചെയ്യുന്നു...",
    scannedDetails: "സ്കാൻ ചെയ്ത വിവരങ്ങൾ",
    scanAnother: "മറ്റൊരു കോഡ് സ്കാൻ ചെയ്യുക",
    
    statusSafe: "സുരക്ഷിതവും സ്ഥിരീകരിച്ചതും",
    statusSafeDesc: "സാധുവായ UPI ഫോർമാറ്റും വ്യാപാരിയും. പണം നൽകാൻ സുരക്ഷിതം.",
    statusFraud: "സംശയാസ്പദം / തട്ടിപ്പ് മുന്നറിയിപ്പ്",
    statusFraudDesc: "തട്ടിപ്പ് അല്ലെങ്കിൽ കൃത്രിമം കണ്ടെത്തി. അതീവ ജാഗ്രത പാലിക്കുക!",
    statusCaution: "ശ്രദ്ധിക്കുക / പരിശോധന ആവശ്യം",
    statusCautionDesc: "സ്ഥിരീകരിക്കാത്ത സ്വീകർത്താവ് അല്ലെങ്കിൽ തുക. വിശദാംശങ്ങൾ പരിശോധിക്കുക.",
    
    reviewPayment: "പേയ്‌മെന്റ് പരിശോധിക്കുക",
    payingTo: "സ്വീകർത്താവ്",
    merchantUPI: "വ്യാപാരി UPI ID",
    amount: "തുക",
    enterAmount: "തുക നൽകുക",
    riskAssessment: "അപകടസാധ്യത വിലയിരുത്തൽ",
    riskScore: "റിസ്ക് സ്കോർ",
    safetyFlags: "സുരക്ഷാ വിശകലനം",
    confirmAndPay: "സ്ഥിരീകരിച്ച് പിൻ നൽകുക",
    cancel: "റദ്ദാക്കുക",
    proceedAnyway: "ശ്രദ്ധയോടെ തുടരുക",
    paymentBlocked: "സുരക്ഷ മുൻനിർത്തി പേയ്‌മെന്റ് തടഞ്ഞു",
    
    enterTxnPin: "4-അക്ക ട്രാൻസാക്ഷൻ പിൻ നൽകുക",
    pinSubtitle: "പണം കൈമാറാൻ അംഗീകൃത പരിശോധന ആവശ്യമാണ്",
    confirmPin: "പേയ്‌മെന്റ് സ്ഥിരീകരിക്കുക",
    biometricAuth: "ബയോമെട്രിക് ഉപയോഗിച്ച് അൺലോക്ക് ചെയ്യുക",
    incorrectPin: "തെറ്റായ പിൻ! വീണ്ടും ശ്രമിക്കുക.",
    paymentSuccess: "ഇടപാട് വിജയകരം!",
    paymentFailed: "പേയ്‌മെന്റ് പരാജയപ്പെട്ടു",
    newBalance: "പുതിയ ബാലൻസ്",
    viewReceipt: "രസീത് കാണുക",
    close: "അടയ്ക്കുക",

    myWallet: "ഡിജിറ്റൽ വാലറ്റ്",
    cardHolder: "കാർഡ് ഉടമ",
    quickTopUp: "ക്വിക്ക് റീചാർജ്",
    walletTopUpSuccess: "വാലറ്റിലേക്ക് പണം ചേർത്തു!",
    insufficientFunds: "വാലറ്റിൽ ആവശ്യത്തിന് തുകയില്ല",

    allTransactions: "എല്ലാ ഇടപാടുകളും",
    filterAll: "എല്ലാം",
    filterSafe: "സുരക്ഷിതം",
    filterFraud: "തട്ടിപ്പ് മുന്നറിയിപ്പുകൾ",
    noTransactions: "ഇടപാടുകൾ ഒന്നും രേഖപ്പെടുത്തിയിട്ടില്ല",
    searchPlaceholder: "വ്യാപാരി അല്ലെങ്കിൽ UPI ID തിരയുക...",

    appPreferences: "മുൻഗണനകളും പ്രവേശനക്ഷമതയും",
    changeLoginPin: "ലോഗിൻ പിൻ മാറ്റുക",
    changeTxnPin: "ട്രാൻസാക്ഷൻ പിൻ മാറ്റുക",
    enableBiometrics: "ബയോമെട്രിക് ആധികാരികത",
    enableVoice: "ബഹുഭാഷാ വോയ്‌സ് അലേർട്ടുകൾ",
    voiceSpeed: "വോയ്‌സ് സ്പീഡ്",
    selectLanguage: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    resetData: "ഡെമോ ഡാറ്റ പുനഃസജ്ജമാക്കുക",
    aboutApp: "ഫ്രോഡ് സേഫ് QR നെ കുറിച്ച്",
    aboutText: "CSE മിനി പ്രോജക്റ്റ്: തട്ടിപ്പ് രഹിത QR പേയ്‌മെന്റ് സിസ്റ്റം.",

    botGreeting: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ഫ്രോഡ് സേഫ് സഹായിയാണ്. QR സുരക്ഷയെക്കുറിച്ച് ചോദിക്കാം.",
    askQuestionPlaceholder: "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...",
    send: "അയക്കുക",
    speakReply: "വോയ്‌സ് പ്ലേ ചെയ്യുക",

    speechSafe: "{merchant}-ലേക്ക് {amount} രൂപ പേയ്‌മെന്റ്. ഇടപാട് സുരക്ഷിതമാണ്.",
    speechFraud: "മുന്നറിയിപ്പ്! {merchant} സംശയാസ്പദമായ QR കോഡ് കണ്ടെത്തി. വലിയ തട്ടിപ്പ് സാധ്യത.",
    speechCaution: "ശ്രദ്ധിക്കുക! {amount} രൂപ നൽകുന്നതിന് മുൻപ് വ്യാപാരിയെ പരിശോധിക്കുക.",
    speechSuccess: "{merchant}-ലേക്ക് {amount} രൂപയുടെ ഇടപാട് വിജയകരമായി പൂർത്തിയായി.",
    speechIncorrectPin: "തെറ്റായ പിൻ നൽകി. പേയ്‌മെന്റ് തടഞ്ഞു.",
  },

  ta: {
    appName: "FraudSafe QR",
    tagline: "பாதுகாப்பான கட்டணம் & குரல் சரிபார்ப்பு",
    welcome: "வரவேற்கிறோம்",
    guestUser: "பயனர்",
    login: "உள்நுழைக",
    register: "பதிவு செய்க",
    phonePlaceholder: "10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்",
    pinPlaceholder: "4 இலக்க பின்னை உள்ளிடவும்",
    dontHaveAccount: "கணக்கு இல்லையா? பதிவு செய்க",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக",
    loginSuccess: "வெற்றிகரமாக உள்நுழைந்தது",
    registerSuccess: "கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது",
    invalidCredentials: "தவறான தொலைபேசி எண் அல்லது பின்",
    fillAllFields: "அனைத்து விவரங்களையும் நிரப்பவும்",
    
    home: "முகப்பு",
    scanQR: "QR ஸ்கேன்",
    galleryQR: "கேலரி ஸ்கேன்",
    transactions: "வரலாறு",
    wallet: "வாலட்",
    chatbot: "சாட்போட்",
    settings: "அமைப்புகள்",
    
    walletBalance: "வாலட் இருப்பு",
    addMoney: "பணம் சேர்க்க",
    sendMoney: "பணம் அனுப்ப",
    recentActivity: "சமீபத்திய பரிவர்த்தனைகள்",
    securityStatus: "பாதுகாப்பு அமைப்பு செயலில் உள்ளது",
    securityDesc: "நிகழ்நேர AI QR மோசடி பகுப்பாய்வு மற்றும் குரல் உதவி இயக்கப்பட்டது",
    quickActions: "விரைவு செயல்கள்",
    trySampleQRs: "மாதிரி QR குறியீடுகளை சோதிக்கவும்",
    trySampleDesc: "உண்மையான, போலி மற்றும் ஆபத்தான QR காட்சிகளை சோதிக்கவும்",

    alignQR: "சட்டத்திற்குள் QR குறியீட்டை வைக்கவும்",
    torch: "ஃப்ளாஷ்",
    flip: "கேமரா மாற்றவும்",
    pickFromGallery: "கேலரியில் இருந்து படம் தேர்வு செய்க",
    analyzingQR: "QR குறியீடு பகுப்பாய்வு செய்யப்படுகிறது...",
    scannedDetails: "ஸ்கேன் செய்யப்பட்ட விவரங்கள்",
    scanAnother: "மற்றொரு குறியீட்டை ஸ்கேன் செய்க",
    
    statusSafe: "பாதுகாப்பானது & சரிபார்க்கப்பட்டது",
    statusSafeDesc: "சரியான UPI வடிவம் மற்றும் சரிபார்க்கப்பட்ட வணிகர். பணம் செலுத்த பாதுகாப்பானது.",
    statusFraud: "சந்தேகத்திற்குரியது / மோசடி எச்சரிக்கை",
    statusFraudDesc: "மோசடி அல்லது மாற்றம் கண்டறியப்பட்டது. மிகுந்த எச்சரிக்கையுடன் இருக்கவும்!",
    statusCaution: "எச்சரிக்கை / சரிபார்ப்பு தேவை",
    statusCautionDesc: "சரிபார்க்கப்படாத பெறுநர் அல்லது நிச்சயமற்ற தொகை. விவரங்களைச் சரிபார்க்கவும்.",
    
    reviewPayment: "கட்டணத்தை மதிப்பாய்வு செய்யவும்",
    payingTo: "பெறுநர்",
    merchantUPI: "வணிகர் UPI ID",
    amount: "தொகை",
    enterAmount: "தொகையை உள்ளிடவும்",
    riskAssessment: "ஆபத்து மதிப்பீடு",
    riskScore: "ஆபத்து மதிப்பெண்",
    safetyFlags: "பாதுகாப்பு பகுப்பாய்வு",
    confirmAndPay: "உறுதிசெய்து பின்னை உள்ளிடவும்",
    cancel: "ரத்துசெய்",
    proceedAnyway: "எச்சரிக்கையுடன் தொடரவும்",
    paymentBlocked: "பாதுகாப்பிற்காக கட்டணம் தடுக்கப்பட்டது",
    
    enterTxnPin: "4-இலக்க பரிவர்த்தனை பின்னை உள்ளிடவும்",
    pinSubtitle: "பணம் மாற்ற அங்கீகரிக்கப்பட்ட சரிபார்ப்பு தேவை",
    confirmPin: "கட்டணத்தை உறுதிப்படுத்தவும்",
    biometricAuth: "கைரேகை மூலம் திறக்கவும்",
    incorrectPin: "தவறான பின்! மீண்டும் முயற்சிக்கவும்.",
    paymentSuccess: "பரிவர்த்தனை வெற்றிகரமானது!",
    paymentFailed: "கட்டணம் தோல்வியடைந்தது",
    newBalance: "புதிய இருப்பு",
    viewReceipt: "ரசீதை காண்க",
    close: "மூடு",

    myWallet: "டிஜிட்டல் வாலட்",
    cardHolder: "கார்டு உரிமையாளர்",
    quickTopUp: "விரைவு டாப் அப்",
    walletTopUpSuccess: "வாலட்டில் பணம் வெற்றிகரமாக சேர்க்கப்பட்டது!",
    insufficientFunds: "வாலட்டில் போதிய பணம் இல்லை",

    allTransactions: "அனைத்து பரிவர்த்தனைகள்",
    filterAll: "அனைத்தும்",
    filterSafe: "பாதுகாப்பானது",
    filterFraud: "மோசடி எச்சரிக்கைகள்",
    noTransactions: "பரிவர்த்தனைகள் எதுவும் இல்லை",
    searchPlaceholder: "வணிகர் அல்லது UPI ID மூலம் தேடவும்...",

    appPreferences: "விருப்பத்தேர்வுகள் மற்றும் அணுகல்தன்மை",
    changeLoginPin: "உள்நுழைவு பின் மாற்றுக",
    changeTxnPin: "பரிவர்த்தனை பின் மாற்றுக",
    enableBiometrics: "பயோமெட்ரிக் அங்கீகாரம்",
    enableVoice: "பன்மொழி குரல் எச்சரிக்கைகள்",
    voiceSpeed: "குரல் வேகம்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    resetData: "டெமோ தரவை மீட்டமைக்கவும்",
    aboutApp: "FraudSafe QR பற்றி",
    aboutText: "CSE மினி திட்டம்: பன்மொழி குரல் ஆதரவுடன் கூடிய மோசடி தடுப்பு QR செயலி.",

    botGreeting: "வணக்கம்! நான் உங்கள் FraudSafe உதவியாளர். QR பாதுகாப்பு அல்லது வாலட் பற்றி கேளுங்கள்.",
    askQuestionPlaceholder: "உங்கள் கேள்வியை உள்ளிடவும்...",
    send: "அனுப்பு",
    speakReply: "குரலை இயக்கு",

    speechSafe: "{merchant}க்கு {amount} ரூபாய் கட்டணம். பரிவர்த்தனை பாதுகாப்பானது.",
    speechFraud: "எச்சரிக்கை! {merchant}க்கு சந்தேகத்திற்கிடமான QR குறியீடு கண்டறியப்பட்டது.",
    speechCaution: "எச்சரிக்கை! {amount} ரூபாய் செலுத்தும் முன் வணிகரைச் சரிபார்க்கவும்.",
    speechSuccess: "{merchant}க்கு {amount} ரூபாய் பரிவர்த்தனை வெற்றிகரமாக முடிந்தது.",
    speechIncorrectPin: "தவறான பின் உள்ளிடப்பட்டது. பரிவர்த்தனை தடுக்கப்பட்டது.",
  },

  te: {
    appName: "FraudSafe QR",
    tagline: "సురక్షిత చెల్లింపులు & వాయిస్ ధృవీకరణ",
    welcome: "స్వాగతం",
    guestUser: "వినియోగదారు",
    login: "లాగిన్",
    register: "నమోదు చేసుకోండి",
    phonePlaceholder: "10 అంకెల ఫోన్ నంబర్ నమోదు చేయండి",
    pinPlaceholder: "4 అంకెల పిన్ నమోదు చేయండి",
    dontHaveAccount: "ఖాతా లేదా? నమోదు చేసుకోండి",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి",
    loginSuccess: "విజయవంతంగా లాగిన్ అయ్యారు",
    registerSuccess: "ఖాతా విజయవంతంగా సృష్టించబడింది",
    invalidCredentials: "చెల్లని ఫోన్ లేదా పిన్",
    fillAllFields: "దయచేసి అన్ని వివరాలు పూరించండి",
    
    home: "హోమ్",
    scanQR: "QR స్కాన్",
    galleryQR: "గ్యాలరీ స్కాన్",
    transactions: "చరిత్ర",
    wallet: "వాలెట్",
    chatbot: "చాట్‌బాట్",
    settings: "సెట్టింగ్స్",
    
    walletBalance: "వాలెట్ బ్యాలెన్స్",
    addMoney: "డబ్బులు జోడించండి",
    sendMoney: "డబ్బులు పంపండి",
    recentActivity: "ఇటీవలి లావాదేవీలు",
    securityStatus: "సిస్టమ్ భద్రత సక్రియంగా ఉంది",
    securityDesc: "రియల్ టైమ్ AI QR మోసాల విశ్లేషణ & వాయిస్ సాయం ప్రారంభించబడింది",
    quickActions: "త్వరిత చర్యలు",
    trySampleQRs: "నమూనా టెస్ట్ QR కోడ్‌లను పరీక్షించండి",
    trySampleDesc: "అసలైన, ఫిషింగ్ మరియు మోసపూరిత QR లను పరీక్షించండి",

    alignQR: "QR కోడ్‌ను ఫ్రేమ్‌లో ఉంచండి",
    torch: "ఫ్లాష్",
    flip: "కెమెరా మార్చండి",
    pickFromGallery: "గ్యాలరీ నుండి ఫోటో ఎంచుకోండి",
    analyzingQR: "QR కోడ్ విశ్లేషించబడుతోంది...",
    scannedDetails: "స్కాన్ చేసిన వివరాలు",
    scanAnother: "మరొక కోడ్ స్కాన్ చేయండి",
    
    statusSafe: "సురక్షితం & ధృవీకరించబడింది",
    statusSafeDesc: "సరైన UPI ఫార్మాట్ మరియు ధృవీకరించబడిన వ్యాపారి. చెల్లింపు సురక్షితం.",
    statusFraud: "అనుమానాస్పదం / మోసం హెచ్చరిక",
    statusFraudDesc: "మోసం లేదా మార్పు కనుగొనబడింది. అత్యంత జాగ్రత్తగా ఉండండి!",
    statusCaution: "హెచ్చరిక / సమీక్ష అవసరం",
    statusCautionDesc: "ధృవీకరించబడని గ్రహీత లేదా అనిశ్చిత మొత్తం. వివరాలను పరిశీలించండి.",
    
    reviewPayment: "చెల్లింపును సమీక్షించండి",
    payingTo: "గ్రహీత",
    merchantUPI: "వ్యాపారి UPI ID",
    amount: "మొత్తం",
    enterAmount: "మొత్తం నమోదు చేయండి",
    riskAssessment: "ప్రమాద అంచనా",
    riskScore: "రిస్క్ స్కోర్",
    safetyFlags: "భద్రతా విశ్లేషణ",
    confirmAndPay: "నిర్ధారించి పిన్ నమోదు చేయండి",
    cancel: "రద్దు చేయండి",
    proceedAnyway: "జాగ్రత్తతో కొనసాగించండి",
    paymentBlocked: "భద్రత కొరకు చెల్లింపు నిరోధించబడింది",
    
    enterTxnPin: "4-అంకెల లావాదేవీ పిన్ నమోదు చేయండి",
    pinSubtitle: "డబ్బు బదిలీ చేయడానికి అధీకృత ధృవీకరణ అవసరం",
    confirmPin: "చెల్లింపును నిర్ధారించండి",
    biometricAuth: "బయోమెట్రిక్‌తో అన్‌లాక్ చేయండి",
    incorrectPin: "తప్పు పిన్! దయచేసి మళ్ళీ ప్రయత్నించండి.",
    paymentSuccess: "లావాదేవీ విజయవంతమైంది!",
    paymentFailed: "చెల్లింపు విఫలమైంది",
    newBalance: "నవీకరించబడిన బ్యాలెన్స్",
    viewReceipt: "రసీదు చూడండి",
    close: "మూసివేయి",

    myWallet: "డిజిటల్ వాలెట్",
    cardHolder: "కార్డ్ హోల్డర్",
    quickTopUp: "త్వరిత టాప్ అప్",
    walletTopUpSuccess: "వాలెట్‌కు విజయవంతంగా డబ్బు చేర్చబడింది!",
    insufficientFunds: "వాలెట్‌లో తగినంత బ్యాలెన్స్ లేదు",

    allTransactions: "అన్ని లావాదేవీలు",
    filterAll: "అన్నీ",
    filterSafe: "సురక్షితం",
    filterFraud: "మోసం హెచ్చరికలు",
    noTransactions: "ఇంకా ఎలాంటి లావాదేవీలు లేవు",
    searchPlaceholder: "వ్యాపారి లేదా UPI ID ద్వారా శోధించండి...",

    appPreferences: "ప్రాధాన్యతలు మరియు సౌలభ్యం",
    changeLoginPin: "లాగిన్ పిన్ మార్చండి",
    changeTxnPin: "లావాదేవీ పిన్ మార్చండి",
    enableBiometrics: "బయోమెట్రిక్ ప్రమాణీకరణ",
    enableVoice: "బహుభాషా వాయిస్ అలర్ట్‌లు",
    voiceSpeed: "వాయిస్ వేగం",
    selectLanguage: "భాషను ఎంచుకోండి",
    resetData: "డెమో డేటాను రీసెట్ చేయండి",
    aboutApp: "FraudSafe QR గురించి",
    aboutText: "CSE మినీ ప్రాజెక్ట్: బహుభాషా వాయిస్ మద్దతుతో మోస రహిత QR చెల్లింపుల వ్యవస్థ.",

    botGreeting: "నమస్కారం! నేను మీ FraudSafe సహాయకుడిని. QR భద్రత లేదా వాలెట్ గురించి అడగండి.",
    askQuestionPlaceholder: "మీ ప్రశ్నను టైప్ చేయండి...",
    send: "పంపు",
    speakReply: "వాయిస్ వినండి",

    speechSafe: "{merchant}కి {amount} రూపాయల చెల్లింపు. లావాదేవీ సురక్షితం.",
    speechFraud: "హెచ్చరిక! {merchant} కోసం అనుమానాస్పద QR కోడ్ గుర్తించబడింది.",
    speechCaution: "హెచ్చరిక! {amount} రూపాయలు చెల్లించే ముందు వ్యాపారిని తనిఖీ చేయండి.",
    speechSuccess: "{merchant}కి {amount} రూపాయల చెల్లింపు విజయవంతమైంది.",
    speechIncorrectPin: "తప్పు పిన్ నమోదు చేయబడింది. లావాదేవీ ఆపబడింది.",
  }
};

// Chatbot Knowledge Base per Language
export const CHATBOT_QA = {
  en: [
    {
      keywords: ["safe", "qr", "how to scan", "use app", "guide"],
      question: "How do I safely scan a QR code?",
      answer: "Tap 'Scan QR' on the home screen and point your camera at the merchant code. Our AI engine checks if the UPI format, merchant identity, and amount are safe before allowing payment."
    },
    {
      keywords: ["red", "fraud", "suspicious", "danger", "warning"],
      question: "What does a RED Alert mean?",
      answer: "A Red Alert means the QR code has suspicious characteristics—such as a tampered UPI ID, fake cashback domain, unverified merchant, or abnormally high amount (> ₹50,000). Payment is blocked for your safety."
    },
    {
      keywords: ["green", "safe", "low risk"],
      question: "What does a GREEN Alert mean?",
      answer: "A Green Alert means the QR code has verified merchant metadata and passes all 7 fraud validation checks. It is safe to proceed with your transaction."
    },
    {
      keywords: ["pin", "change pin", "reset pin", "security"],
      question: "How do I change my PIN?",
      answer: "Go to the 'Settings' tab where you can update your 4-digit Login PIN and Transaction PIN at any time. You can also toggle Biometric Fingerprint authentication."
    },
    {
      keywords: ["wallet", "balance", "add money", "funds"],
      question: "How do I check my balance and add money?",
      answer: "Open the 'Wallet' tab to view your real-time balance and virtual card. Tap '+ ₹500' or '+ ₹1000' to instantly top up simulated funds for testing."
    },
    {
      keywords: ["report", "cyber", "helpline", "scam", "lost"],
      question: "How do I report UPI fraud?",
      answer: "If you suspect financial fraud, immediately report it to National Cyber Crime helpline at 1930 or visit cybercrime.gov.in. Our app automatically flags and logs suspicious QR attempts."
    }
  ],
  kn: [
    {
      keywords: ["ಸುರಕ್ಷಿತ", "ಸ್ಕ್ಯಾನ್", "ಬಳಕೆ", "ಮಾರ್ಗದರ್ಶಿ"],
      question: "QR ಕೋಡ್ ಅನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಹೇಗೆ ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದು?",
      answer: "ಮುಖಪುಟದಲ್ಲಿ 'QR ಸ್ಕ್ಯಾನ್' ಟ್ಯಾಪ್ ಮಾಡಿ ಮತ್ತು ಕ್ಯಾಮೆರಾವನ್ನು QR ಕೋಡ್‌ಗೆ ತೋರಿಸಿ. ನಮ್ಮ AI ಎಂಜಿನ್ UPI ಫಾರ್ಮ್ಯಾಟ್, ವ್ಯಾಪಾರಿಯ ಗುರುತು ಮತ್ತು ಮೊತ್ತವನ್ನು ಸುರಕ್ಷಿತವಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸುತ್ತದೆ."
    },
    {
      keywords: ["ಕೆಂಪು", "ವಂಚನೆ", "ಸಂಶಯಾಸ್ಪದ", "ಎಚ್ಚರಿಕೆ"],
      question: "ಕೆಂಪು ಎಚ್ಚರಿಕೆಯ ಅರ್ಥವೇನು?",
      answer: "ಕೆಂಪು ಎಚ್ಚರಿಕೆಯು QR ಕೋಡ್‌ನಲ್ಲಿ ವಂಚನೆಯ ಲಕ್ಷಣಗಳಿವೆ ಎಂದರ್ಥ (ನಕಲಿ UPI ID, ಅಪಾಯಕಾರಿ ಮೊತ್ತ ಅಥವಾ ಬದಲಾಯಿಸಿದ QR). ನಿಮ್ಮ ಸುರಕ್ಷತೆಗಾಗಿ ಪಾವತಿಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ."
    },
    {
      keywords: ["ಹಸಿರು", "ಸುರಕ್ಷಿತ"],
      question: "ಹಸಿರು ಎಚ್ಚರಿಕೆಯ ಅರ್ಥವೇನು?",
      answer: "ಹಸಿರು ಬಣ್ಣವು ವ್ಯಾಪಾರಿಯ ವಿವರಗಳು ಸರಿಯಾಗಿವೆ ಮತ್ತು ಯಾವುದೇ ವಂಚನೆಯ ಲಕ್ಷಣಗಳಿಲ್ಲ ಎಂದು ಸೂಚಿಸುತ್ತದೆ. ನೀವು ಸುರಕ್ಷಿತವಾಗಿ ಪಾವತಿಸಬಹುದು."
    },
    {
      keywords: ["ಪಿನ್", "ಬದಲಾಯಿಸಿ", "ಭದ್ರತೆ"],
      question: "ನನ್ನ ಪಿನ್ ಅನ್ನು ಹೇಗೆ ಬದಲಾಯಿಸುವುದು?",
      answer: "ಸೆಟ್ಟಿಂಗ್ಸ್ ಟ್ಯಾಬ್‌ಗೆ ಹೋಗಿ, ಅಲ್ಲಿ ನೀವು ಲಾಗಿನ್ ಪಿನ್ ಮತ್ತು ವಹಿವಾಟು ಪಿನ್ ಅನ್ನು ಬದಲಾಯಿಸಬಹುದು ಹಾಗೂ ಬಯೋಮೆಟ್ರಿಕ್ ಆನ್ ಮಾಡಬಹುದು."
    },
    {
      keywords: ["ವಾಲೆಟ್", "ಬ್ಯಾಲೆನ್ಸ್", "ಹಣ ಸೇರಿಸಿ"],
      question: "ವಾಲೆಟ್ ಬ್ಯಾಲೆನ್ಸ್ ನೋಡುವುದು ಹೇಗೆ?",
      answer: "ವಾಲೆಟ್ ಟ್ಯಾಬ್ ತೆರೆದು ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬ್ಯಾಲೆನ್ಸ್ ಪರಿಶೀಲಿಸಿ. 'ಹಣ ಸೇರಿಸಿ' ಬಟನ್ ಬಳಸಿ ಸುಲಭವಾಗಿ ಹಣವನ್ನು ಟಾಪ್ ಅಪ್ ಮಾಡಿ."
    }
  ],
  hi: [
    {
      keywords: ["सुरक्षित", "स्कैन", "मार्गदर्शन"],
      question: "सुरक्षित रूप से QR कोड कैसे स्कैन करें?",
      answer: "होम स्क्रीन पर 'QR स्कैन' पर टैप करें और कैमरा QR कोड पर रखें। हमारा AI इंजन UPI प्रारूप, मर्चेंट और राशि की सुरक्षा की जांच करता है।"
    },
    {
      keywords: ["लाल", "धोखाधड़ी", "संदिग्ध", "चेतावनी"],
      question: "लाल चेतावनी (RED Alert) का क्या अर्थ है?",
      answer: "लाल चेतावनी का मतलब है कि QR कोड में संदिग्ध लक्षण पाए गए हैं (जैसे नकली UPI ID या असामान्य रूप से उच्च राशि)। आपकी सुरक्षा के लिए भुगतान रोक दिया गया है।"
    },
    {
      keywords: ["हरा", "सुरक्षित"],
      question: "हरी चेतावनी (GREEN Alert) का क्या अर्थ है?",
      answer: "हरा रंग बताता है कि मर्चेंट सत्यापित है और QR कोड सभी 7 सुरक्षा जांचों में पास हुआ है। आप सुरक्षित भुगतान कर सकते हैं।"
    },
    {
      keywords: ["पिन", "बदलें", "सुरक्षा"],
      question: "पिन कैसे बदलें?",
      answer: "सेटिंग्स में जाकर आप कभी भी अपना 4-अंकीय लॉगिन और ट्रांजेक्शन पिन बदल सकते हैं।"
    },
    {
      keywords: ["वॉलेट", "बैलेंस", "पैसे जोड़ें"],
      question: "वॉलेट बैलेंस कैसे चेक करें?",
      answer: "वॉलेट टैब में जाकर अपना बैलेंस देखें और '+ ₹500' या '+ ₹1000' टैप करके तुरंत पैसे जोड़ें।"
    }
  ],
  ml: [
    {
      keywords: ["സുരക്ഷിതം", "സ്കാൻ", "ഉപയോഗം"],
      question: "സുരക്ഷിതമായി QR കോഡ് എങ്ങനെ സ്കാൻ ചെയ്യാം?",
      answer: "'QR സ്കാൻ' ടാപ്പ് ചെയ്ത് ക്യാമറ കാണിക്കുക. ഞങ്ങളുടെ AI എഞ്ചിൻ UPI ഐഡി, തുക എന്നിവ സുരക്ഷിതമാണോ എന്ന് പരിശോധിക്കുന്നു."
    },
    {
      keywords: ["ചുവപ്പ്", "തട്ടിപ്പ്", "മുന്നറിയിപ്പ്"],
      question: "ചുവപ്പ് മുന്നറിയിപ്പിന്റെ അർത്ഥമെന്താണ്?",
      answer: "വ്യാജ UPI ഐഡിയോ തട്ടിപ്പ് സാധ്യതയോ കണ്ടെത്തുമ്പോഴാണ് ചുവപ്പ് മുന്നറിയിപ്പ് വരുന്നത്. സുരക്ഷയ്ക്കായി പേയ്‌മെന്റ് തടയുന്നു."
    },
    {
      keywords: ["പച്ച", "സുരക്ഷിതം"],
      question: "പച്ച മുന്നറിയിപ്പിന്റെ അർത്ഥമെന്താണ്?",
      answer: "വ്യാപാരി കൃത്യമായി പരിശോധിക്കപ്പെട്ടു എന്നും പണം നൽകാൻ സുരക്ഷിതമാണെന്നും പച്ച നിറം കാണിക്കുന്നു."
    }
  ],
  ta: [
    {
      keywords: ["பாதுகாப்பு", "ஸ்கேன்"],
      question: "QR குறியீட்டை எவ்வாறு பாதுகாப்பாக ஸ்கேன் செய்வது?",
      answer: "'QR ஸ்கேன்' அழுத்தி கேமராவை காட்டவும். எங்கள் AI அமைப்பு UPI வடிவம் மற்றும் தொகையை சரிபார்க்கிறது."
    },
    {
      keywords: ["சிவப்பு", "மோசடி", "எச்சரிக்கை"],
      question: "சிவப்பு எச்சரிக்கையின் பொருள் என்ன?",
      answer: "சிவப்பு நிறம் போலி UPI அல்லது மோசடி ஆபத்தைக் குறிக்கிறது. உங்கள் பாதுகாப்பிற்காக கட்டணம் தடுக்கப்பட்டது."
    }
  ],
  te: [
    {
      keywords: ["సురక్షితం", "స్కాన్"],
      question: "QR కోడ్‌ను సురక్షితంగా ఎలా స్కాన్ చేయాలి?",
      answer: "'QR స్కాన్' నొక్కి కెమెరాను చూపించండి. మా AI సిస్టమ్ UPI వివరాలను ధృవీకరిస్తుంది."
    },
    {
      keywords: ["ఎరుపు", "మోసం", "హెచ్చరిక"],
      question: "ఎరుపు రంగు హెచ్చరిక అర్థం ఏమిటి?",
      answer: "ఎరుపు రంగు అంటే ఆ QR కోడ్ నకిలీది లేదా అనుమానాస్పదమైనది అని అర్థం. మీ రక్షణ కోసం చెల్లింపు ఆపబడింది."
    }
  ]
};

export const getTranslation = (lang = "en", key, params = {}) => {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  let text = dict[key] || TRANSLATIONS.en[key] || key;
  Object.keys(params).forEach((paramKey) => {
    text = text.replace(new RegExp(`{${paramKey}}`, "g"), params[paramKey]);
  });
  return text;
};
