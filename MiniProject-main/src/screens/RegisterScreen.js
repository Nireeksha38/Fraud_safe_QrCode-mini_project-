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
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { storage } from "../utils/storage";

export default function RegisterScreen({ navigation, language = "en" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [txnPin, setTxnPin] = useState("");

  const handleRegister = async () => {
    if (!name || !phone || !loginPin || !txnPin) {
      Alert.alert("Required", getTranslation(language, "fillAllFields"));
      return;
    }

    if (loginPin.length !== 4 || txnPin.length !== 4) {
      Alert.alert("Invalid PIN", "PINs must be exactly 4 digits");
      return;
    }

    const newUser = {
      name,
      phone,
      loginPIN: loginPin,
      txnPIN: txnPin,
    };

    await storage.saveUserProfile(newUser);
    Alert.alert("Success", getTranslation(language, "registerSuccess"), [
      { text: "Login Now", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>
            {getTranslation(language, "register")}
          </Text>
          <Text style={styles.subtitle}>
            Create your secure FraudSafe account
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Nireeksha"
            placeholderTextColor={COLORS.textMuted}
            value={name}
            onChangeText={setName}
          />

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
            placeholder="e.g. 1234"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            value={loginPin}
            onChangeText={setLoginPin}
          />

          <Text style={styles.fieldLabel}>4-Digit Transaction Transfer PIN</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 4321"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            value={txnPin}
            onChangeText={setTxnPin}
          />

          <TouchableOpacity
            style={styles.regBtn}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.regBtnText}>
              {getTranslation(language, "register")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchAuthBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.switchAuthText}>
              {getTranslation(language, "alreadyHaveAccount")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  backBtn: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 14,
    color: COLORS.primaryLight,
    fontWeight: "700",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
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
    marginBottom: 14,
  },
  regBtn: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
    ...SHADOWS.sm,
  },
  regBtnText: {
    color: COLORS.textLight,
    fontSize: 15,
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
