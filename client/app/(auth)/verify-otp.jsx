import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/auth.hook";
import { ShieldCheck, RotateCcw } from "lucide-react-native";

const RESEND_COOLDOWN = 60;

const VerifyOtp = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const safeEmail = Array.isArray(email) ? email[0] : email || "";
  const { handleRegistration, handleSendOTP } = useAuth();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await handleRegistration({ email: safeEmail, otp });
      router.replace("/home");
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      setOtp("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setError("");
    setOtp("");

    try {
      await handleSendOTP({ email: safeEmail });
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="flex-grow items-center justify-center px-9"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center">
        <Image
          source={require("@/assets/images/logo.png")}
          className="h-24 w-48"
          resizeMode="contain"
        />
        <View className="mt-2 h-1 w-12 rounded-full bg-secondary" />
      </View>

      <View className="mt-8 w-full items-center">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck size={24} color="#1f4d3a" />
        </View>
        <Text className="mt-4 font-dm-bold text-xl text-text-primary">
          Verify your email
        </Text>
        <Text className="mt-2 text-center font-dm-regular text-sm text-text-secondary">
          We sent a 6-digit code to{"\n"}
          <Text className="font-dm-semibold text-text-primary">{safeEmail}</Text>
        </Text>
      </View>

      {error ? (
        <View className="mt-6 w-full rounded-xl bg-error-light px-4 py-3">
          <Text className="font-dm-regular text-sm text-error">
            {error}
          </Text>
        </View>
      ) : null}

      <View className="mt-8 w-full items-center">
        <TextInput
          placeholder="Enter 6 digits"
          placeholderTextColor="#b0b0aa"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
          style={{ letterSpacing: 7, fontSize: 18, paddingVertical: 5 }}
          className="h-15 w-full rounded-xl border border-border bg-input font-dm-bold text-text-primary"
        />

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={submitting}
          className={`mt-6 h-14 w-full items-center justify-center rounded-xl bg-primary ${submitting ? "opacity-60" : ""
            }`}
          onPress={handleVerify}
        >
          <Text className="font-dm-bold text-base text-white">
            {submitting ? "Verifying..." : "Verify & Create Account"}
          </Text>
        </TouchableOpacity>

        <View className="mt-6 flex-row items-center justify-center">
          {cooldown > 0 ? (
            <Text className="font-dm-regular text-sm text-text-secondary">
              Resend code in{" "}
              <Text className="font-dm-semibold text-primary">
                {cooldown}s
              </Text>
            </Text>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center"
              onPress={handleResend}
            >
              <RotateCcw size={14} color="#f4a261" />
              <Text className="ml-1.5 font-dm-semibold text-sm text-secondary">
                Resend OTP
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text className="mt-10 mb-4 font-dm-regular text-xs text-text-muted">
        Discover • Reserve • Dine
      </Text>
    </ScrollView>
  );
};

export default VerifyOtp;
