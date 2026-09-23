import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { api } from "../utils/api";
import { saveToken } from "../utils/secureStore";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleLogin = async () => {
    if (!phone || !pin) {
      Alert.alert("Error", "Phone and PIN are required");
      return;
    }

    try {
      const data = await api.login(phone, pin);
      console.log("API Response:", data);

      if (data.success) {
        await saveToken(data.token);

        Alert.alert("Success", "Logged in successfully");

        // 🔥 MOVE TO MAIN TABS
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }

    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>

      <Text style={{ fontSize: 26, fontWeight: "bold" }}>Login</Text>

      <TextInput
        placeholder="Phone"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 5,
        }}
      />

      <TextInput
        placeholder="PIN"
        secureTextEntry
        value={pin}
        onChangeText={setPin}
        style={{
          borderWidth: 1,
          marginVertical: 10,
          padding: 10,
          borderRadius: 5,
        }}
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={{ marginTop: 20 }}>
        <Button
          title="Don't have an account? Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>

    </View>
  );
}
