import * as Speech from "expo-speech";
import { getTranslation, LANGUAGES } from "./i18n";
import { storage } from "./storage";

const SPEECH_LANG_MAP = {
  en: "en-US",
  kn: "kn-IN",
  hi: "hi-IN",
  ml: "ml-IN",
  ta: "ta-IN",
  te: "te-IN",
};

export const speechService = {
  /**
   * Speak any arbitrary text with the given language code
   */
  speak: async (text, langCode = "en", customRate = 0.95) => {
    if (!text) return;
    try {
      const settings = await storage.getSettings();
      if (settings && settings.voiceEnabled === false) {
        return; // Voice muted by user preference
      }

      await Speech.stop();

      const targetLang = SPEECH_LANG_MAP[langCode] || "en-US";
      const rate = settings?.speechRate || customRate;

      Speech.speak(text, {
        language: targetLang,
        pitch: 1.0,
        rate: rate,
        onError: (err) => {
          console.warn("TTS Speech warning / fallback:", err);
          // Fallback to English if regional engine is missing on device
          if (targetLang !== "en-US") {
            Speech.speak(text, { language: "en-US", rate: 0.95 });
          }
        }
      });
    } catch (e) {
      console.warn("TTS service error:", e);
    }
  },

  /**
   * Speak Fraud Analysis Result dynamically in the selected language
   */
  speakAnalysis: async (analysisResult, langCode = "en") => {
    if (!analysisResult) return;

    const { status, merchantName, amount } = analysisResult;
    const cleanMerchant = merchantName || "Merchant";
    const cleanAmount = amount ? amount.toLocaleString() : "0";

    let speechKey = "speechSafe";
    if (status === "fraud") {
      speechKey = "speechFraud";
    } else if (status === "caution") {
      speechKey = "speechCaution";
    }

    const text = getTranslation(langCode, speechKey, {
      merchant: cleanMerchant,
      amount: cleanAmount,
    });

    await speechService.speak(text, langCode);
  },

  /**
   * Speak payment confirmation
   */
  speakSuccess: async (merchantName, amount, langCode = "en") => {
    const text = getTranslation(langCode, "speechSuccess", {
      merchant: merchantName || "Merchant",
      amount: (amount || 0).toLocaleString(),
    });
    await speechService.speak(text, langCode);
  },

  /**
   * Speak Incorrect PIN warning
   */
  speakIncorrectPin: async (langCode = "en") => {
    const text = getTranslation(langCode, "speechIncorrectPin");
    await speechService.speak(text, langCode);
  },

  /**
   * Stop active speech
   */
  stop: async () => {
    try {
      await Speech.stop();
    } catch (e) {
      // ignore
    }
  }
};
