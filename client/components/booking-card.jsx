import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { CalendarDays, Clock } from "lucide-react-native";
import { formatBookingDate } from "@/hooks/booking.hook";
import { useRouter } from "expo-router";

const BookingCard = ({ booking }) => {
  const router = useRouter();
  const restaurantId = booking.restaurant?._id || booking.restaurant;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="mb-3 flex-row overflow-hidden rounded-2xl bg-surface"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
      onPress={() => restaurantId && router.push(`/restaurants/${restaurantId}`)}
    >
      {booking.restaurant?.image ? (
        <Image
          source={{ uri: booking.restaurant.image }}
          className="h-full w-24"
          resizeMode="cover"
        />
      ) : null}

      <View className="flex-1 p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="font-dm-bold text-base text-text-primary">
              {booking.restaurant?.name || booking.restaurantName || "Restaurant"}
            </Text>
            <Text className="mt-1 font-dm-regular text-xs text-text-secondary">
              {booking.restaurant?.cuisine}
            </Text>
          </View>
          <View className="rounded-lg bg-primary/10 px-2.5 py-1">
            <Text className="font-dm-semibold text-xs text-primary">{booking.time}</Text>
          </View>
        </View>

        <View className="mt-3 flex-row items-center gap-4">
          <View className="flex-row items-center">
            <CalendarDays size={14} color="#6b746f" />
            <Text className="ml-1.5 font-dm-medium text-xs text-text-secondary">
              {formatBookingDate(booking.date)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={14} color="#6b746f" />
            <Text className="ml-1.5 font-dm-medium text-xs text-text-secondary">
              Expires {booking.expiryTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
