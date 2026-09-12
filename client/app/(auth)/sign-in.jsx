import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/auth.hook";

const SignIn = () => {
  const router = useRouter();
  const { handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    let eError = "";
    if (!email.trim()) {
      eError = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      eError = "Enter a valid email";
    }
    setEmailError(eError);

    let pError = "";
    if (!password) {
      pError = "Password is required";
    } else if (password.length < 6) {
      pError = "Password must be at least 6 characters";
    }
    setPasswordError(pError);

    if (eError || pError) return;

    setSubmitting(true);
    try {
      await handleLogin({ email: email.trim(), password });
      router.replace("/home");
    } catch (err) {
      setEmailError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="flex-grow items-center justify-center px-8"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center">
        <Image
          source={require("@/assets/images/logo.png")}
          className="h-28 w-56"
          resizeMode="contain"
        />
        <View className="mt-3 h-1 w-12 rounded-full bg-secondary" />
        <Text className="mt-4 font-dm-medium text-xs tracking-widest text-text-muted">
          BOOK A TABLE. MAKE MEMORIES.
        </Text>
      </View>

      <View className="mt-10 w-full items-center justify-center">
        <Text className="font-playfair-bold text-2xl text-text-primary">
          Welcome back
        </Text>
        <Text className="mt-2 font-dm-regular text-sm text-text-secondary">
          Sign in to your DineTime account
        </Text>
      </View>

      <View className="mt-8 w-full">
        <View className="mb-3.5">
          <Text className="mb-2 font-dm-medium text-xs text-text-secondary">
            Email
          </Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#b0b0aa"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError("");
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            className="h-14 rounded-2xl border border-border bg-surface font-dm-regular text-text-primary"
            style={{ paddingHorizontal: 16 }}
          />
          {emailError ? (
            <Text className="mt-1.5 font-dm-regular text-xs text-error">
              {emailError}
            </Text>
          ) : null}
        </View>

        <View className="mb-2">
          <Text className="mb-2 font-dm-medium text-xs text-text-secondary">
            Password
          </Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#b0b0aa"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            className="h-14 rounded-2xl border border-border bg-surface font-dm-regular text-text-primary"
            style={{ paddingHorizontal: 16 }}
          />
          {passwordError ? (
            <Text className="mt-1.5 font-dm-regular text-xs text-error">
              {passwordError}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={submitting}
          className={`mt-7 h-14 items-center justify-center rounded-2xl bg-primary ${
            submitting ? "opacity-60" : ""
          }`}
          style={{
            shadowColor: "#1f4d3a",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
          onPress={handleSubmit}
        >
          <Text className="font-dm-bold text-base text-white">
            {submitting ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="font-dm-regular text-sm text-text-muted">
          New here?{" "}
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate("/sign-up")}
          activeOpacity={0.7}
          disabled={submitting}
        >
          <Text className="font-dm-bold text-sm text-primary">
            Create an account
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-6 mt-12 font-dm-regular text-xs text-text-muted">
        Discover • Reserve • Dine
      </Text>
    </ScrollView>
  );
};

export default SignIn;
