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

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

const SignUp = () => {
  const router = useRouter();
  const { handleSendOTP } = useAuth();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, text) => {
    setValues((prev) => ({ ...prev, [field]: text }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length !== 0) return;

    setSubmitting(true);
    try {
      await handleSendOTP({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email: values.email.trim() },
      });
    } catch (err) {
      setErrors({ submit: err.message || "Sign up failed. Please try again." });
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
          Let's get you started
        </Text>
        <Text className="mt-2 font-dm-regular text-sm text-text-secondary">
          Create your DineTime account
        </Text>
      </View>

      <View className="mt-8 w-full">
        {errors.submit ? (
          <View className="mb-5 rounded-2xl bg-error-light px-4 py-3.5">
            <Text className="text-center font-dm-medium text-sm text-error">
              {errors.submit}
            </Text>
          </View>
        ) : null}

        <View className="mb-3.5">
          <Text className="mb-2 font-dm-medium text-xs text-text-secondary">
            Full Name
          </Text>
          <TextInput
            placeholder="Tejas Khurd"
            placeholderTextColor="#b0b0aa"
            value={values.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
            autoCapitalize="words"
            autoCorrect={false}
            className="h-14 rounded-2xl border border-border bg-surface font-dm-regular text-text-primary"
            style={{ paddingHorizontal: 16 }}
          />
          {errors.fullName ? (
            <Text className="mt-1.5 font-dm-regular text-xs text-error">
              {errors.fullName}
            </Text>
          ) : null}
        </View>

        <View className="mb-3.5">
          <Text className="mb-2 font-dm-medium text-xs text-text-secondary">
            Email
          </Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#b0b0aa"
            value={values.email}
            onChangeText={(text) => handleChange("email", text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            className="h-14 rounded-2xl border border-border bg-surface font-dm-regular text-text-primary"
            style={{ paddingHorizontal: 16 }}
          />
          {errors.email ? (
            <Text className="mt-1.5 font-dm-regular text-xs text-error">
              {errors.email}
            </Text>
          ) : null}
        </View>

        <View className="mb-3.5">
          <Text className="mb-2 font-dm-medium text-xs text-text-secondary">
            Password
          </Text>
          <TextInput
            placeholder="At least 6 characters"
            placeholderTextColor="#b0b0aa"
            value={values.password}
            onChangeText={(text) => handleChange("password", text)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            className="h-14 rounded-2xl border border-border bg-surface font-dm-regular text-text-primary"
            style={{ paddingHorizontal: 16 }}
          />
          {errors.password ? (
            <Text className="mt-1.5 font-dm-regular text-xs text-error">
              {errors.password}
            </Text>
          ) : null}
        </View>

        <View className="mb-2">
          <Text className="mb-2 font-dm-medium text-xs text-text-secondary">
            Confirm Password
          </Text>
          <TextInput
            placeholder="Re-enter your password"
            placeholderTextColor="#b0b0aa"
            value={values.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            className="h-14 rounded-2xl border border-border bg-surface font-dm-regular text-text-primary"
            style={{ paddingHorizontal: 16 }}
          />
          {errors.confirmPassword ? (
            <Text className="mt-1.5 font-dm-regular text-xs text-error">
              {errors.confirmPassword}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={submitting}
          className={`mt-7 h-14 items-center justify-center rounded-2xl bg-primary ${submitting ? "opacity-60" : ""
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
            {submitting ? "Sending OTP..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="font-dm-regular text-sm text-text-muted">
          Already a User?{" "}
        </Text>
        <TouchableOpacity
          onPress={() => router.navigate("/sign-in")}
          activeOpacity={0.7}
          disabled={submitting}
        >
          <Text className="font-dm-bold text-sm text-primary">
            Sign in
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="mb-6 mt-12 font-dm-regular text-xs text-text-muted">
        Discover • Reserve • Dine
      </Text>
    </ScrollView>
  );
};

export default SignUp;
