import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Star, MapPin, Clock } from "lucide-react-native";

import { useRestaurants } from "@/hooks/restaurant.hook";

const RestaurantInfo = () => {
  const { id } = useLocalSearchParams();
  const { restaurants, loading } = useRestaurants();

  if (loading || !restaurants.length) {
    return (
      <View className="items-center justify-center bg-surface px-5 py-8">
        <ActivityIndicator size="small" color="#1f4d3a" />
      </View>
    );
  }

  const restaurant = restaurants.find((r) => r._id === id || r.id === id);
  if (!restaurant) return null;

  return (
    <View
      className="bg-surface px-5 pb-4 pt-4"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <Text className="font-playfair-bold text-2xl text-text-primary">{restaurant.name}</Text>

      <View className="mt-2.5 flex-row items-center gap-2">
        <Text className="font-dm-medium text-sm text-text-secondary">{restaurant.cuisine}</Text>
        <View className="h-1 w-1 rounded-full bg-text-muted" />
        <View className="flex-row items-center rounded-full bg-warning-light px-2 py-0.5">
          <Star size={12} color="#e59b45" fill="#e59b45" />
          <Text className="ml-0.5 font-dm-semibold text-xs text-warning">{restaurant.rating}</Text>
        </View>
        <View className="h-1 w-1 rounded-full bg-text-muted" />
        <View className="flex-row items-center">
          <MapPin size={12} color="#6b746f" strokeWidth={2} />
          <Text className="ml-0.5 font-dm-regular text-xs text-text-secondary">{restaurant.distance}</Text>
        </View>
      </View>

      <View className="mt-2.5 flex-row items-center pb-2">
        <Clock size={13} color="#4f8a62" strokeWidth={2.5} />
        <Text className="ml-1.5 font-dm-medium text-xs text-success">Open now • 11:00 AM – 11:00 PM</Text>
      </View>
    </View>
  );
};

export default RestaurantInfo;
