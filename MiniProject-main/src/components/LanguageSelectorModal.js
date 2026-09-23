import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { LANGUAGES, getTranslation } from "../utils/i18n";
import { speechService } from "../utils/speechService";

export default function LanguageSelectorModal({
  visible,
  activeLanguage = "en",
  onSelectLanguage,
  onClose,
}) {
  const handleSelect = (langCode) => {
    onSelectLanguage(langCode);
    // Speak audio feedback in newly chosen language
    const greetings = {
      en: "Language set to English",
      kn: "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಹೊಂದಿಸಲಾಗಿದೆ",
      hi: "भाषा हिन्दी में सेट की गई है",
      ml: "ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി",
      ta: "மொழி தமிழுக்கு மாற்றப்பட்டது",
      te: "భాష తెలుగులోకి మార్చబడింది",
    };
    speechService.speak(greetings[langCode] || greetings.en, langCode);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.headerRow}>
                <View style={styles.headerTitleWrap}>
                  <Text style={styles.globeIcon}>🌐</Text>
                  <Text style={styles.title}>
                    {getTranslation(activeLanguage, "selectLanguage")}
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.subtitle}>
                Choose your preferred regional language for display & voice alerts
              </Text>

              <ScrollView style={styles.listContainer}>
                {LANGUAGES.map((lang) => {
                  const isSelected = activeLanguage === lang.code;
                  return (
                    <TouchableOpacity
                      key={lang.code}
                      style={[
                        styles.langItem,
                        isSelected && styles.langItemSelected,
                      ]}
                      onPress={() => handleSelect(lang.code)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.langLeft}>
                        <Text style={styles.flagIcon}>{lang.flag}</Text>
                        <View>
                          <Text
                            style={[
                              styles.nativeName,
                              isSelected && styles.textSelected,
                            ]}
                          >
                            {lang.nativeName}
                          </Text>
                          <Text style={styles.englishName}>{lang.name}</Text>
                        </View>
                      </View>

                      {isSelected ? (
                        <View style={styles.checkBadge}>
                          <Text style={styles.checkText}>✓</Text>
                        </View>
                      ) : (
                        <View style={styles.radioOuter} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  headerTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  globeIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  listContainer: {
    maxHeight: 360,
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: 10,
    backgroundColor: COLORS.surface,
  },
  langItemSelected: {
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.accentLight,
  },
  langLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  nativeName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  englishName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  textSelected: {
    color: COLORS.primary,
  },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.safeGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    color: COLORS.surface,
    fontWeight: "bold",
    fontSize: 14,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.borderDark,
  },
});
