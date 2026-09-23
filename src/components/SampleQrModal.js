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
import { SAMPLE_QR_PRESETS } from "../utils/fraudEngine";
import { getTranslation } from "../utils/i18n";

export default function SampleQrModal({
  visible,
  language = "en",
  onSelectPreset,
  onClose,
}) {
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
                  <Text style={styles.icon}>⚡</Text>
                  <Text style={styles.title}>
                    {getTranslation(language, "trySampleQRs")}
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Text style={styles.closeText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.subtitle}>
                Select a simulated QR test scenario to evaluate fraud detection and voice alerts.
              </Text>

              <ScrollView style={styles.listContainer}>
                {SAMPLE_QR_PRESETS.map((preset) => {
                  const isSafe = preset.id.startsWith("safe");
                  const isFraud = preset.id.startsWith("fraud");
                  return (
                    <TouchableOpacity
                      key={preset.id}
                      style={[
                        styles.presetCard,
                        isSafe && styles.presetSafe,
                        isFraud && styles.presetFraud,
                      ]}
                      onPress={() => {
                        onSelectPreset(preset.rawPayload);
                        onClose();
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.presetTitle}>{preset.title}</Text>
                      <Text style={styles.presetDesc}>{preset.description}</Text>
                      <View style={styles.actionRow}>
                        <Text style={styles.runTestText}>Run Scenario →</Text>
                      </View>
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
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    maxHeight: "85%",
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
  icon: {
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
    marginBottom: 8,
  },
  presetCard: {
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  presetSafe: {
    borderColor: COLORS.safeGreenBorder,
    backgroundColor: COLORS.safeGreenBg,
  },
  presetFraud: {
    borderColor: COLORS.fraudRedBorder,
    backgroundColor: COLORS.fraudRedBg,
  },
  presetTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  presetDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  actionRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  runTestText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primaryLight,
  },
});
