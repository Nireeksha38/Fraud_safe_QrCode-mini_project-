import * as SecureStore from "expo-secure-store";

export const saveToken = async (token) => {
  await SecureStore.setItemAsync("auth_token", token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("auth_token");
};

export const clearToken = async () => {
  await SecureStore.deleteItemAsync("auth_token");
};
