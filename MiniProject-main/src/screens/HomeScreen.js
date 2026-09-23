import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { storage } from "../utils/storage";
import HeaderBar from "../components/HeaderBar";
import LanguageSelectorModal from "../components/LanguageSelectorModal";
import SampleQrModal from "../components/SampleQrModal";

export default function HomeScreen({ navigation, language, setLanguage }) {
  const [balance, setBalance] = useState(10000);
  const [user, setUser] = useState({ name: "User", phone: "" });
  const [recentTx, setRecentTx] = useState([]);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [sampleModalVisible, setSampleModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const bal = await storage.getWalletBalance();
    const u = await storage.getUserProfile();
    const tx = await storage.getTransactions();
    setBalance(bal);
    setUser(u);
    setRecentTx(tx.slice(0, 3));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });
    loadData();
    return unsubscribe;
  }, [navigation, loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleQuickAdd = async (amount) => {
    const newBal = balance + amount;
    await storage.setWalletBalance(newBal);
    setBalance(newBal);
  };

  const handleSelectSample = (rawPayload) => {
    navigation.navigate("QR Scanner", { samplePayload: rawPayload });
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={getTranslation(language, "appName")}
        activeLanguage={language}
        onOpenLanguageModal={() => setLangModalVisible(true)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* User Greeting & Subtitle */}
        <View style={styles.greetingSection}>
          <View>
            <Text style={styles.greetingSub}>
              {getTranslation(language, "welcome")},
            </Text>
            <Text style={styles.userName}>{user.name || "User"}</Text>
          </View>
          <View style={styles.userBadge}>
            <Text style={styles.userBadgeText}>🛡️ Safe Mode</Text>
          </View>
        </View>

        {/* Digital Wallet Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletTop}>
            <Text style={styles.walletLabel}>
              {getTranslation(language, "walletBalance")}
            </Text>
            <Text style={styles.chipText}>💳 FraudSafe Pay</Text>
          </View>

          <Text style={styles.balanceAmount}>₹{balance.toLocaleString()}</Text>

          <View style={styles.walletActionsRow}>
            <TouchableOpacity
              style={styles.walletBtn}
              onPress={() => handleQuickAdd(500)}
              activeOpacity={0.8}
            >
              <Text style={styles.walletBtnText}>+ ₹500</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.walletBtn}
              onPress={() => handleQuickAdd(1000)}
              activeOpacity={0.8}
            >
              <Text style={styles.walletBtnText}>+ ₹1,000</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.walletBtn, styles.walletBtnPrimary]}
              onPress={() => navigation.navigate("Wallet")}
              activeOpacity={0.8}
            >
              <Text style={styles.walletBtnPrimaryText}>
                {getTranslation(language, "wallet")} →
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sample Scenario Launcher Banner */}
        <TouchableOpacity
          style={styles.sampleBanner}
          onPress={() => setSampleModalVisible(true)}
          activeOpacity={0.85}
        >
          <View style={styles.sampleLeft}>
            <Text style={styles.sampleIcon}>⚡</Text>
            <View>
              <Text style={styles.sampleTitle}>
                {getTranslation(language, "trySampleQRs")}
              </Text>
              <Text style={styles.sampleDesc}>
                {getTranslation(language, "trySampleDesc")}
              </Text>
            </View>
          </View>
          <Text style={styles.sampleArrow}>➔</Text>
        </TouchableOpacity>

        {/* Quick Actions Grid (Fig 9.5) */}
        <Text style={styles.sectionTitle}>
          {getTranslation(language, "quickActions")}
        </Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.gridCard, styles.gridCardFeatured]}
            onPress={() => navigation.navigate("QR Scanner")}
            activeOpacity={0.8}
          >
            <View style={[styles.gridIconWrap, { backgroundColor: "#DBEAFE" }]}>
              <Text style={styles.gridIcon}>📷</Text>
            </View>
            <Text style={styles.gridCardTitle}>
              {getTranslation(language, "scanQR")}
            </Text>
            <Text style={styles.gridCardSub}>Live Camera & AI Check</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate("QR Scanner", { openGallery: true })}
            activeOpacity={0.8}
          >
            <View style={[styles.gridIconWrap, { backgroundColor: "#FEF3C7" }]}>
              <Text style={styles.gridIcon}>🖼️</Text>
            </View>
            <Text style={styles.gridCardTitle}>
              {getTranslation(language, "galleryQR")}
            </Text>
            <Text style={styles.gridCardSub}>Scan from Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate("History")}
            activeOpacity={0.8}
          >
            <View style={[styles.gridIconWrap, { backgroundColor: "#D1FAE5" }]}>
              <Text style={styles.gridIcon}>📜</Text>
            </View>
            <Text style={styles.gridCardTitle}>
              {getTranslation(language, "transactions")}
            </Text>
            <Text style={styles.gridCardSub}>Security Logs & History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridCard}
            onPress={() => navigation.navigate("Chatbot")}
            activeOpacity={0.8}
          >
            <View style={[styles.gridIconWrap, { backgroundColor: "#FCE7F3" }]}>
              <Text style={styles.gridIcon}>🤖</Text>
            </View>
            <Text style={styles.gridCardTitle}>
              {getTranslation(language, "chatbot")}
            </Text>
            <Text style={styles.gridCardSub}>Multilingual Voice Bot</Text>
          </TouchableOpacity>
        </View>

        {/* Security Shield Info Banner */}
        <View style={styles.securityCard}>
          <View style={styles.securityHeader}>
            <Text style={styles.secShield}>🔒</Text>
            <Text style={styles.secTitle}>
              {getTranslation(language, "securityStatus")}
            </Text>
          </View>
          <Text style={styles.secDesc}>
            {getTranslation(language, "securityDesc")}
          </Text>
        </View>

        {/* Recent Transactions Snapshot */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.sectionTitle}>
              {getTranslation(language, "recentActivity")}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {recentTx.length === 0 ? (
            <Text style={styles.emptyText}>
              {getTranslation(language, "noTransactions")}
            </Text>
          ) : (
            recentTx.map((item, idx) => {
              const isSafe = item.status === "safe";
              return (
                <View key={item.id || idx} style={styles.txItem}>
                  <View
                    style={[
                      styles.txIconWrap,
                      {
                        backgroundColor: isSafe
                          ? COLORS.safeGreenBg
                          : COLORS.fraudRedBg,
                      },
                    ]}
                  >
                    <Text>{isSafe ? "✓" : "✖"}</Text>
                  </View>
                  <View style={styles.txInfo}>
                    <Text style={styles.txMerchant} numberOfLines={1}>
                      {item.merchantName}
                    </Text>
                    <Text style={styles.txUpi} numberOfLines={1}>
                      {item.upiId}
                    </Text>
                  </View>
                  <View style={styles.txAmountWrap}>
                    <Text
                      style={[
                        styles.txAmount,
                        {
                          color: isSafe ? COLORS.text : COLORS.fraudRed,
                        },
                      ]}
                    >
                      ₹{item.amount.toLocaleString()}
                    </Text>
                    <Text
                      style={[
                        styles.txStatusText,
                        {
                          color: isSafe
                            ? COLORS.safeGreenDark
                            : COLORS.fraudRedDark,
                        },
                      ]}
                    >
                      {isSafe ? "Safe" : "Fraud Alert"}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={langModalVisible}
        activeLanguage={language}
        onSelectLanguage={setLanguage}
        onClose={() => setLangModalVisible(false)}
      />

      {/* Preset Test Scenarios Modal */}
      <SampleQrModal
        visible={sampleModalVisible}
        language={language}
        onSelectPreset={handleSelectSample}
        onClose={() => setSampleModalVisible(false)}
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
  greetingSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  greetingSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  userBadge: {
    backgroundColor: COLORS.safeGreenBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.safeGreenBorder,
  },
  userBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.safeGreenDark,
  },
  walletCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    ...SHADOWS.md,
  },
  walletTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletLabel: {
    color: "#94A3B8",
    fontSize: 13,
    fontWeight: "500",
  },
  chipText: {
    color: "#60A5FA",
    fontSize: 12,
    fontWeight: "700",
  },
  balanceAmount: {
    color: COLORS.textLight,
    fontSize: 32,
    fontWeight: "800",
    marginVertical: 12,
    letterSpacing: -0.5,
  },
  walletActionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  walletBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  walletBtnText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: "600",
  },
  walletBtnPrimary: {
    backgroundColor: COLORS.primaryLight,
    marginLeft: "auto",
  },
  walletBtnPrimaryText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: "700",
  },
  sampleBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.accentLight,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    marginBottom: 20,
    ...SHADOWS.sm,
  },
  sampleLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sampleIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sampleTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  sampleDesc: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sampleArrow: {
    fontSize: 18,
    color: COLORS.accent,
    fontWeight: "bold",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  gridCard: {
    width: "48%",
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  gridCardFeatured: {
    borderColor: "#BFDBFE",
    backgroundColor: "#F8FAFF",
  },
  gridIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  gridIcon: {
    fontSize: 22,
  },
  gridCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 2,
  },
  gridCardSub: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  securityCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.safeGreenBorder,
    marginBottom: 20,
    ...SHADOWS.sm,
  },
  securityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  secShield: {
    fontSize: 16,
    marginRight: 6,
  },
  secTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.safeGreenDark,
  },
  secDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  recentSection: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.sm,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  viewAllText: {
    fontSize: 13,
    color: COLORS.primaryLight,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.textMuted,
    marginVertical: 12,
    fontSize: 13,
  },
  txItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  txIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  txInfo: {
    flex: 1,
  },
  txMerchant: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  txUpi: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  txAmountWrap: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontSize: 14,
    fontWeight: "700",
  },
  txStatusText: {
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },
});
