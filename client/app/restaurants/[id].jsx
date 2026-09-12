import "@/global.css";

import { View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import RestaurantCarousel from "@/components/restaurant-carousel";
import RestaurantInfo from "@/components/restaurant-info";
import MenuTabs from "@/components/menu-tabs";
import MenuList from "@/components/menu-list";
import BookBar from "@/components/book-bar";

const Restaurant = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#faf7f2" }} edges={["top"]}>
      <View style={{ flex: 1 }}>
        <RestaurantCarousel />
        <RestaurantInfo />
        <View style={{ paddingHorizontal: 20 }}>
          <MenuTabs />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16 }}>
          <MenuList />
        </View>
        <BookBar />
      </View>
    </SafeAreaView>
  );
};

export default Restaurant;
