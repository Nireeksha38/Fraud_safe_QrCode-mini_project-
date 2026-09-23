import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { LANGUAGES } from "../utils/i18n";

export default function HeaderBar({
  title = "FraudSafe QR",
  subtitle,
  activeLanguage = "en",
  onOpenLanguageModal,
  showBack = false,
  onBack,
}) {
  const currentLang = LANGUAGES.find((l) => l.code === activeLanguage) || LANGUAGES[0];

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        )}
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          {subtitle ? (
            <Text style={styles.subtitle}>{subtitle}</Text>
          ) : (
            <Text style={styles.securityBadge}>● AI Fraud Shield Active</Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.langBadge}
        onPress={onOpenLanguageModal}
        activeOpacity={0.8}
      >
        <Text style={styles.langFlag}>{currentLang.flag}</Text>
        <Text style={styles.langText}>{currentLang.nativeName}</Text>
        <Text style={styles.arrowDown}>▾</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.sm,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    paddingRight: 12,
  },
  backIcon: {
    fontSize: 22,
    color: COLORS.primaryDark,
    fontWeight: "bold",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  shieldIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.primaryDark,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  securityBadge: {
    fontSize: 11,
    color: COLORS.safeGreenDark,
    fontWeight: "600",
    marginTop: 2,
  },
  langBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  langFlag: {
    fontSize: 14,
    marginRight: 4,
  },
  langText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.accent,
    marginRight: 3,
  },
  arrowDown: {
    fontSize: 11,
    color: COLORS.accent,
  },
});
