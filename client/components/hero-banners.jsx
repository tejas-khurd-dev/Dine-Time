import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Carousel } from "react-native-reanimated-carousel"
import { banners } from '@/assets/data/constants';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_WIDTH = SCREEN_WIDTH;
const BANNER_HEIGHT = 176;


const HeroBanners = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View className="mt-4 ">
      <Carousel
        style={{ width: "100%", height: BANNER_HEIGHT}}
        data={banners}
        loop
        autoplay
        autoplayInterval={5000}
        itemSize={BANNER_WIDTH}
    
        onProgressChange={(progress) =>
          setActiveIndex(Math.round(progress) % banners.length)
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT, alignSelf: "center" }}
            className="overflow-hidden px-6 ml-[7px]"
          >
            <Image
              source={{ uri: item.image }}
              className="absolute h-full w-full rounded-2xl"
              resizeMode="cover"
            />

            {/* Dark gradient-style scrim for text legibility */}
            <View className="absolute h-full w-full rounded-2xl bg-black/40" />

            <View className="flex-1 justify-center">
              <Text
                className="font-dm-semibold text-[10px] uppercase text-white/90"
                style={{ letterSpacing: 1.2 }}
              >
                {item.subtitle}
              </Text>

              <Text
                className="mt-1 font-playfair-bold text-2xl leading-7 text-white "
                style={{
                  textShadowColor: "rgba(0,0,0,0.35)",
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 4,
                }}
              >
                {item.title}
              </Text>

              <View className="mt-3 self-start rounded-full bg-white/20 px-3.5 py-1.5">
                <Text className="font-dm-semibold text-[11px] text-white">
                  Explore restaurants
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Dot Indicators */}
      <View className="mt-3 flex-row items-center justify-center">
        {banners.map((_, index) => (
          <View
            key={index}
            className="mx-1 rounded-full"
            style={{
              width: index === activeIndex ? 18 : 6,
              height: 6,
              backgroundColor:
                index === activeIndex ? "#1f4d3a" : "#eae4dc",
            }}
          />
        ))}
      </View>
    </View>
  )
}

export default HeroBanners
