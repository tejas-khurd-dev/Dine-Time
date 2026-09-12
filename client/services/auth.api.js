import axios from "axios";
import * as SecureStore from "expo-secure-store";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://dine-time-bupe.onrender.com/api";

const api = axios.create({
  baseURL: `${BASE_URL}/auth`,
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function sendOTP({ username, email, password }) {
  const response = await api.post("/send-otp", { username, email, password });
  return response.data;
}

export async function registration({ email, otp }) {
  const response = await api.post("/register", { email, otp });
  return response.data;
}

export async function login({ email, password }) {
  const response = await api.post("/login", { email, password });
  return response.data;
}

export async function logout() {
  await api.get("/logout");
}

export async function getMe() {
  const response = await api.get("/get-me");
  return response.data;
}

export async function updateUsername(username) {
  const response = await api.put("/update-username", { username });
  return response.data;
}
