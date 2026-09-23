import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";
import * as Speech from "expo-speech";
import i18n from "../utils/i18n";

const responses = {
  en: {
    hello: "Hi! How can I help you?",
    payment: "To make a payment, scan a QR code from camera or gallery.",
    balance: "You can check your wallet balance in the Wallet tab.",
    wallet: "The Wallet tab shows your current balance and transactions.",
    pin: "You can set or change your Login and Transaction PIN in Settings.",
    qr: "Scan a QR code to pay safely. Red means high amount or suspicious.",
    chatbot: "I am here to help you with app features.",
    default: "Sorry, I didn't understand. Please ask about payments, wallet, QR, or PIN."
  },
  hi: {
    hello: "नमस्ते! मैं आपकी मदद कैसे करूँ?",
    payment: "भुगतान करने के लिए, कैमरा या गैलरी से QR कोड स्कैन करें।",
    balance: "आप अपना वॉलेट बैलेंस वॉलेट टैब में देख सकते हैं।",
    wallet: "वॉलेट टैब में आपका वर्तमान बैलेंस और लेन-देन दिखता है।",
    pin: "आप सेटिंग्स में लॉगिन और ट्रांजेक्शन PIN बदल सकते हैं।",
    qr: "QR कोड स्कैन करके सुरक्षित भुगतान करें। लाल रंग उच्च राशि या संदिग्ध है।",
    chatbot: "मैं ऐप फीचर्स में आपकी मदद करने के लिए यहां हूँ।",
    default: "माफ़ करें, मैं समझ नहीं पाया। कृपया भुगतान, वॉलेट, QR या PIN के बारे में पूछें।"
  },
  ka: {
    hello: "ಹೈ! ನಾನು ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಇಲ್ಲಿ ಇದ್ದೇನೆ.",
    payment: "ಪಾವತಿ ಮಾಡಲು ಕ್ಯಾಮೆರಾ ಅಥವಾ ಗ್ಯಾಲರಿ ಮೂಲಕ QR ಕೋಡ್ ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.",
    balance: "ನೀವು ನಿಮ್ಮ ವಾಲೆಟ್ ಬ್ಯಾಲೆನ್ಸ್ ಅನ್ನು ವಾಲೆಟ್ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಬಹುದು.",
    wallet: "ವಾಲೆಟ್ ಟ್ಯಾಬ್ ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಬ್ಯಾಲೆನ್ಸ್ ಮತ್ತು ವ್ಯವಹಾರಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.",
    pin: "ನೀವು ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಲಾಗಿನ್ ಮತ್ತು ಟ್ರಾನ್ಸಾಕ್ಷನ್ ಪಿನ್ ಅನ್ನು ಬದಲಾಯಿಸಬಹುದು.",
    qr: "ಪಾವತಿಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಮಾಡಲು QR ಕೋಡ್ ಅನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ. ಕೆಂಪು ಹೆಚ್ಚಿನ ಮೊತ್ತ ಅಥವಾ ಸಂಶಯಾಸ್ಪದವಾಗಿದೆ.",
    chatbot: "ನಾನು ಅಪ್ಲಿಕೇಶನ್ ವೈಶಿಷ್ಟ್ಯಗಳಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿ ಇದ್ದೇನೆ.",
    default: "ಕ್ಷಮಿಸಿ, ನಾನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪಾವತಿ, ವಾಲೆಟ್, QR ಅಥವಾ ಪಿನ್ ಬಗ್ಗೆ ಕೇಳಿ."
  },
  ml: {
    hello: "ഹായ്! ഞാൻ നിങ്ങളുടെ സഹായത്തിനായി ഇവിടെ ഉണ്ടു.",
    payment: "പേയ്മെന്റ് ചെയ്യാൻ ക്യാമറ അല്ലെങ്കിൽ ഗ്യാലറി വഴി QR കോഡ് സ്കാൻ ചെയ്യുക.",
    balance: "നിങ്ങളുടെ വാലറ്റ് ബാലൻസ് വാലറ്റ് ടാബിൽ പരിശോധിക്കാം.",
    wallet: "വാലറ്റ് ടാബ് നിങ്ങളുടെ നിലവിലെ ബാലൻസ്, ട്രാൻസാക്ഷനുകൾ കാണിക്കുന്നു.",
    pin: "ലോഗിൻ PIN, ട്രാൻസാക്ഷൻ PIN സജ്ജമാക്കുന്നതും മാറ്റുന്നതും സെറ്റിംഗ്സിൽ ചെയ്യാം.",
    qr: "സുരക്ഷിതമായി പേയ്‌മെന്റ് ചെയ്യാൻ QR കോഡ് സ്കാൻ ചെയ്യുക. ചുവപ്പ് നിറം ഉയർന്ന തുക അല്ലെങ്കിൽ സംശയാസ്പദം ആണ്.",
    chatbot: "ഞാൻ ആപ്പ് ഫീച്ചറുകളിൽ നിങ്ങളെ സഹായിക്കാൻ ഇവിടെ ഉണ്ടു.",
    default: "ക്ഷമിക്കണം, ഞാൻ മനസ്സിലായില്ല. ദയവായി പേയ്‌മെന്റ്, വാലറ്റ്, QR അല്ലെങ്കിൽ PIN സംബന്ധിച്ച ചോദ്യങ്ങൾ ചോദിക്കുക."
  }
};


export default function ChatbotScreen() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Detect language
    const lang = i18n.locale.startsWith("hi")
      ? "hi"
      : i18n.locale.startsWith("ka")
      ? "ka"
      : i18n.locale.startsWith("ml")
      ? "ml"
      : "en";

    // Keyword matching
    const keys = Object.keys(responses[lang]).filter(k => k !== "default");
    let matchedKey = keys.find(k => input.toLowerCase().includes(k));

    const answer = matchedKey ? responses[lang][matchedKey] : responses[lang].default;

    // Update chat
    setChat(prev => [...prev, { question: input, answer }]);
    setInput("");

    // Speak answer
    Speech.speak(answer, { language: lang });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        {chat.map((c, i) => (
          <View key={i} style={{ marginVertical: 5 }}>
            <Text style={{ fontWeight: "bold" }}>You: {c.question}</Text>
            <Text>Bot: {c.answer}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type your question..."
        style={{ borderWidth: 1, padding: 10, marginBottom: 5 }}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}
