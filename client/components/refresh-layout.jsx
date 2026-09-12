import { ScrollView, RefreshControl } from "react-native";
import { useState } from "react";
import { useRestaurants } from "@/hooks/restaurant.hook";
import { useBooking } from "@/hooks/booking.hook";
import { useAuth } from "@/hooks/auth.hook";

export default function RefreshLayout({ children, ...props }) {
  const { refresh } = useRestaurants();
  const { getMyBookings } = useBooking();
  const { isAuthenticated } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    if (isAuthenticated) await getMyBookings();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
