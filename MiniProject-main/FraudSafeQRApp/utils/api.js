// utils/api.js

const BASE_URL = "http://10.83.94.207:8000";   // Backend server URL

export const api = {
  login: async (phone, pin) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pin }),
      });

      return await res.json();
    } catch (error) {
      console.log("Login API error:", error);
      return { success: false, message: "Network error" };
    }
  },

  register: async (phone, pin) => {
    try {
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, pin }),
      });

      return await res.json();
    } catch (error) {
      console.log("Register API error:", error);
      return { success: false, message: "Network error" };
    }
  },
};
