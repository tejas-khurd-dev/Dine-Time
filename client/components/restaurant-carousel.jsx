import { View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Carousel } from "react-native-reanimated-carousel";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

import { useRestaurantDetails } from "@/hooks/restaurant.hook";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const H_PADDING = 20;
const IMAGE_HEIGHT = 188;
const IMAGE_WIDTH = SCREEN_WIDTH - H_PADDING * 2;

const RestaurantCarousel = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { restaurantDetails, detailLoading } = useRestaurantDetails(id);

  if (detailLoading || !restaurantDetails) {
    return (
      <View
        style={{ height: IMAGE_HEIGHT + 16, paddingHorizontal: H_PADDING, paddingTop: 16 }}
        className="items-center justify-center"
      >
        <ActivityIndicator size="small" color="#1f4d3a" />
      </View>
    );
  }

  const detail = restaurantDetails.detail;
  const images = [
    detail?.image1, detail?.image2, detail?.image3,
    detail?.image4, detail?.image5, detail?.image6,
  ].filter(Boolean);

  return (
    <View style={{ height: IMAGE_HEIGHT + 16, paddingHorizontal: H_PADDING, paddingTop: 16 }} className="-mt-2 mb-5 mr-2 pr-[9px]">
      <Carousel
        style={{ width: "100%", height: IMAGE_HEIGHT }}
        data={images}
        loop
        autoPlay
        autoPlayInterval={3000}
        width={IMAGE_WIDTH}
        scrollAnimationDuration={600}
        renderItem={({ item }) => (
          <View
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              overflow: "hidden",
              borderRadius: 20,
            }}
          >
            <Image
              source={{ uri: item }}
              style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.back()}
        className="absolute h-10 w-10 items-center justify-center rounded-full bg-white/90"
        style={{
          left: H_PADDING + 7,
          top: 25,
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}
      >
        <ArrowLeft size={20} color="#24332d" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

export default RestaurantCarousel;
