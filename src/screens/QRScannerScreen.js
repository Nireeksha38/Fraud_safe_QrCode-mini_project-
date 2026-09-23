import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Alert,
  Platform,
  Vibration,
  TextInput,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { parseQrData, analyzeFraudRisk } from "../utils/fraudEngine";
import { speechService } from "../utils/speechService";
import { storage } from "../utils/storage";
import { decodeQrFromImageUri } from "../utils/qrDecoder";
import HeaderBar from "../components/HeaderBar";
import LanguageSelectorModal from "../components/LanguageSelectorModal";
import FraudAlertCard from "../components/FraudAlertCard";
import PinVerificationModal from "../components/PinVerificationModal";

export default function QRScannerScreen({ route, navigation, language, setLanguage }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [torch, setTorch] = useState(false);
  const [facing, setFacing] = useState("back");
  const [scanned, setScanned] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [completedTxn, setCompletedTxn] = useState(null);

  // Lock to avoid multi-triggering while a scan is being processed
  const isScanningLocked = useRef(false);

  // Laser scan line animation
  const laserAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(laserAnim, {
          toValue: 220,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(laserAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [laserAnim]);

  // Handle route params if passed from Home or Gallery
  useEffect(() => {
    if (route?.params?.samplePayload) {
      handleQrData(route.params.samplePayload);
    } else if (route?.params?.openGallery) {
      pickFromGallery();
    }
  }, [route?.params]);

  const handleQrData = async (rawString) => {
    if (!rawString || typeof rawString !== "string" || rawString.trim().length === 0) {
      return;
    }

    isScanningLocked.current = true;
    setScanned(true);

    if (Platform.OS !== "web") {
      try {
        Vibration.vibrate(60);
      } catch (e) {}
    }

    const parsed = parseQrData(rawString);
    const analysis = analyzeFraudRisk(parsed);
    setAnalysisResult(analysis);

    if (analysis.amount > 0) {
      setCustomAmount(analysis.amount.toString());
    } else {
      setCustomAmount("");
    }

    // Multilingual Voice Announcement
    await speechService.speakAnalysis(analysis, language);
  };

  const handleBarCodeScanned = (event) => {
    if (scanned || isScanningLocked.current) return;

    const qrData =
      event?.data ||
      event?.nativeEvent?.data ||
      event?.raw ||
      (typeof event === "string" ? event : null);

    if (qrData && typeof qrData === "string" && qrData.trim().length > 0) {
      handleQrData(qrData);
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        const decoded = await decodeQrFromImageUri(uri);
        if (decoded) {
          handleQrData(decoded);
        } else {
          Alert.alert(
            "QR Detection",
            "Could not read QR code from this image. Please select a clearer photo."
          );
        }
      }
    } catch (e) {
      Alert.alert(
        "Gallery Scan",
        "Could not detect QR code in selected image. Please try another image."
      );
    }
  };

  const handleResetScan = () => {
    isScanningLocked.current = false;
    setScanned(false);
    setAnalysisResult(null);
    setCustomAmount("");
    speechService.stop();
  };

  const handleProceedPayment = () => {
    const finalAmount = parseFloat(customAmount) || analysisResult?.amount || 0;
    if (finalAmount <= 0) {
      Alert.alert("Amount Required", "Please enter a valid payment amount");
      return;
    }
    setShowPinModal(true);
  };

  const handlePinSuccess = async () => {
    setShowPinModal(false);
    const finalAmount = parseFloat(customAmount) || analysisResult?.amount || 0;

    // Deduct from wallet
    const currentBal = await storage.getWalletBalance();
    const newBal = Math.max(0, currentBal - finalAmount);
    await storage.setWalletBalance(newBal);

    // Save transaction
    const newTx = {
      id: `TXN_${Math.floor(10000 + Math.random() * 90000)}`,
      merchantName: analysisResult.merchantName,
      upiId: analysisResult.upiId,
      amount: finalAmount,
      status: analysisResult.status,
      riskScore: analysisResult.riskScore,
      timestamp: new Date().toISOString(),
      flags: analysisResult.flags,
    };

    await storage.addTransaction(newTx);
    setCompletedTxn(newTx);
    setShowSuccessModal(true);

    // Voice announcement
    speechService.speakSuccess(analysisResult.merchantName, finalAmount, language);
  };

  const activeAmount = parseFloat(customAmount) || analysisResult?.amount || 0;

  return (
    <View style={styles.container}>
      <HeaderBar
        title={getTranslation(language, "scanQR")}
        activeLanguage={language}
        onOpenLanguageModal={() => setLangModalVisible(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Camera Viewfinder Card */}
        {!scanned ? (
          <View style={styles.cameraContainer}>
            {permission?.granted ? (
              <View style={styles.cameraWrap}>
                <CameraView
                  style={StyleSheet.absoluteFillObject}
                  facing={facing}
                  enableTorch={torch}
                  onBarcodeScanned={handleBarCodeScanned}
                  barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                  }}
                />

                {/* Viewfinder Target Reticle Overlay */}
                <View style={styles.overlayArea} pointerEvents="none">
                  <View style={styles.reticle}>
                    <View style={[styles.corner, styles.tl]} />
                    <View style={[styles.corner, styles.tr]} />
                    <View style={[styles.corner, styles.bl]} />
                    <View style={[styles.corner, styles.br]} />

                    {/* Animated Scanning Laser */}
                    <Animated.View
                      style={[
                        styles.laserLine,
                        { transform: [{ translateY: laserAnim }] },
                      ]}
                    />
                  </View>
                  <Text style={styles.reticleHint}>
                    {getTranslation(language, "alignQR")}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.permissionBox}>
                <Text style={styles.permIcon}>📷</Text>
                <Text style={styles.permTitle}>Camera Access Required</Text>
                <Text style={styles.permDesc}>
                  Please grant camera permissions to scan payment QR codes in real-time.
                </Text>
                <TouchableOpacity
                  style={styles.permBtn}
                  onPress={requestPermission}
                >
                  <Text style={styles.permBtnText}>Grant Permission</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Quick Controls Bar */}
            <View style={styles.cameraControls}>
              <TouchableOpacity
                style={[styles.controlBtn, torch && styles.controlBtnActive]}
                onPress={() => setTorch(!torch)}
              >
                <Text style={styles.controlIcon}>{torch ? "⚡ ON" : "⚡ Flash"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlBtn}
                onPress={() => setFacing(facing === "back" ? "front" : "back")}
              >
                <Text style={styles.controlIcon}>🔄 Flip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlBtn}
                onPress={pickFromGallery}
              >
                <Text style={styles.controlIcon}>🖼️ Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Action Buttons: Gallery or Scan Another */}
        <View style={styles.scannerActionsRow}>
          {!scanned ? (
            <TouchableOpacity
              style={styles.actionBtnGallery}
              onPress={pickFromGallery}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnGalleryText}>
                🖼️ {getTranslation(language, "galleryQR")}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.actionBtnReset}
              onPress={handleResetScan}
              activeOpacity={0.8}
            >
              <Text style={styles.actionBtnResetText}>
                🔄 {getTranslation(language, "scanAnother")}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Real-time Fraud Analysis Result Card */}
        {analysisResult && (
          <View style={styles.resultContainer}>
            <FraudAlertCard
              analysis={analysisResult}
              language={language}
              onReplayAudio={() =>
                speechService.speakAnalysis(analysisResult, language)
              }
            />

            {/* Review Payment Card */}
            <View style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>
                {getTranslation(language, "reviewPayment")}
              </Text>

              {/* Amount Input (editable if 0 or static QR) */}
              <View style={styles.amountInputWrap}>
                <Text style={styles.currencySymbol}>₹</Text>
                <TextInput
                  style={styles.amountInput}
                  value={customAmount}
                  onChangeText={setCustomAmount}
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor={COLORS.textMuted}
                />
              </View>

              {/* Action Buttons */}
              {analysisResult.status === "fraud" ? (
                <View style={styles.fraudBlockedBox}>
                  <Text style={styles.fraudBlockedIcon}>🛑</Text>
                  <Text style={styles.fraudBlockedText}>
                    {getTranslation(language, "paymentBlocked")}
                  </Text>
                  <TouchableOpacity
                    style={styles.overrideBtn}
                    onPress={handleProceedPayment}
                  >
                    <Text style={styles.overrideBtnText}>
                      {getTranslation(language, "proceedAnyway")} (Risk)
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.payButton,
                    analysisResult.status === "caution"
                      ? styles.payButtonCaution
                      : styles.payButtonSafe,
                  ]}
                  onPress={handleProceedPayment}
                  activeOpacity={0.85}
                >
                  <Text style={styles.payButtonText}>
                    {getTranslation(language, "confirmAndPay")} (₹
                    {activeAmount.toLocaleString()})
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* PIN Verification Bottom Sheet */}
      <PinVerificationModal
        visible={showPinModal}
        amount={activeAmount}
        merchantName={analysisResult?.merchantName || "Merchant"}
        language={language}
        onSuccess={handlePinSuccess}
        onCancel={() => setShowPinModal(false)}
      />

      {/* Payment Success Modal */}
      {showSuccessModal && completedTxn && (
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>
              {getTranslation(language, "paymentSuccess")}
            </Text>
            <Text style={styles.successAmount}>
              ₹{completedTxn.amount.toLocaleString()}
            </Text>
            <Text style={styles.successMerchant}>
              Paid to {completedTxn.merchantName}
            </Text>
            <Text style={styles.successRef}>Ref: {completedTxn.id}</Text>

            <TouchableOpacity
              style={styles.successDoneBtn}
              onPress={() => {
                setShowSuccessModal(false);
                handleResetScan();
                navigation.navigate("History");
              }}
            >
              <Text style={styles.successDoneText}>
                {getTranslation(language, "close")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

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
  cameraContainer: {
    height: 340,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: COLORS.primaryDark,
    marginBottom: 16,
    position: "relative",
    ...SHADOWS.md,
  },
  cameraWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayArea: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  reticle: {
    width: 220,
    height: 220,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    position: "relative",
    justifyContent: "center",
  },
  corner: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#60A5FA",
  },
  tl: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  tr: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bl: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  br: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  laserLine: {
    height: 3,
    backgroundColor: "#EF4444",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    borderRadius: 2,
  },
  reticleHint: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 14,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cameraControls: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    zIndex: 10,
  },
  controlBtn: {
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  controlBtnActive: {
    backgroundColor: COLORS.warningAmber,
  },
  controlIcon: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: "700",
  },
  permissionBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  permIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  permTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textLight,
    marginBottom: 6,
  },
  permDesc: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 16,
  },
  permBtn: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  permBtnText: {
    color: COLORS.textLight,
    fontWeight: "700",
  },
  scannerActionsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  actionBtnGallery: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    ...SHADOWS.sm,
  },
  actionBtnGalleryText: {
    color: COLORS.primaryDark,
    fontWeight: "700",
    fontSize: 14,
  },
  actionBtnReset: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.primaryLight,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionBtnResetText: {
    color: COLORS.primaryLight,
    fontWeight: "700",
    fontSize: 14,
  },
  resultContainer: {
    width: "100%",
  },
  reviewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 12,
    textAlign: "center",
  },
  amountInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.borderDark,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginRight: 6,
  },
  amountInput: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primaryDark,
    minWidth: 100,
  },
  payButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  payButtonSafe: {
    backgroundColor: COLORS.safeGreen,
    ...SHADOWS.glowGreen,
  },
  payButtonCaution: {
    backgroundColor: COLORS.warningAmber,
  },
  payButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "800",
  },
  fraudBlockedBox: {
    backgroundColor: COLORS.fraudRedBg,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.fraudRedBorder,
  },
  fraudBlockedIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  fraudBlockedText: {
    color: COLORS.fraudRedDark,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 10,
  },
  overrideBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  overrideBtnText: {
    color: COLORS.fraudRedDark,
    fontSize: 12,
    fontWeight: "700",
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    zIndex: 100,
  },
  successCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
    ...SHADOWS.lg,
  },
  successEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.safeGreenDark,
    marginBottom: 6,
  },
  successAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  successMerchant: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  successRef: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 18,
  },
  successDoneBtn: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  successDoneText: {
    color: COLORS.textLight,
    fontWeight: "700",
    fontSize: 14,
  },
});
