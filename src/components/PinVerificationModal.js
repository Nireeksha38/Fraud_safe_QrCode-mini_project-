import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Vibration,
  Platform,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { storage } from "../utils/storage";
import { speechService } from "../utils/speechService";

export default function PinVerificationModal({
  visible,
  amount = 0,
  merchantName = "Merchant",
  language = "en",
  onSuccess,
  onCancel,
}) {
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  useEffect(() => {
    if (visible) {
      setPin("");
      setErrorMsg("");
      checkBiometrics();
    }
  }, [visible]);

  const checkBiometrics = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(compatible && enrolled);
    } catch (e) {
      setBiometricAvailable(false);
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate Payment of ₹${amount.toLocaleString()} to ${merchantName}`,
        fallbackLabel: "Use PIN",
      });

      if (result.success) {
        onSuccess && onSuccess();
      }
    } catch (e) {
      console.warn("Biometric failed", e);
    }
  };

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setErrorMsg("");
      if (newPin.length === 4) {
        verifyPin(newPin);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMsg("");
    }
  };

  const verifyPin = async (enteredPin) => {
    const user = await storage.getUserProfile();
    const correctPin = user.txnPIN || "4321";

    if (enteredPin === correctPin) {
      if (Platform.OS !== "web") Vibration.vibrate(50);
      onSuccess && onSuccess();
    } else {
      if (Platform.OS !== "web") Vibration.vibrate([0, 100, 50, 100]);
      setErrorMsg(getTranslation(language, "incorrectPin"));
      speechService.speakIncorrectPin(language);
      setTimeout(() => {
        setPin("");
      }, 600);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.content}>
              <View style={styles.handle} />

              <View style={styles.header}>
                <Text style={styles.lockIcon}>🔒</Text>
                <Text style={styles.title}>
                  {getTranslation(language, "enterTxnPin")}
                </Text>
                <Text style={styles.txnSubtext}>
                  Paying <Text style={styles.boldText}>₹{amount.toLocaleString()}</Text> to{" "}
                  <Text style={styles.boldText}>{merchantName}</Text>
                </Text>
              </View>

              {/* Masked PIN Indicators */}
              <View style={styles.pinDotsRow}>
                {[0, 1, 2, 3].map((index) => {
                  const isFilled = pin.length > index;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        isFilled && styles.dotFilled,
                        errorMsg ? styles.dotError : null,
                      ]}
                    >
                      {isFilled && <View style={styles.dotInner} />}
                    </View>
                  );
                })}
              </View>

              {errorMsg ? (
                <Text style={styles.errorText}>{errorMsg}</Text>
              ) : null}

              {/* Custom Numeric Keypad */}
              <View style={styles.keypad}>
                <View style={styles.keypadRow}>
                  {[1, 2, 3].map((n) => (
                    <TouchableOpacity
                      key={n}
                      style={styles.keyBtn}
                      onPress={() => handleKeyPress(n.toString())}
                      activeOpacity={0.6}
                    >
                      <Text style={styles.keyNum}>{n}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.keypadRow}>
                  {[4, 5, 6].map((n) => (
                    <TouchableOpacity
                      key={n}
                      style={styles.keyBtn}
                      onPress={() => handleKeyPress(n.toString())}
                      activeOpacity={0.6}
                    >
                      <Text style={styles.keyNum}>{n}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.keypadRow}>
                  {[7, 8, 9].map((n) => (
                    <TouchableOpacity
                      key={n}
                      style={styles.keyBtn}
                      onPress={() => handleKeyPress(n.toString())}
                      activeOpacity={0.6}
                    >
                      <Text style={styles.keyNum}>{n}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.keypadRow}>
                  <TouchableOpacity
                    style={styles.keyBtnAux}
                    onPress={biometricAvailable ? handleBiometricAuth : undefined}
                    disabled={!biometricAvailable}
                  >
                    {biometricAvailable ? (
                      <Text style={styles.keyAuxText}>👆 Biometric</Text>
                    ) : (
                      <Text style={styles.keyAuxText}></Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.keyBtn}
                    onPress={() => handleKeyPress("0")}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.keyNum}>0</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.keyBtnAux}
                    onPress={handleDelete}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.keyAuxText}>⌫</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>
                  {getTranslation(language, "cancel")}
                </Text>
              </TouchableOpacity>
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
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    alignItems: "center",
    ...SHADOWS.lg,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.borderDark,
    marginBottom: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  lockIcon: {
    fontSize: 26,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primaryDark,
    textAlign: "center",
  },
  txnSubtext: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "700",
    color: COLORS.text,
  },
  pinDotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginVertical: 12,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.borderDark,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  dotFilled: {
    borderColor: COLORS.primaryLight,
    backgroundColor: COLORS.accentLight,
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  dotError: {
    borderColor: COLORS.fraudRed,
  },
  errorText: {
    color: COLORS.fraudRed,
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },
  hintText: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 12,
  },
  keypad: {
    width: "100%",
    maxWidth: 320,
    marginTop: 6,
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  keyBtn: {
    width: 72,
    height: 60,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  keyNum: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  keyBtnAux: {
    width: 72,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  keyAuxText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textMuted,
  },
});
