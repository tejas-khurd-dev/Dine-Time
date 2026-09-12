import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { RestaurantProvider } from "@/context/restaurant-context";
import { AuthProvider } from "@/context/auth-context";
import { BookingProvider } from "@/context/booking-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <RestaurantProvider>
          <BookingProvider>
            <StatusBar
              style="dark"
              backgroundColor="#FAF7F2"
              translucent={false}
            />
            <Stack screenOptions={{ headerShown: false }} />
          </BookingProvider>
        </RestaurantProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
