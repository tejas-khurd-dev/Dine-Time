import "@/global.css";

import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/auth.hook";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "DM-Sans-Regular": require("@expo-google-fonts/dm-sans").DMSans_400Regular,
    "DM-Sans-Medium": require("@expo-google-fonts/dm-sans").DMSans_500Medium,
    "DM-Sans-SemiBold": require("@expo-google-fonts/dm-sans").DMSans_600SemiBold,
    "DM-Sans-Bold": require("@expo-google-fonts/dm-sans").DMSans_700Bold,
    "Playfair-Regular": require("@expo-google-fonts/playfair-display").PlayfairDisplay_400Regular,
    "Playfair-SemiBold": require("@expo-google-fonts/playfair-display").PlayfairDisplay_600SemiBold,
    "Playfair-Bold": require("@expo-google-fonts/playfair-display").PlayfairDisplay_700Bold,
  });

  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, authLoading]);

  if (!loaded && !error) return null;

  if (authLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#faf7f2" }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1f4d3a" />
        </View>
      </SafeAreaView>
    );
  }

  if (isAuthenticated) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#faf7f2" }}>
      <View className="relative flex-1 items-center justify-center px-9">
        <View className="absolute -top-16 -right-20 h-52 w-52 rounded-full bg-primary-light/20" />
        <View className="absolute top-24 -left-16 h-40 w-40 rounded-full bg-secondary-light/40" />

        <View className="items-center">
          <Image
            source={require("@/assets/images/logo.png")}
            className="h-40 w-80"
            resizeMode="contain"
          />
          <View className="mt-3 h-1 w-12 rounded-full bg-secondary" />
          <Text className="mt-4 font-dm-medium text-sm tracking-wide text-text-secondary">
            BOOK A TABLE. MAKE MEMORIES.
          </Text>
        </View>

        <View className="mt-16 w-full">
          <TouchableOpacity
            activeOpacity={0.85}
            className="h-14 items-center justify-center rounded-xl bg-primary"
            onPress={() => router.navigate("/sign-up")}
          >
            <Text className="font-dm-bold text-base text-white">Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-4 h-14 items-center justify-center rounded-xl border border-primary bg-surface/50"
            onPress={() => router.navigate("/home")}
          >
            <Text className="font-dm-semibold text-base text-primary">
              Continue as Guest
            </Text>
          </TouchableOpacity>

          <View className="mt-6 flex-row items-center justify-center">
            <View className="h-px flex-1 bg-border" />
            <Text className="mx-4 font-dm-regular text-sm text-text-muted">
              or
            </Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          <View className="mt-5 flex-row items-center justify-center">
            <Text className="font-dm-regular text-sm text-text-secondary">
              Already a User?
            </Text>
            <TouchableOpacity
              onPress={() => router.navigate("/sign-in")}
              activeOpacity={0.7}
              className="ml-1"
            >
              <Text className="font-dm-bold text-sm text-secondary">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="absolute bottom-0 left-0 right-0 items-center">
          <Image
            source={require("@/assets/images/dine-footer.png")}
            className="h-32 w-80"
            resizeMode="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
