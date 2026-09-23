# FraudSafe QR: Fraud-Safe QR Verification System with Multilingual Voice Interaction 🛡️🔊

A mobile payment security application built with React Native and Expo. It detects fraudulent, tampered, and phishing UPI QR codes using a **7-layer analytical verification engine** and provides real-time **multilingual voice assistance** across 6 regional Indian languages.

---

## 🚀 Key Features

- **🛡️ 7-Layer Analytical Fraud Detection Engine**:
  - Validates UPI URI structure and JSON payloads.
  - Detects unknown/unverified PSP handles, fake cashback claims, and phishing domains.
  - Flags abnormal transaction amounts exceeding ₹50,000 threshold.
  - Color-coded risk classification: 🟢 **Green (Safe)**, 🔴 **Red (Fraud Alert / Blocked)**, 🟡 **Yellow (Caution)**.
- **🔊 Multilingual Text-to-Speech (TTS) Voice Guidance**:
  - Real-time spoken announcements in **English, Kannada (ಕನ್ನಡ), Hindi (हिन्दी), Malayalam (മലയാളം), Tamil (தமிழ்), and Telugu (తెలుగు)**.
  - Speaks merchant name, amount, safety rating, and fraud warnings.
- **📷 Live Camera Scanner & Gallery QR Decoder**:
  - Live viewfinder with animated laser reticle, flash toggle, and flip camera.
  - Photo gallery QR scanning.
  - ⚡ **1-Tap Viva Test Bench**: Built-in test scenarios (Genuine Merchant, Phishing Scam, High Amount Tampered, Malformed URI).
- **🔒 Cross-Platform PIN & Biometric Authentication**:
  - Secure in-app numeric keypad and masked PIN modal (works on Android, iOS, and Web).
  - Biometric fingerprint / Face ID unlock.
- **🤖 Multilingual Voice Chatbot**:
  - Rule-based AI assistant for safety tips, alert meanings, wallet queries, and PIN changes.
- **💳 Digital Wallet & Audit History**:
  - Virtual debit card with quick top-up and detailed filterable transaction audit logs.

---

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 51
- **Language**: JavaScript (ES6+)
- **Navigation**: React Navigation (Bottom Tabs + Native Stack)
- **Audio & Speech**: `expo-speech`
- **Camera & Scanning**: `expo-camera`, `expo-image-picker`, `jsQR`
- **Security & Storage**: `expo-local-authentication`, `@react-native-async-storage/async-storage`

---

## 📱 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Nireeksha38/Fraud_safe_QrCode-mini_project-.git
cd Fraud_safe_QrCode-mini_project-
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Start the Expo app
```bash
npx expo start
```

- **Web Browser**: Press `w` or run `npx expo start --web`
- **Android / iOS Device**: Scan the QR code using the **Expo Go** mobile app.

---

---

