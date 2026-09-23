import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Button, Switch } from "react-native-paper";
import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const changePIN = async (key) => {
    Alert.prompt(
      `Change ${key}`,
      "Enter new 4-digit PIN",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: async (pin) => {
            await SecureStore.setItemAsync(key, pin);
            Alert.alert("Success", `${key} updated`);
          },
        },
      ],
      "secure-text"
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Settings</Text>
      <Button mode="contained" onPress={() => changePIN("loginPIN")}>Change Login PIN</Button>
      <Button mode="contained" onPress={() => changePIN("transactionPIN")}>Change Transaction PIN</Button>

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
        <Text>Enable Biometric Unlock</Text>
        <Switch value={biometricEnabled} onValueChange={setBiometricEnabled} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
        <Text>Enable Voice Feedback</Text>
        <Switch value={voiceEnabled} onValueChange={setVoiceEnabled} />
      </View>

      <Button mode="contained" onPress={() => Alert.alert("Language", "Implement language selector")}>Select Language</Button>
    </View>
  );
}
