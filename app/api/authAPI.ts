import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://laravel.test.react-native-back-end.orb.local/api";

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function login(email: string, password: string) {
  console.log("Logging in:", email);
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const userData = await res.json();
  console.log("Login response status:", userData);

  // Save token if present
  if (userData.token) {
    await AsyncStorage.setItem("authToken", userData.token);
  }

  return userData;
}

export async function logout() {
  await AsyncStorage.removeItem("authToken");
  await fetch(`${API_URL}/logout`, { method: "POST" });
}

// Helper to get token
export async function getToken() {
  return await AsyncStorage.getItem("authToken");
}
