import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { api } from "../utils/api";

export default function RegisterScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleRegister = async () => {
    if (!phone || !pin) {
      Alert.alert("Error", "Phone and PIN required");
      return;
    }

    const data = await api.register(phone, pin);

    if (data.success) {
      Alert.alert("Success", "Account created!");
      navigation.goBack();
    } else {
      Alert.alert("Error", data.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Create Account</Text>

      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />

      <TextInput
        placeholder="PIN"
        secureTextEntry
        value={pin}
        onChangeText={setPin}
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
