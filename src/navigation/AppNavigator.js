import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation } from "../utils/i18n";
import { storage } from "../utils/storage";

// Screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import QRScannerScreen from "../screens/QRScannerScreen";
import WalletScreen from "../screens/WalletScreen";
import TransactionHistory from "../screens/TransactionHistory";
import ChatbotScreen from "../screens/ChatbotScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ icon, label, focused }) {
  return (
    <View style={styles.tabIconWrap}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

function MainTabs({ language, setLanguage }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="🏠"
              label={getTranslation(language, "home")}
              focused={focused}
            />
          ),
        }}
      >
        {(props) => (
          <HomeScreen
            {...props}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="QR Scanner"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerScanTabWrap}>
              <View style={[styles.centerScanBtn, focused && styles.centerScanBtnActive]}>
                <Text style={styles.centerScanIcon}>📷</Text>
              </View>
              <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
                {getTranslation(language, "scanQR")}
              </Text>
            </View>
          ),
        }}
      >
        {(props) => (
          <QRScannerScreen
            {...props}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Wallet"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="💳"
              label={getTranslation(language, "wallet")}
              focused={focused}
            />
          ),
        }}
      >
        {(props) => (
          <WalletScreen
            {...props}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="History"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="📜"
              label={getTranslation(language, "transactions")}
              focused={focused}
            />
          ),
        }}
      >
        {(props) => (
          <TransactionHistory
            {...props}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Chatbot"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="🤖"
              label={getTranslation(language, "chatbot")}
              focused={focused}
            />
          ),
        }}
      >
        {(props) => (
          <ChatbotScreen
            {...props}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon="⚙️"
              label={getTranslation(language, "settings")}
              focused={focused}
            />
          ),
        }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            language={language}
            setLanguage={setLanguage}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    (async () => {
      const saved = await storage.getLanguage();
      setLanguageState(saved);
    })();
  }, []);

  const setLanguage = async (code) => {
    setLanguageState(code);
    await storage.setLanguage(code);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen
              {...props}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Register">
          {(props) => (
            <RegisterScreen
              {...props}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="MainTabs">
          {() => (
            <MainTabs
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 68,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 6,
    paddingBottom: 8,
    ...SHADOWS.md,
  },
  tabIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
  },
  tabEmoji: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.7,
  },
  tabEmojiActive: {
    opacity: 1,
    transform: [{ scale: 1.15 }],
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: "800",
  },
  centerScanTabWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -16,
  },
  centerScanBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
    borderWidth: 3,
    borderColor: COLORS.surface,
    ...SHADOWS.sm,
  },
  centerScanBtnActive: {
    backgroundColor: COLORS.primaryLight,
  },
  centerScanIcon: {
    fontSize: 18,
  },
});
