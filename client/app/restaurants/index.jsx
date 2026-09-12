import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { Star, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRestaurants } from "@/hooks/restaurant.hook";
import RefreshLayout from "@/components/refresh-layout";

const Restaurants = () => {
  const router = useRouter();
  const { restaurants, loading } = useRestaurants();

  const randomRestaurants = [...restaurants].sort(() => Math.random() - 0.5);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#faf7f2" }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1f4d3a" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#faf7f2" }}>
      <RefreshLayout
        className="flex-1"
        contentContainerClassName="px-5 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mt-3 font-playfair-bold text-2xl text-text-primary">
          Restaurants
        </Text>
        <Text className="mt-1 font-dm-regular text-sm text-text-secondary">
          {randomRestaurants.length} places to explore
        </Text>

        <FlatList
          data={randomRestaurants}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{ gap: 18, paddingTop: 20, paddingBottom: 24 }}
          ListEmptyComponent={
            <Text className="mt-10 text-center font-dm-regular text-sm text-text-secondary">
              No restaurants found.
            </Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              className="overflow-hidden rounded-2xl bg-surface"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 3,
              }}
              onPress={() => router.push(`/restaurants/${item._id}`)}
            >
              <Image
                source={{ uri: item.image }}
                className="h-44 w-full"
                resizeMode="cover"
              />

              <View className="p-4">
                <Text
                  numberOfLines={1}
                  className="font-dm-bold text-base text-text-primary"
                >
                  {item.name}
                </Text>
                <Text className="mt-1 font-dm-regular text-sm text-text-secondary">
                  {item.cuisine}
                </Text>
                <View className="mt-3 flex-row items-center">
                  <View
                    className="flex-row items-center rounded-full bg-warning-light"
                    style={{ paddingHorizontal: 8, paddingVertical: 3 }}
                  >
                    <Star size={13} color="#e59b45" fill="#e59b45" />
                    <Text className="ml-1 font-dm-semibold text-xs text-warning">
                      {item.rating}
                    </Text>
                  </View>
                  <View className="ml-3 flex-row items-center">
                    <MapPin size={14} color="#6b746f" />
                    <Text className="ml-1 font-dm-regular text-xs text-text-secondary">
                      {item.distance}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </RefreshLayout>
    </SafeAreaView>
  );
};

export default Restaurants;
