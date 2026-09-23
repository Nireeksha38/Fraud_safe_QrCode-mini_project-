import React, { useState, useEffect } from "react";
import { View, Button, Alert, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { confirmTransaction } from "../utils/transaction";

export default function QRScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Request camera permission once
  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  // If permission still loading
  if (!permission) {
    return <Text style={styles.msg}>Checking camera permission...</Text>;
  }

  // If camera permission denied
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>Camera permission required</Text>
        <Button title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  // QR Scan Handler
  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    try {
      const parsed = JSON.parse(data);

      let status = "green";
      if (parsed.amount > 5000) status = "red";

      Speech.speak(
        status === "green" ? "Payment Safe" : "High Amount",
        { language: "en" }
      );

      confirmTransaction(parsed.amount, async () => {
        const tx = {
          ...parsed,
          status,
          date: new Date().toISOString(),
        };

        const oldTx =
          JSON.parse(await AsyncStorage.getItem("transactions")) || [];

        await AsyncStorage.setItem(
          "transactions",
          JSON.stringify([...oldTx, tx])
        );

        Alert.alert("Transaction Done", `Status: ${status}`);
      });

    } catch (e) {
      Alert.alert("Invalid QR", "QR Code data is not valid JSON");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={{ flex: 1 }}
      />

      {scanned && (
        <View style={styles.scanAgain}>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  msg: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanAgain: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});
