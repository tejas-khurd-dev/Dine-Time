import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { Star, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";

import { useRestaurants } from "@/hooks/restaurant.hook";

const HeroRestaurants = () => {
  const router = useRouter();
  const { restaurants, loading } = useRestaurants();

  const randomRestaurants = [...restaurants]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <>
      <View className="mt-7 flex-row items-center justify-between">
        <Text className="font-dm-bold text-lg text-text-primary">
          Popular Restaurants
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.navigate("/restaurants")}
        >
          <Text className="font-dm-medium text-sm text-secondary">
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="mt-4 items-center justify-center">
          <ActivityIndicator size="small" color="#1f4d3a" />
        </View>
      ) : (
        <FlatList
          horizontal
          data={randomRestaurants}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16 }}
          className="mt-4 pb-3"
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              className="w-40"
              onPress={() => router.navigate(`/restaurants/${item._id}`)}
            >
              <View className="h-28 w-40 overflow-hidden rounded-xl bg-surface-soft">
                <Image
                  source={{ uri: item.image }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="absolute right-2 top-2 h-7 w-7 items-center justify-center rounded-full bg-white/85"
                >
                  <Star size={13} color="#e59b45" strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <Text
                numberOfLines={1}
                className="mt-2 font-dm-semibold text-sm text-text-primary"
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                className="mt-0.5 font-dm-regular text-xs text-text-secondary"
              >
                {item.cuisine}
              </Text>
              <View className="mt-1 flex-row items-center">
                <Star size={12} color="#e59b45" strokeWidth={2} fill="#e59b45" />
                <Text className="ml-1 font-dm-medium text-xs text-warning">
                  {item.rating}
                </Text>
                <Text className="mx-1 text-xs text-text-secondary">•</Text>
                <MapPin size={12} color="#6b746f" strokeWidth={2} />
                <Text className="ml-0.5 font-dm-regular text-xs text-text-secondary">
                  {item.distance}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </>
  );
};

export default HeroRestaurants;
