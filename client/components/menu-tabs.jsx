import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { menuTabs, getActiveTab, setActiveTab, subscribeActiveTab } from "@/utils/menu-state";

const MenuTabs = () => {
  const [active, setActive] = useState(getActiveTab());

  useEffect(() => subscribeActiveTab(() => setActive(getActiveTab())), []);

  return (
    <View className="mt-3 flex-row rounded-2xl bg-surface-soft p-1">
      {menuTabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          activeOpacity={0.8}
          onPress={() => setActiveTab(tab.key)}
          className="flex-1 items-center rounded-xl py-2.5"
          style={
            active === tab.key
              ? {
                  backgroundColor: "#1f4d3a",
                  shadowColor: "#1f4d3a",
                  shadowOpacity: 0.25,
                  shadowRadius: 5,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 3,
                }
              : { backgroundColor: "transparent" }
          }
        >
          <Text
            className="font-dm-semibold text-xs"
            style={{ color: active === tab.key ? "#ffffff" : "#6b746f" }}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuTabs;
