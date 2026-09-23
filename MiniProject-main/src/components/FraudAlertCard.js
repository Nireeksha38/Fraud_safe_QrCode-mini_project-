import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { speechService } from "../utils/speechService";

export default function FraudAlertCard({
  analysis,
  language = "en",
  onReplayAudio,
}) {
  if (!analysis) return null;

  const { status, riskScore, merchantName, upiId, amount, flags } = analysis;

  const isSafe = status === "safe";
  const isFraud = status === "fraud";
  const isCaution = status === "caution";

  const cardBg = isSafe
    ? COLORS.safeGreenBg
    : isFraud
    ? COLORS.fraudRedBg
    : COLORS.warningAmberBg;

  const borderColor = isSafe
    ? COLORS.safeGreen
    : isFraud
    ? COLORS.fraudRed
    : COLORS.warningAmber;

  const titleText = isSafe
    ? getTranslation(language, "statusSafe")
    : isFraud
    ? getTranslation(language, "statusFraud")
    : getTranslation(language, "statusCaution");

  const badgeIcon = isSafe ? "🛡️ SAFE" : isFraud ? "🚨 FRAUD ALERT" : "⚠️ CAUTION";

  const handleSpeak = () => {
    if (onReplayAudio) {
      onReplayAudio();
    } else {
      speechService.speakAnalysis(analysis, language);
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: cardBg, borderColor: borderColor },
        isSafe ? SHADOWS.glowGreen : isFraud ? SHADOWS.glowRed : SHADOWS.md,
      ]}
    >
      {/* Top Status & Audio Header */}
      <View style={styles.topRow}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: isSafe
                ? COLORS.safeGreen
                : isFraud
                ? COLORS.fraudRed
                : COLORS.warningAmber,
            },
          ]}
        >
          <Text style={styles.badgeText}>{badgeIcon}</Text>
        </View>

        <View style={styles.rightHeaderWrap}>
          <View style={styles.scorePill}>
            <Text style={styles.scoreLabel}>Risk Score:</Text>
            <Text
              style={[
                styles.scoreValue,
                {
                  color: isSafe
                    ? COLORS.safeGreenDark
                    : isFraud
                    ? COLORS.fraudRedDark
                    : COLORS.warningAmberDark,
                },
              ]}
            >
              {riskScore}/100
            </Text>
          </View>

          <TouchableOpacity
            style={styles.speakerBtn}
            onPress={handleSpeak}
            activeOpacity={0.7}
          >
            <Text style={styles.speakerIcon}>🔊</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Title & Status */}
      <Text
        style={[
          styles.mainTitle,
          {
            color: isSafe
              ? COLORS.safeGreenDark
              : isFraud
              ? COLORS.fraudRedDark
              : COLORS.warningAmberDark,
          },
        ]}
      >
        {titleText}
      </Text>

      {/* Transaction Snapshot */}
      <View style={styles.detailsBox}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            {getTranslation(language, "payingTo")}:
          </Text>
          <Text style={styles.detailValue} numberOfLines={1}>
            {merchantName || "Unknown"}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>
            {getTranslation(language, "merchantUPI")}:
          </Text>
          <Text style={styles.detailValueUpi} numberOfLines={1}>
            {upiId || "N/A"}
          </Text>
        </View>

        {amount > 0 && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {getTranslation(language, "amount")}:
            </Text>
            <Text style={styles.detailAmount}>₹{amount.toLocaleString()}</Text>
          </View>
        )}
      </View>

      {/* Security Analysis Breakdown Checklist */}
      <View style={styles.flagsSection}>
        <Text style={styles.flagsTitle}>
          {getTranslation(language, "safetyFlags")}:
        </Text>
        {flags &&
          flags.map((flag, idx) => (
            <View key={idx} style={styles.flagItem}>
              <Text
                style={[
                  styles.flagBullet,
                  {
                    color: isSafe
                      ? COLORS.safeGreenDark
                      : isFraud
                      ? COLORS.fraudRedDark
                      : COLORS.warningAmberDark,
                  },
                ]}
              >
                {isSafe ? "✓" : isFraud ? "✖" : "!"}
              </Text>
              <Text style={styles.flagText}>{flag}</Text>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 16,
    marginVertical: 10,
    width: "100%",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: COLORS.surface,
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  rightHeaderWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scorePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  scoreLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginRight: 4,
  },
  scoreValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  speakerBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.sm,
  },
  speakerIcon: {
    fontSize: 16,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  detailsBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    maxWidth: "60%",
    textAlign: "right",
  },
  detailValueUpi: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.primaryLight,
    maxWidth: "60%",
    textAlign: "right",
  },
  detailAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },
  flagsSection: {
    marginTop: 4,
  },
  flagsTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  flagItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  flagBullet: {
    fontWeight: "bold",
    fontSize: 13,
    marginRight: 6,
    marginTop: 1,
  },
  flagText: {
    fontSize: 12,
    color: COLORS.text,
    flex: 1,
    lineHeight: 17,
  },
});
