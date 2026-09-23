import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WalletScreen() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      const bal = parseFloat(await AsyncStorage.getItem("wallet")) || 10000;
      setBalance(bal);
    })();
  }, []);

  const addMoney = async () => {
    const bal = balance + 500;
    await AsyncStorage.setItem("wallet", bal.toString());
    setBalance(bal);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Wallet Balance: ₹{balance}</Text>
      <Button title="Add ₹500" onPress={addMoney} />
    </View>
  );
}
