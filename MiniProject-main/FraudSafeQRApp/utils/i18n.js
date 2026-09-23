import * as I18n from "i18n-js";
import * as Localization from "expo-localization";

I18n.translations = {
  en: {
    hello: "Hello",
    welcome: "Welcome",
  },
  ml: {
    hello: "നമസ്കാരം",
    welcome: "സ്വാഗതം",
  },
  kn: {
    hello: "ನಮಸ್ಕಾರ",
    welcome: "ಸ್ವಾಗತ",
  },
  hi: {
    hello: "नमस्ते",
    welcome: "स्वागत है",
  },
};

I18n.locale = Localization.locale;
I18n.defaultLocale = "en";
I18n.fallbacks = true;

export default I18n;
