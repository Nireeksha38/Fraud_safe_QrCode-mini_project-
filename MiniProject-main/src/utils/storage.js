import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  LANGUAGE: "@fraudsafe_language",
  USER_PROFILE: "@fraudsafe_user_profile",
  WALLET_BALANCE: "@fraudsafe_wallet_balance",
  TRANSACTIONS: "@fraudsafe_transactions",
  SETTINGS: "@fraudsafe_settings",
};

// Initial default state
const DEFAULT_USER = {
  phone: "9876543210",
  name: "Nireeksha",
  loginPIN: "1234",
  txnPIN: "4321",
};

const DEFAULT_SETTINGS = {
  biometricsEnabled: true,
  voiceEnabled: true,
  speechRate: 0.95,
};

const INITIAL_TRANSACTIONS = [
  {
    id: "TXN_10928",
    merchantName: "Star Supermarket",
    upiId: "starsupermarket@okaxis",
    amount: 350.00,
    status: "safe",
    riskScore: 5,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    flags: ["Verified Merchant Handle", "Safe Amount Range", "Valid UPI URI"],
  },
  {
    id: "TXN_10927",
    merchantName: "Free Lottery Claim",
    upiId: "claim-prize-882@fakebank.xyz",
    amount: 4999.00,
    status: "fraud",
    riskScore: 92,
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    flags: ["Phishing Domain Detected", "Suspicious Handle", "Malformed Payment Note"],
  },
  {
    id: "TXN_10926",
    merchantName: "Apollo Pharmacy",
    upiId: "apollopharmacy@okhdfcbank",
    amount: 1250.00,
    status: "safe",
    riskScore: 0,
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    flags: ["Verified Merchant", "Trusted NPCI Partner"],
  }
];

export const storage = {
  // Language
  getLanguage: async () => {
    try {
      const lang = await AsyncStorage.getItem(KEYS.LANGUAGE);
      return lang || "en";
    } catch (e) {
      return "en";
    }
  },
  setLanguage: async (lang) => {
    try {
      await AsyncStorage.setItem(KEYS.LANGUAGE, lang);
    } catch (e) {
      console.error("Failed to save language", e);
    }
  },

  // User Profile & Authentication
  getUserProfile: async () => {
    try {
      const data = await AsyncStorage.getItem(KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  },
  saveUserProfile: async (profile) => {
    try {
      await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error("Failed to save user profile", e);
    }
  },

  // Wallet
  getWalletBalance: async () => {
    try {
      const balance = await AsyncStorage.getItem(KEYS.WALLET_BALANCE);
      return balance ? parseFloat(balance) : 10000.0;
    } catch (e) {
      return 10000.0;
    }
  },
  setWalletBalance: async (balance) => {
    try {
      await AsyncStorage.setItem(KEYS.WALLET_BALANCE, balance.toString());
    } catch (e) {
      console.error("Failed to update wallet balance", e);
    }
  },

  // Transactions History & Audit
  getTransactions: async () => {
    try {
      const list = await AsyncStorage.getItem(KEYS.TRANSACTIONS);
      if (list) {
        return JSON.parse(list);
      }
      // Initialize with sample items if empty
      await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      return INITIAL_TRANSACTIONS;
    } catch (e) {
      return INITIAL_TRANSACTIONS;
    }
  },
  addTransaction: async (tx) => {
    try {
      const existing = await storage.getTransactions();
      const updated = [tx, ...existing];
      await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Failed to add transaction", e);
      return [];
    }
  },

  // Settings
  getSettings: async () => {
    try {
      const settings = await AsyncStorage.getItem(KEYS.SETTINGS);
      return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },
  saveSettings: async (settings) => {
    try {
      await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  },

  // Reset demo data
  resetDemoData: async () => {
    try {
      await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(DEFAULT_USER));
      await AsyncStorage.setItem(KEYS.WALLET_BALANCE, "10000");
      await AsyncStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      await AsyncStorage.setItem(KEYS.LANGUAGE, "en");
    } catch (e) {
      console.error("Reset error", e);
    }
  }
};
