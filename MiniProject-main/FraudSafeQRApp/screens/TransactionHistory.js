import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      const tx = JSON.parse(await AsyncStorage.getItem("transactions")) || [];
      setTransactions(tx);
    })();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={transactions}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}>
            <Text>Amount: {item.amount}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}
