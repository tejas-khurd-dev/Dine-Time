import { View, Text, TouchableOpacity, Image, FlatList, Platform, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cuisines } from "@/assets/data/constants";
import Header from "@/components/header";
import HeroBanner from "@/components/hero-banners";
import HeroRestaurants from "@/components/hero-restaurants";
import { useRestaurants } from "@/hooks/restaurant.hook";
import { useRouter } from "expo-router";
import RefreshLayout from "@/components/refresh-layout";




const Home = () => {
  const router = useRouter();

  const { restaurants, loading } = useRestaurants();
  
  const randomRestaurants = [...restaurants]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: "#FAF7F2" },
        Platform.OS === "android" && { paddingBottom: 2 },
        Platform.OS === "ios" && { paddingBottom: 4 },
      ]}
    >
      <RefreshLayout
        className={`flex-1 ${Platform.OS === "ios" ? "pt-2" : "pt-0"}`}
        contentContainerClassName="px-5 pb-10"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        {/* Header + Search */}
        <Header />

        {/* Banner Carousel */}
        <HeroBanner />

        {/* Popular Restaurants */}
        <HeroRestaurants />

        

        {/* Top Cuisines */}
        <View className="mt-8 flex-row items-center justify-between">
          <Text className="font-dm-bold text-lg text-text-primary">
            Top Cuisines
          </Text>

          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/restaurants")}>
            <Text className="font-dm-medium text-sm text-secondary">
              See all
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={cuisines}
          keyExtractor={(item) => `cuisine-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 20,
          }}
          className="mt-4"
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} className="w-16 items-center">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-soft">
                <Text className="text-2xl">{item.icon}</Text>
              </View>

              <Text
                numberOfLines={1}
                className="mt-2 font-dm-regular text-xs text-text-secondary"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Special Offers */}
        <View className="mt-8 flex-row items-center justify-between">
          <Text className="font-dm-bold text-lg text-text-primary">
            Special Offers
          </Text>

          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/restaurants")}>
            <Text className="font-dm-medium text-sm text-secondary">
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
            <View className="mt-4 items-center justify-center">
              <ActivityIndicator size="small" />
            </View>
          ) : (
            <FlatList
              horizontal
              data={randomRestaurants}
              keyExtractor={(item) => `offer-${item._id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 14,
              }}
              className="mt-4"
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.85}
                  className="w-64 flex-row items-center overflow-hidden rounded-2xl border border-border bg-surface p-2.5"
                  onPress={() => router.navigate(`/restaurants/${item._id}`)}
                >
                  <View className="h-16 w-16 overflow-hidden rounded-xl bg-surface-soft">
                    <Image
                      source={{ uri: item.image }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  </View>

                  <View className="ml-3 flex-1">
                    <View className="self-start rounded-full bg-secondary-light px-2 py-0.5">
                      <Text className="font-dm-semibold text-[10px] text-secondary">
                        25% OFF
                      </Text>
                    </View>

                    <Text
                      numberOfLines={1}
                      className="mt-1.5 font-dm-semibold text-sm text-text-primary"
                    >
                      {item.name}
                    </Text>

                    <Text
                      numberOfLines={1}
                      className="mt-0.5 font-dm-regular text-xs text-text-secondary"
                    >
                      Valid till this weekend
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )
        }
        

        {/* Book a Table CTA */}
        <TouchableOpacity
          activeOpacity={0.9}
          className="mt-8 flex-row items-center justify-between overflow-hidden rounded-2xl bg-primary px-5 py-5"
        >
          <View className="flex-1 pr-3">
            <Text className="font-dm-bold text-base text-white">
              Planning something special?
            </Text>

            <Text className="mt-1 font-dm-regular text-xs text-white/80">
              Reserve a table in just a few taps.
            </Text>
          </View>

          <View className="rounded-full bg-white/15 px-4 py-2.5">
            <Text className="font-dm-semibold text-xs text-white">
              Book Now
            </Text>
          </View>
        </TouchableOpacity>
      </RefreshLayout>
    </SafeAreaView>
  );
};

export default Home;
