import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { storage } from "../utils/storage";
import { speechService } from "../utils/speechService";
import HeaderBar from "../components/HeaderBar";
import LanguageSelectorModal from "../components/LanguageSelectorModal";

export default function WalletScreen({ navigation, language, setLanguage }) {
  const [balance, setBalance] = useState(10000);
  const [customAdd, setCustomAdd] = useState("");
  const [user, setUser] = useState({ name: "User" });
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [stats, setStats] = useState({ totalTx: 0, safeCount: 0 });

  const loadWallet = useCallback(async () => {
    const bal = await storage.getWalletBalance();
    const u = await storage.getUserProfile();
    const tx = await storage.getTransactions();
    setBalance(bal);
    setUser(u);

    const safeCount = tx.filter((t) => t.status === "safe").length;
    setStats({ totalTx: tx.length, safeCount });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadWallet();
    });
    loadWallet();
    return unsubscribe;
  }, [navigation, loadWallet]);

  const handleAddMoney = async (amount) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount to add.");
      return;
    }

    const newBal = balance + amt;
    await storage.setWalletBalance(newBal);
    setBalance(newBal);
    setCustomAdd("");

    Alert.alert(
      "Wallet Recharged",
      `₹${amt.toLocaleString()} added to your FraudSafe wallet.`
    );
    speechService.speak(
      `₹${amt} added to wallet successfully. New balance is ₹${newBal}.`,
      language
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={getTranslation(language, "wallet")}
        activeLanguage={language}
        onOpenLanguageModal={() => setLangModalVisible(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Virtual Debit / Shield Card */}
        <View style={styles.virtualCard}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardBrand}>FraudSafe Platinum</Text>
              <Text style={styles.cardType}>Virtual Secured Debit</Text>
            </View>
            <Text style={styles.cardChip}>💳</Text>
          </View>

          <Text style={styles.cardNumber}>•••• •••• •••• 8920</Text>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardHolderLabel}>
                {getTranslation(language, "cardHolder")}
              </Text>
              <Text style={styles.cardHolderName}>
                {(user.name || "Nireeksha").toUpperCase()}
              </Text>
            </View>
            <View style={styles.cardExpiryWrap}>
              <Text style={styles.cardHolderLabel}>EXPIRES</Text>
              <Text style={styles.cardExpiry}>12/29</Text>
            </View>
          </View>
        </View>

        {/* Current Balance Box */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>
            {getTranslation(language, "walletBalance")}
          </Text>
          <Text style={styles.balanceValue}>₹{balance.toLocaleString()}</Text>
          <Text style={styles.balanceSub}>
            ✓ Encrypted & Protected by Biometric PIN
          </Text>
        </View>

        {/* Quick Top-Up Buttons */}
        <View style={styles.topUpCard}>
          <Text style={styles.topUpTitle}>
            {getTranslation(language, "quickTopUp")}
          </Text>

          <View style={styles.quickGrid}>
            {[500, 1000, 2000, 5000].map((amt) => (
              <TouchableOpacity
                key={amt}
                style={styles.quickBtn}
                onPress={() => handleAddMoney(amt)}
                activeOpacity={0.7}
              >
                <Text style={styles.quickBtnText}>+ ₹{amt.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Amount Field */}
          <View style={styles.customAddRow}>
            <TextInput
              style={styles.customInput}
              placeholder="Enter custom amount (₹)"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="numeric"
              value={customAdd}
              onChangeText={setCustomAdd}
            />
            <TouchableOpacity
              style={styles.addCustomBtn}
              onPress={() => handleAddMoney(customAdd)}
              activeOpacity={0.8}
            >
              <Text style={styles.addCustomBtnText}>
                {getTranslation(language, "addMoney")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Security & Transaction Insights */}
        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>Security & Usage Stats</Text>

          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{stats.totalTx}</Text>
              <Text style={styles.statLabel}>Total Audits</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: COLORS.safeGreenDark }]}>
                {stats.safeCount}
              </Text>
              <Text style={styles.statLabel}>Safe Cleared</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: COLORS.fraudRedDark }]}>
                {stats.totalTx - stats.safeCount}
              </Text>
              <Text style={styles.statLabel}>Frauds Blocked</Text>
            </View>
          </View>
        </View>
      </ScrollView>

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
  virtualCard: {
    backgroundColor: "#1E1B4B",
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4338CA",
    ...SHADOWS.lg,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardBrand: {
    color: "#E0E7FF",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  cardType: {
    color: "#A5B4FC",
    fontSize: 11,
    marginTop: 2,
  },
  cardChip: {
    fontSize: 28,
  },
  cardNumber: {
    color: COLORS.textLight,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 3,
    marginVertical: 24,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardHolderLabel: {
    color: "#94A3B8",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  cardHolderName: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  cardExpiryWrap: {
    alignItems: "flex-end",
  },
  cardExpiry: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  balanceSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  balanceLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  balanceValue: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.primaryDark,
    marginVertical: 6,
  },
  balanceSub: {
    fontSize: 12,
    color: COLORS.safeGreenDark,
    fontWeight: "600",
  },
  topUpCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
    ...SHADOWS.sm,
  },
  topUpTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 14,
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 16,
  },
  quickBtn: {
    width: "48%",
    backgroundColor: COLORS.accentLight,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  quickBtnText: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 14,
  },
  customAddRow: {
    flexDirection: "row",
    gap: 10,
  },
  customInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  addCustomBtn: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 18,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  addCustomBtnText: {
    color: COLORS.textLight,
    fontWeight: "700",
    fontSize: 13,
  },
  insightsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  insightsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 14,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNum: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
