import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://dine-time-bupe.onrender.com/api";

const api = axios.create({
  baseURL: `${BASE_URL}/restaurant`,
});

export async function getAllRestaurants() {
  const response = await api.get("/");
  return response.data;
}

export async function getRestaurantById(id) {
  const response = await api.get(`/${id}`);
  return response.data;
}
