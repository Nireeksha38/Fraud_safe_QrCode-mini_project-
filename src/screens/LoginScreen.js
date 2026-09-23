import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation, LANGUAGES } from "../utils/i18n";
import { storage } from "../utils/storage";
import { speechService } from "../utils/speechService";
import LanguageSelectorModal from "../components/LanguageSelectorModal";

export default function LoginScreen({ navigation, language, setLanguage, onLoginSuccess }) {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [langModalVisible, setLangModalVisible] = useState(false);

  const handleLogin = async () => {
    if (!phone || !pin) {
      Alert.alert("Required", getTranslation(language, "fillAllFields"));
      return;
    }

    const user = await storage.getUserProfile();
    if (phone === user.phone && pin === (user.loginPIN || "1234")) {
      speechService.speak(getTranslation(language, "loginSuccess"), language);
      onLoginSuccess ? onLoginSuccess() : navigation.replace("MainTabs");
    } else {
      Alert.alert("Login Failed", getTranslation(language, "invalidCredentials"));
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert("Biometrics", "Biometric hardware not available on this device.");
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock FraudSafe QR",
        fallbackLabel: "Use PIN",
      });
      if (result.success) {
        onLoginSuccess ? onLoginSuccess() : navigation.replace("MainTabs");
      }
    } catch (e) {
      console.warn("Biometric login failed", e);
    }
  };

  const handleDemoFill = () => {
    setPhone("9876543210");
    setPin("1234");
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top Bar with Language Selector */}
        <View style={styles.topRow}>
          <View style={styles.brandRow}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.brandName}>FraudSafe QR</Text>
          </View>

          <TouchableOpacity
            style={styles.langPill}
            onPress={() => setLangModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.langFlag}>{currentLangObj.flag}</Text>
            <Text style={styles.langLabel}>{currentLangObj.nativeName}</Text>
            <Text style={styles.arrowDown}>▾</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Card */}
        <View style={styles.heroSection}>
          <Text style={styles.welcomeText}>
            {getTranslation(language, "welcome")}
          </Text>
          <Text style={styles.tagline}>
            {getTranslation(language, "tagline")}
          </Text>
        </View>

        {/* Login Form (Fig 9.2 & 9.3) */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>
            {getTranslation(language, "login")}
          </Text>

          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder={getTranslation(language, "phonePlaceholder")}
            placeholderTextColor={COLORS.textMuted}
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.fieldLabel}>4-Digit Login PIN</Text>
          <TextInput
            style={styles.input}
            placeholder={getTranslation(language, "pinPlaceholder")}
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            value={pin}
            onChangeText={setPin}
          />

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>
              {getTranslation(language, "login")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.biometricBtn}
            onPress={handleBiometricLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.biometricIcon}>👆</Text>
            <Text style={styles.biometricText}>
              {getTranslation(language, "biometricAuth")}
            </Text>
          </TouchableOpacity>

          {/* Quick Demo Credentials Button */}
          <TouchableOpacity
            style={styles.demoFillBtn}
            onPress={handleDemoFill}
            activeOpacity={0.7}
          >
            <Text style={styles.demoFillText}>
              ⚡ Quick Fill Demo: 9876543210 / 1234
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchAuthBtn}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.switchAuthText}>
              {getTranslation(language, "dontHaveAccount")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={langModalVisible}
        activeLanguage={language}
        onSelectLanguage={setLanguage}
        onClose={() => setLangModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  shieldIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primaryDark,
    letterSpacing: -0.3,
  },
  langPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  langFlag: {
    fontSize: 14,
    marginRight: 4,
  },
  langLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.accent,
    marginRight: 4,
  },
  arrowDown: {
    fontSize: 10,
    color: COLORS.accent,
  },
  heroSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primaryDark,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    marginBottom: 16,
  },
  loginBtn: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 6,
    ...SHADOWS.sm,
  },
  loginBtnText: {
    color: COLORS.textLight,
    fontSize: 15,
    fontWeight: "700",
  },
  biometricBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginTop: 12,
    backgroundColor: COLORS.background,
  },
  biometricIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  biometricText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  demoFillBtn: {
    marginTop: 14,
    paddingVertical: 8,
    alignItems: "center",
  },
  demoFillText: {
    color: COLORS.primaryLight,
    fontSize: 12,
    fontWeight: "700",
  },
  switchAuthBtn: {
    marginTop: 16,
    paddingVertical: 8,
    alignItems: "center",
  },
  switchAuthText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "600",
  },
});
