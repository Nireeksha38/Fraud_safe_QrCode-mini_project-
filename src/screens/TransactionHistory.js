import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { storage } from "../utils/storage";
import HeaderBar from "../components/HeaderBar";
import LanguageSelectorModal from "../components/LanguageSelectorModal";

export default function TransactionHistory({ navigation, language, setLanguage }) {
  const [transactions, setTransactions] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'safe' | 'fraud'
  const [searchQuery, setSearchQuery] = useState("");
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadTransactions = useCallback(async () => {
    const list = await storage.getTransactions();
    setTransactions(list);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadTransactions();
    });
    loadTransactions();
    return unsubscribe;
  }, [navigation, loadTransactions]);

  useEffect(() => {
    let result = [...transactions];

    if (activeFilter !== "all") {
      result = result.filter((t) => t.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          (t.merchantName && t.merchantName.toLowerCase().includes(q)) ||
          (t.upiId && t.upiId.toLowerCase().includes(q))
      );
    }

    setFilteredList(result);
  }, [transactions, activeFilter, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const isSafe = item.status === "safe";
    const isFraud = item.status === "fraud";

    const formattedDate = new Date(item.timestamp).toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View
        style={[
          styles.txCard,
          isSafe
            ? styles.txCardSafe
            : isFraud
            ? styles.txCardFraud
            : styles.txCardCaution,
        ]}
      >
        <View style={styles.cardTop}>
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName} numberOfLines={1}>
              {item.merchantName || "Unknown Merchant"}
            </Text>
            <Text style={styles.upiId} numberOfLines={1}>
              {item.upiId || "N/A"}
            </Text>
          </View>

          <View style={styles.amountWrap}>
            <Text
              style={[
                styles.amountText,
                { color: isSafe ? COLORS.primaryDark : COLORS.fraudRed },
              ]}
            >
              ₹{(item.amount || 0).toLocaleString()}
            </Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        </View>

        {/* Security Audit Badge & Flags */}
        <View style={styles.cardBottom}>
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: isSafe
                  ? COLORS.safeGreen
                  : isFraud
                  ? COLORS.fraudRed
                  : COLORS.warningAmber,
              },
            ]}
          >
            <Text style={styles.statusPillText}>
              {isSafe ? "✓ SAFE" : isFraud ? "✖ FRAUD BLOCKED" : "⚠️ CAUTION"}
            </Text>
          </View>

          <Text style={styles.riskScoreText}>
            Risk Score: {item.riskScore !== undefined ? item.riskScore : 0}/100
          </Text>
        </View>

        {item.flags && item.flags.length > 0 && (
          <View style={styles.flagsList}>
            {item.flags.map((flag, idx) => (
              <Text key={idx} style={styles.flagItem} numberOfLines={1}>
                • {flag}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        title={getTranslation(language, "transactions")}
        activeLanguage={language}
        onOpenLanguageModal={() => setLangModalVisible(true)}
      />

      <View style={styles.body}>
        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={getTranslation(language, "searchPlaceholder")}
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Chips */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === "all" && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "all" && styles.filterTextActive,
              ]}
            >
              {getTranslation(language, "filterAll")} ({transactions.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === "safe" && styles.filterChipActiveSafe,
            ]}
            onPress={() => setActiveFilter("safe")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "safe" && styles.filterTextActiveSafe,
              ]}
            >
              🟢 {getTranslation(language, "filterSafe")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === "fraud" && styles.filterChipActiveFraud,
            ]}
            onPress={() => setActiveFilter("fraud")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "fraud" && styles.filterTextActiveFraud,
              ]}
            >
              🔴 {getTranslation(language, "filterFraud")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📂</Text>
              <Text style={styles.emptyTitle}>
                {getTranslation(language, "noTransactions")}
              </Text>
              <Text style={styles.emptySub}>
                Scanned payments and fraud alerts will be logged here for audit.
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>

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
  body: {
    flex: 1,
    padding: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    ...SHADOWS.sm,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  clearText: {
    fontSize: 14,
    color: COLORS.textMuted,
    padding: 4,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  filterChipActiveSafe: {
    backgroundColor: COLORS.safeGreenBg,
    borderColor: COLORS.safeGreen,
  },
  filterChipActiveFraud: {
    backgroundColor: COLORS.fraudRedBg,
    borderColor: COLORS.fraudRed,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.textLight,
  },
  filterTextActiveSafe: {
    color: COLORS.safeGreenDark,
    fontWeight: "700",
  },
  filterTextActiveFraud: {
    color: COLORS.fraudRedDark,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: 24,
  },
  txCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    ...SHADOWS.sm,
  },
  txCardSafe: {
    borderColor: COLORS.safeGreenBorder,
  },
  txCardFraud: {
    borderColor: COLORS.fraudRedBorder,
  },
  txCardCaution: {
    borderColor: COLORS.warningAmberBorder,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  merchantInfo: {
    flex: 1,
    marginRight: 10,
  },
  merchantName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  upiId: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  amountWrap: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "800",
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusPillText: {
    color: COLORS.surface,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  riskScoreText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  flagsList: {
    marginTop: 8,
    paddingTop: 6,
  },
  flagItem: {
    fontSize: 11,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
    maxWidth: 260,
  },
});
