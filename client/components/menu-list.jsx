import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Leaf, Drumstick } from "lucide-react-native";

import { useRestaurantDetails } from "@/hooks/restaurant.hook";
import { getActiveTab, subscribeActiveTab } from "@/utils/menu-state";

const renderItem = ({ item }) => {
  const isVeg = item.type === "Veg";
  const price = item.price || item.full;
  return (
    <View
      className="rounded-2xl bg-surface p-4"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View
            className="h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: isVeg ? "#e5f3e8" : "#fce7e4" }}
          >
            {isVeg ? (
              <Leaf size={15} color="#4f8a62" strokeWidth={2.5} />
            ) : (
              <Drumstick size={15} color="#d95d4f" strokeWidth={2.5} />
            )}
          </View>
          <Text className="ml-3 flex-1 font-dm-semibold text-sm text-text-primary">{item.name}</Text>
        </View>
        <View className="rounded-lg bg-surface-soft px-2.5 py-1">
          <Text className="font-dm-bold text-sm text-primary">₹{price}</Text>
        </View>
      </View>
      {item.full && item.half && (
        <View className="mt-3 flex-row items-center border-t border-border pt-2.5">
          <Text className="font-dm-medium text-xs text-text-secondary">Half</Text>
          <Text className="ml-auto font-dm-bold text-xs text-text-primary">₹{item.half}</Text>
          <View className="mx-3 h-3 w-px bg-border" />
          <Text className="font-dm-medium text-xs text-text-secondary">Full</Text>
          <Text className="ml-auto font-dm-bold text-xs text-text-primary">₹{item.full}</Text>
        </View>
      )}
    </View>
  );
};

const MenuList = () => {
  const { id } = useLocalSearchParams();
  const { restaurantDetails, detailLoading } = useRestaurantDetails(id);
  const [tab, setTab] = useState(getActiveTab());

  useEffect(() => subscribeActiveTab(() => setTab(getActiveTab())), []);

  if (detailLoading || !restaurantDetails) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="small" color="#1f4d3a" />
      </View>
    );
  }

  const menu = restaurantDetails.detail?.menu;

  return (
    <FlatList
      data={menu?.[tab] || []}
      key={tab}
      keyExtractor={(item, index) => `${tab}-${index}`}
      contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default MenuList;
