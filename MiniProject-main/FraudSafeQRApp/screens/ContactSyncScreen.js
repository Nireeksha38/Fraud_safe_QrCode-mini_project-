import React, { useState } from "react";
import { View, Text, FlatList, Alert, Button } from "react-native";
import * as Contacts from 'expo-contacts';

export default function ContactSyncScreen() {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.PhoneNumbers] });
      setContacts(data);
      Alert.alert("Contacts Loaded", `${data.length} contacts found`);
    } else {
      Alert.alert("Permission Denied", "Cannot access contacts");
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Load Contacts" onPress={loadContacts} />
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
            {item.phoneNumbers?.map((p, i) => (<Text key={i}>{p.number}</Text>))}
          </View>
        )}
      />
    </View>
  );
}
