import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Bell, Search, SlidersHorizontal, UtensilsCrossed, LogIn} from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/auth.hook";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <View className="bg-background pb-4">
      <View className="mt-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <UtensilsCrossed
            size={20}
            color="#f4a261"
            strokeWidth={2.4}
          />

          <View className="ml-2">
            <Text className="font-playfair-bold text-2xl text-primary">
              Dine <Text className="text-secondary">Time</Text>
            </Text>

            <Text className="mt-0.5 font-dm-regular text-xs text-text-secondary">
              Find your table, your time
            </Text>
          </View>
        </View>

        {isAuthenticated ? (
          <TouchableOpacity
            activeOpacity={0.7}
            className="h-11 w-11 items-center justify-center rounded-full bg-surface-soft"
          >
            <Bell size={20} color="#24332d" strokeWidth={2} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center rounded-full bg-primary px-4 py-2.5"
            onPress={() => router.push("/(auth)/sign-in")}
          >
            <LogIn size={16} color="#fff" strokeWidth={2} />
            <Text className="ml-1.5 font-dm-semibold text-sm text-white">Login</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search */}
      <View className="mt-5 h-12 flex-row items-center rounded-xl border border-border bg-surface px-3.5">
        <Search size={18} color="#9ca39f" strokeWidth={2} />

        <TextInput
          placeholder="Search restaurants or cuisines"
          placeholderTextColor="#9ca39f"
          className="ml-2 flex-1 font-dm-regular text-sm text-text-primary"
        />

        <TouchableOpacity activeOpacity={0.7}>
          <SlidersHorizontal
            size={18}
            color="#6b746f"
            strokeWidth={2}
          />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Header
