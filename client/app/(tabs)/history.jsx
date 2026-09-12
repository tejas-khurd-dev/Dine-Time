import { View, Text, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import { CalendarDays } from "lucide-react-native";
import { useBooking } from "@/hooks/booking.hook";
import { useAuth } from "@/hooks/auth.hook";
import BookingCard from "@/components/booking-card";

const History = () => {
  const { isAuthenticated } = useAuth();
  const { getMyBookings } = useBooking();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookings = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, [isAuthenticated])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF7F2" }}>
      <View className="flex-1 px-5 pt-3">
        <Text className="font-playfair-bold text-2xl text-text-primary">
          Bookings
        </Text>

        {loading ? (
          <View className="mt-16 items-center justify-center">
            <ActivityIndicator size="small" color="#1f4d3a" />
          </View>
        ) : !isAuthenticated ? (
          <View className="mt-16 items-center justify-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-soft">
              <CalendarDays size={28} color="#9ca39f" strokeWidth={1.5} />
            </View>
            <Text className="mt-4 font-dm-semibold text-base text-text-primary">
              Sign in to view bookings
            </Text>
          </View>
        ) : bookings.length === 0 ? (
          <View className="mt-16 items-center justify-center">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-soft">
              <CalendarDays size={28} color="#9ca39f" strokeWidth={1.5} />
            </View>
            <Text className="mt-4 font-dm-semibold text-base text-text-primary">
              No reservations yet
            </Text>
            <Text className="mt-1 font-dm-regular text-sm text-text-secondary">
              Your booking history will appear here
            </Text>
          </View>
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingTop: 18, paddingBottom: 26 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <BookingCard booking={item} />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default History;
