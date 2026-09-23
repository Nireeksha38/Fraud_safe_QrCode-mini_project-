import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS, SHADOWS } from "../constants/theme";
import { getTranslation, CHATBOT_QA } from "../utils/i18n";
import { speechService } from "../utils/speechService";
import { storage } from "../utils/storage";
import HeaderBar from "../components/HeaderBar";
import LanguageSelectorModal from "../components/LanguageSelectorModal";

export default function ChatbotScreen({ navigation, language, setLanguage }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [langModalVisible, setLangModalVisible] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    // Initial bot welcome message in active language
    const welcomeMsg = {
      id: "welcome_0",
      sender: "bot",
      text: getTranslation(language, "botGreeting"),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([welcomeMsg]);
    speechService.speak(welcomeMsg.text, language);
  }, [language]);

  const handleSend = async (customQuery) => {
    const query = (customQuery || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Rule-Based Knowledge Engine
    setTimeout(async () => {
      const qaList = CHATBOT_QA[language] || CHATBOT_QA.en;
      const lowerQ = query.toLowerCase();

      let matched = qaList.find((item) =>
        item.keywords.some((kw) => lowerQ.includes(kw.toLowerCase()))
      );

      let botReply = "";
      if (matched) {
        botReply = matched.answer;
      } else if (lowerQ.includes("balance") || lowerQ.includes("ಬ್ಯಾಲೆನ್ಸ್") || lowerQ.includes("बैलेंस")) {
        const bal = await storage.getWalletBalance();
        botReply = `Your current FraudSafe wallet balance is ₹${bal.toLocaleString()}. You can top up from the Wallet tab.`;
      } else {
        const fallbacks = {
          en: "I can assist you with QR safety, red alert explanations, wallet balance, and PIN changes. Please choose a topic above.",
          kn: "ನಾನು QR ಸುರಕ್ಷತೆ, ಕೆಂಪು ಎಚ್ಚರಿಕೆ ವಿವರಣೆ, ವಾಲೆಟ್ ಬ್ಯಾಲೆನ್ಸ್ ಮತ್ತು ಪಿನ್ ಬದಲಾವಣೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.",
          hi: "मैं QR सुरक्षा, लाल चेतावनी, वॉलेट बैलेंस और पिन बदलने में आपकी सहायता कर सकता हूँ।",
          ml: "QR സുരക്ഷ, ചുവപ്പ് മുന്നറിയിപ്പ്, വാലറ്റ് എന്നിവയെക്കുറിച്ച് എന്നോട് ചോദിക്കാം.",
          ta: "QR பாதுகாப்பு, சிவப்பு எச்சரிக்கை மற்றும் வாலட் பற்றி என்னிடம் கேளுங்கள்.",
          te: "నేను QR భద్రత, ఎరుపు రంగు హెచ్చరిక మరియు వాలెట్ వివరాలలో సహాయపడతాను.",
        };
        botReply = fallbacks[language] || fallbacks.en;
      }

      const botMsg = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      speechService.speak(botReply, language);
    }, 400);
  };

  const quickQuestions = CHATBOT_QA[language] || CHATBOT_QA.en;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <HeaderBar
        title={getTranslation(language, "chatbot")}
        activeLanguage={language}
        onOpenLanguageModal={() => setLangModalVisible(true)}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Suggested Quick Question Chips */}
        <View style={styles.quickChipsWrap}>
          <Text style={styles.chipsTitle}>💡 Suggested Topics</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsRow}
          >
            {quickQuestions.slice(0, 4).map((qa, i) => (
              <TouchableOpacity
                key={i}
                style={styles.chipBtn}
                onPress={() => handleSend(qa.question)}
                activeOpacity={0.7}
              >
                <Text style={styles.chipBtnText}>{qa.question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Message Bubbles */}
        {messages.map((msg) => {
          const isBot = msg.sender === "bot";
          return (
            <View
              key={msg.id}
              style={[
                styles.bubbleRow,
                isBot ? styles.bubbleRowBot : styles.bubbleRowUser,
              ]}
            >
              {isBot && (
                <View style={styles.botAvatar}>
                  <Text style={styles.botAvatarText}>🤖</Text>
                </View>
              )}

              <View
                style={[
                  styles.bubble,
                  isBot ? styles.bubbleBot : styles.bubbleUser,
                ]}
              >
                <Text
                  style={[
                    styles.msgText,
                    isBot ? styles.msgTextBot : styles.msgTextUser,
                  ]}
                >
                  {msg.text}
                </Text>

                <View style={styles.msgFooter}>
                  <Text
                    style={[
                      styles.timestamp,
                      isBot ? styles.timestampBot : styles.timestampUser,
                    ]}
                  >
                    {msg.timestamp}
                  </Text>

                  {isBot && (
                    <TouchableOpacity
                      onPress={() => speechService.speak(msg.text, language)}
                      style={styles.audioIconBtn}
                    >
                      <Text style={styles.audioIcon}>🔊</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Message Input Box */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder={getTranslation(language, "askQuestionPlaceholder")}
          placeholderTextColor={COLORS.textMuted}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={() => handleSend()}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => handleSend()}
          activeOpacity={0.8}
        >
          <Text style={styles.sendBtnText}>➤</Text>
        </TouchableOpacity>
      </View>

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        visible={langModalVisible}
        activeLanguage={language}
        onSelectLanguage={setLanguage}
        onClose={() => setLangModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
    paddingBottom: 20,
  },
  quickChipsWrap: {
    marginBottom: 16,
  },
  chipsTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 8,
  },
  chipBtn: {
    backgroundColor: COLORS.accentLight,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  chipBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.accent,
  },
  bubbleRow: {
    flexDirection: "row",
    marginVertical: 6,
    alignItems: "flex-end",
  },
  bubbleRowBot: {
    justifyContent: "flex-start",
  },
  bubbleRowUser: {
    justifyContent: "flex-end",
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 4,
  },
  botAvatarText: {
    fontSize: 16,
  },
  bubble: {
    maxWidth: "80%",
    padding: 14,
    borderRadius: 18,
    ...SHADOWS.sm,
  },
  bubbleBot: {
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bubbleUser: {
    backgroundColor: COLORS.primaryDark,
    borderBottomRightRadius: 4,
  },
  msgText: {
    fontSize: 14,
    lineHeight: 20,
  },
  msgTextBot: {
    color: COLORS.text,
  },
  msgTextUser: {
    color: COLORS.textLight,
  },
  msgFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
    marginTop: 6,
  },
  timestamp: {
    fontSize: 10,
  },
  timestampBot: {
    color: COLORS.textMuted,
  },
  timestampUser: {
    color: "#94A3B8",
  },
  audioIconBtn: {
    padding: 2,
  },
  audioIcon: {
    fontSize: 12,
  },
  inputArea: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.sm,
  },
  sendBtnText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: "bold",
  },
});
