import { getItem } from "./secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as Speech from "expo-speech";

export async function confirmTransaction(amount, onSuccess) {
  const txnPin = await getItem("transactionPIN");
  Alert.prompt(
    "Enter Transaction PIN",
    "Confirm your transaction",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async (pin) => {
          if (pin === txnPin) {
            let balance = parseFloat(await AsyncStorage.getItem("wallet")) || 10000;
            balance -= amount;
            await AsyncStorage.setItem("wallet", balance.toString());

            const txHistory = JSON.parse(await AsyncStorage.getItem("transactions")) || [];
            txHistory.push({ amount, status: "Success", date: new Date().toISOString() });
            await AsyncStorage.setItem("transactions", JSON.stringify(txHistory));

            Speech.speak("Transaction successful", { language: "en" });
            onSuccess && onSuccess();
          } else {
            Speech.speak("Incorrect PIN", { language: "en" });
            Alert.alert("Error", "Incorrect Transaction PIN");
          }
        },
      },
    ],
    "secure-text"
  );
}
