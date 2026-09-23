import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation, LANGUAGES } from "../utils/i18n";
import { storage } from "../utils/storage";
import { speechService } from "../utils/speechService";
import HeaderBar from "../components/HeaderBar";
import LanguageSelectorModal from "../components/LanguageSelectorModal";

export default function SettingsScreen({ navigation, language, setLanguage }) {
  const [settings, setSettings] = useState({
    biometricsEnabled: true,
    voiceEnabled: true,
    speechRate: 0.95,
  });
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [pinType, setPinType] = useState("loginPIN"); // 'loginPIN' | 'txnPIN'
  const [newPin, setNewPin] = useState("");

  const loadSettings = useCallback(async () => {
    const s = await storage.getSettings();
    setSettings(s);
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleToggleBiometrics = async (val) => {
    const updated = { ...settings, biometricsEnabled: val };
    setSettings(updated);
    await storage.saveSettings(updated);
  };

  const handleToggleVoice = async (val) => {
    const updated = { ...settings, voiceEnabled: val };
    setSettings(updated);
    await storage.saveSettings(updated);
    if (!val) {
      speechService.stop();
    } else {
      speechService.speak("Voice guidance enabled", language);
    }
  };

  const handleSetSpeechRate = async (rate) => {
    const updated = { ...settings, speechRate: rate };
    setSettings(updated);
    await storage.saveSettings(updated);
    speechService.speak("Voice speed updated", language, rate);
  };

  const openPinChangeModal = (type) => {
    setPinType(type);
    setNewPin("");
    setPinModalVisible(true);
  };

  const handleSavePin = async () => {
    if (newPin.length !== 4) {
      Alert.alert("Invalid PIN", "Please enter a valid 4-digit PIN.");
      return;
    }

    const user = await storage.getUserProfile();
    const updated = { ...user, [pinType]: newPin };
    await storage.saveUserProfile(updated);
    setPinModalVisible(false);

    const label = pinType === "loginPIN" ? "Login PIN" : "Transaction PIN";
    Alert.alert("Success", `${label} updated successfully!`);
    speechService.speak(`${label} updated`, language);
  };

  const handleResetData = async () => {
    Alert.alert(
      "Reset App Data",
      "Are you sure you want to reset all wallet funds, transactions, and settings to defaults?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await storage.resetDemoData();
            setLanguage("en");
            loadSettings();
            Alert.alert("Reset Done", "App data reset successfully.");
          },
        },
      ]
    );
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <View style={styles.container}>
      <HeaderBar
        title={getTranslation(language, "settings")}
        activeLanguage={language}
        onOpenLanguageModal={() => setLangModalVisible(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Language Selection Card */}
        <Text style={styles.sectionHeader}>
          {getTranslation(language, "appPreferences")}
        </Text>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => setLangModalVisible(true)}
          activeOpacity={0.7}
        >
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🌐</Text>
            <View>
              <Text style={styles.settingTitle}>
                {getTranslation(language, "selectLanguage")}
              </Text>
              <Text style={styles.settingSub}>
                Current: {currentLangObj.flag} {currentLangObj.nativeName} ({currentLangObj.name})
              </Text>
            </View>
          </View>
          <Text style={styles.arrowRight}>➔</Text>
        </TouchableOpacity>

        {/* Security & PINs Section */}
        <Text style={styles.sectionHeader}>Security & Authorization</Text>

        <View style={styles.groupedCard}>
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => openPinChangeModal("loginPIN")}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔑</Text>
              <View>
                <Text style={styles.settingTitle}>
                  {getTranslation(language, "changeLoginPin")}
                </Text>
                <Text style={styles.settingSub}>Update 4-digit App Unlock PIN</Text>
              </View>
            </View>
            <Text style={styles.arrowRight}>➔</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.rowItem}
            onPress={() => openPinChangeModal("txnPIN")}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔒</Text>
              <View>
                <Text style={styles.settingTitle}>
                  {getTranslation(language, "changeTxnPin")}
                </Text>
                <Text style={styles.settingSub}>Update 4-digit Transaction Transfer PIN</Text>
              </View>
            </View>
            <Text style={styles.arrowRight}>➔</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.rowItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>👆</Text>
              <View>
                <Text style={styles.settingTitle}>
                  {getTranslation(language, "enableBiometrics")}
                </Text>
                <Text style={styles.settingSub}>Fingerprint / Face ID authorization</Text>
              </View>
            </View>
            <Switch
              value={settings.biometricsEnabled}
              onValueChange={handleToggleBiometrics}
              trackColor={{ false: COLORS.borderDark, true: COLORS.primaryLight }}
            />
          </View>
        </View>

        {/* Audio & Accessibility Section */}
        <Text style={styles.sectionHeader}>Audio & Accessibility</Text>

        <View style={styles.groupedCard}>
          <View style={styles.rowItem}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔊</Text>
              <View>
                <Text style={styles.settingTitle}>
                  {getTranslation(language, "enableVoice")}
                </Text>
                <Text style={styles.settingSub}>Multilingual TTS Audio for QR Alerts</Text>
              </View>
            </View>
            <Switch
              value={settings.voiceEnabled}
              onValueChange={handleToggleVoice}
              trackColor={{ false: COLORS.borderDark, true: COLORS.safeGreen }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.speedRow}>
            <Text style={styles.speedLabel}>
              {getTranslation(language, "voiceSpeed")}:
            </Text>
            <View style={styles.speedBtnsGroup}>
              {[
                { label: "0.8x Slow", val: 0.8 },
                { label: "1.0x Normal", val: 0.95 },
                { label: "1.2x Fast", val: 1.2 },
              ].map((s) => (
                <TouchableOpacity
                  key={s.label}
                  style={[
                    styles.speedBtn,
                    settings.speechRate === s.val && styles.speedBtnActive,
                  ]}
                  onPress={() => handleSetSpeechRate(s.val)}
                >
                  <Text
                    style={[
                      styles.speedBtnText,
                      settings.speechRate === s.val && styles.speedBtnTextActive,
                    ]}
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Reset Demo Data Button */}
        <TouchableOpacity
          style={styles.resetBtn}
          onPress={handleResetData}
          activeOpacity={0.8}
        >
          <Text style={styles.resetBtnText}>
            🔄 {getTranslation(language, "resetData")}
          </Text>
        </TouchableOpacity>

        {/* About App & Mini Project Reference */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>
            {getTranslation(language, "aboutApp")}
          </Text>
          <Text style={styles.aboutBody}>
            {getTranslation(language, "aboutText")}
          </Text>
          <Text style={styles.aboutCredit}>
            Department of Computer Science & Engineering{"\n"}
            YIT, Moodbidri
          </Text>
        </View>
      </ScrollView>

      {/* Change PIN Modal */}
      <Modal
        visible={pinModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPinModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPinModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.pinModalContent}>
                <Text style={styles.pinModalTitle}>
                  {pinType === "loginPIN" ? "Set New Login PIN" : "Set New Transaction PIN"}
                </Text>
                <Text style={styles.pinModalSub}>
                  Enter a 4-digit secret security PIN:
                </Text>

                <TextInput
                  style={styles.pinInput}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  value={newPin}
                  onChangeText={setNewPin}
                  placeholder="••••"
                  placeholderTextColor={COLORS.textMuted}
                />

                <View style={styles.pinModalBtns}>
                  <TouchableOpacity
                    style={styles.pinCancelBtn}
                    onPress={() => setPinModalVisible(false)}
                  >
                    <Text style={styles.pinCancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.pinSaveBtn}
                    onPress={handleSavePin}
                  >
                    <Text style={styles.pinSaveText}>Save PIN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={langModalVisible}
        activeLanguage={language}
        onSelectLanguage={setLanguage}
        onClose={() => setLangModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 14,
    marginBottom: 8,
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    ...SHADOWS.sm,
  },
  groupedCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 10,
    ...SHADOWS.sm,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    fontSize: 22,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  settingSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  arrowRight: {
    fontSize: 16,
    color: COLORS.textMuted,
    fontWeight: "bold",
    marginLeft: 8,
  },
  speedRow: {
    paddingVertical: 12,
  },
  speedLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  speedBtnsGroup: {
    flexDirection: "row",
    gap: 8,
  },
  speedBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
  speedBtnActive: {
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.accentLight,
  },
  speedBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  speedBtnTextActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  resetBtn: {
    backgroundColor: COLORS.surface,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.fraudRedBorder,
    marginTop: 14,
    marginBottom: 16,
  },
  resetBtnText: {
    color: COLORS.fraudRedDark,
    fontSize: 13,
    fontWeight: "700",
  },
  aboutCard: {
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 12,
    marginTop: 8,
  },
  aboutTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  aboutBody: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 16,
    marginBottom: 6,
  },
  aboutCredit: {
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: "center",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  pinModalContent: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    ...SHADOWS.lg,
  },
  pinModalTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 6,
  },
  pinModalSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  pinInput: {
    width: "70%",
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderRadius: 14,
    paddingVertical: 12,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 10,
    marginBottom: 20,
  },
  pinModalBtns: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  pinCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
  pinCancelText: {
    color: COLORS.textSecondary,
    fontWeight: "600",
    fontSize: 13,
  },
  pinSaveBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: COLORS.primaryDark,
    alignItems: "center",
  },
  pinSaveText: {
    color: COLORS.textLight,
    fontWeight: "700",
    fontSize: 13,
  },
});
