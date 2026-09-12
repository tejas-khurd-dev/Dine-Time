import { View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Modal from "react-native-modal";
import {
  Mail,
  LogOut,
  ChevronRight,
  Bell,
  CreditCard,
  HelpCircle,
  Settings,
  Pencil,
  X,
} from "lucide-react-native";
import { useAuth } from "@/hooks/auth.hook";
import RefreshLayout from "@/components/refresh-layout";

const menuItems = [
  { icon: Bell, label: "Notifications", route: null },
  { icon: CreditCard, label: "Payment Methods", route: null },
  { icon: Settings, label: "Settings", route: null },
  { icon: HelpCircle, label: "Help & Support", route: null },
];

const Profile = () => {
  const router = useRouter();
  const { user, isAuthenticated, handleLogout, handleUpdateUsername } = useAuth();
  const [editVisible, setEditVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [saving, setSaving] = useState(false);

  const confirmLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await handleLogout();
          router.replace("/");
        },
      },
    ]);
  };

  const openEdit = () => {
    setNewUsername(user?.username || "");
    setEditVisible(true);
  };

  const saveUsername = async () => {
    const trimmed = newUsername.trim();
    if (!trimmed) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }
    setSaving(true);
    try {
      await handleUpdateUsername(trimmed);
      setEditVisible(false);
      Alert.alert("Success", "Username updated successfully");
    } catch (error) {
      const msg = error?.response?.data?.msg || "Failed to update username";
      Alert.alert("Error", msg);
    } finally {
      setSaving(false);
    }
  };

  const getInitial = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAF7F2" }}>
      <RefreshLayout
        className="flex-1"
        contentContainerClassName="px-5 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mt-3 font-playfair-bold text-2xl text-text-primary">
          Profile
        </Text>

        {/* User Card */}
        <View className="mt-6 items-center rounded-2xl bg-surface p-6 shadow-sm">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
            <Text className="font-dm-bold text-2xl text-white">
              {getInitial()}
            </Text>
          </View>

          <View className="mt-4 flex-row items-center gap-2">
            <Text className="font-dm-bold text-lg text-text-primary">
              {user?.username || "Guest User"}
            </Text>
            {isAuthenticated && (
              <TouchableOpacity activeOpacity={0.7} onPress={openEdit}>
                <Pencil size={16} color="#1f4d3a" strokeWidth={2} />
              </TouchableOpacity>
            )}
          </View>

          {user?.email ? (
            <View className="mt-1 flex-row items-center">
              <Mail size={14} color="#6b746f" />
              <Text className="ml-1.5 font-dm-regular text-sm text-text-secondary">
                {user.email}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Menu Items */}
        <View className="mt-6 rounded-2xl bg-surface">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between px-5 py-4 ${index < menuItems.length - 1 ? "border-b border-border" : ""
                }`}
            >
              <View className="flex-row items-center">
                <item.icon size={20} color="#6b746f" strokeWidth={1.8} />
                <Text className="ml-3 font-dm-medium text-sm text-text-primary">
                  {item.label}
                </Text>
              </View>
              <ChevronRight size={18} color="#9ca39f" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout / Sign In */}
        {isAuthenticated ? (
          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-6 flex-row items-center justify-center rounded-2xl border border-error/30 bg-error-light py-4"
            onPress={confirmLogout}
          >
            <LogOut size={20} color="#d95d4f" strokeWidth={1.8} />
            <Text className="ml-2 font-dm-semibold text-sm text-error">
              Sign Out
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            className="mt-6 flex-row items-center justify-center rounded-2xl bg-primary py-4"
            onPress={() => router.navigate("/(auth)/sign-in")}
          >
            <Text className="font-dm-semibold text-sm text-white">
              Sign In
            </Text>
          </TouchableOpacity>
        )}
      </RefreshLayout>

      {/* Edit Username Modal */}
      <Modal
        isVisible={editVisible}
        onBackdropPress={() => setEditVisible(false)}
        onBackButtonPress={() => setEditVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setEditVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.4}
        avoidKeyboard
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View className="rounded-t-3xl bg-surface px-5 pt-5 pb-8">
          <View className="flex-row items-center justify-between">
            <Text className="font-dm-bold text-lg text-text-primary">
              Edit Username
            </Text>
            <TouchableOpacity onPress={() => setEditVisible(false)} activeOpacity={0.7}>
              <X size={22} color="#6b746f" />
            </TouchableOpacity>
          </View>

          <TextInput
            value={newUsername}
            onChangeText={setNewUsername}
            placeholder="Enter new username"
            placeholderTextColor="#9ca39f"
            className="mt-5 rounded-xl border border-border bg-background px-4 py-3.5 font-dm-regular text-sm text-text-primary"
            autoFocus
          />

          <View className="mt-5 flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.85}
              className="h-12 flex-1 items-center justify-center rounded-xl border border-border"
              onPress={() => setEditVisible(false)}
            >
              <Text className="font-dm-semibold text-sm text-text-secondary">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={saving}
              className={`h-12 flex-[2] items-center justify-center rounded-xl ${saving ? "bg-border" : "bg-primary"}`}
              onPress={saveUsername}
            >
              {saving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text className="font-dm-bold text-sm text-white">Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
