import React from "react";
import { View, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function QRGalleryScanner() {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      Alert.alert("Selected image URI", result.assets[0].uri);
      // Optional: decode QR using jsQR or library
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick Image and Scan QR" onPress={pickImage} />
    </View>
  );
}
