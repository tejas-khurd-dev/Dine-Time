import { useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "@/context/auth-context";
import {
  sendOTP,
  registration,
  login,
  logout,
  getMe,
  updateUsername,
} from "@/services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleSendOTP = async ({ fullName, email, password }) => {
    setLoading(true);
    try {
      const data = await sendOTP({ username: fullName, email, password });
      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async ({ email, otp }) => {
    setLoading(true);
    try {
      const data = await registration({ email, otp });
      await SecureStore.setItemAsync("auth_token", data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      await SecureStore.setItemAsync("auth_token", data.token);
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } finally {
      await SecureStore.deleteItemAsync("auth_token");
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("auth_token");
        if (!token) {
          setLoading(false);
          return;
        }
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        await SecureStore.deleteItemAsync("auth_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [setUser, setLoading]);

  const handleUpdateUsername = async (username) => {
    try {
      const data = await updateUsername(username);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
    handleSendOTP,
    handleRegistration,
    handleLogin,
    handleLogout,
    handleUpdateUsername,
  };
};
