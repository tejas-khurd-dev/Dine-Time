import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { X, Calendar, Clock, CheckCircle } from "lucide-react-native";
import { useAuth } from "@/hooks/auth.hook";
import { useBooking } from "@/hooks/booking.hook";
import { useRouter } from "expo-router";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDates = () => {
  const today = new Date();
  return Array.from({ length: 16 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      date: d.toISOString().split("T")[0],
      label: i === 0 ? "Today" : DAYS[d.getDay()],
      day: d.getDate(),
      month: MONTHS[d.getMonth()],
    };
  });
};

const BookingModal = ({ visible, onClose, restaurantId, restaurantName }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { slots, booking, lastBooking, fetchSlots, createBooking } = useBooking();

  const [step, setStep] = useState("date");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (visible) {
      setStep("date");
      setSelectedDate(null);
      setSelectedTime(null);
    }
  }, [visible]);

  useEffect(() => {
    if (selectedDate && restaurantId) {
      fetchSlots(restaurantId, selectedDate)
        .then(() => setStep("time"))
        .catch(() => Alert.alert("Error", "Failed to load time slots"));
    }
  }, [selectedDate]);

  const handleBook = async () => {
    if (!isAuthenticated) {
      onClose();
      router.push("/(auth)/sign-in");
      return;
    }
    try {
      await createBooking({ restaurantId, date: selectedDate, time: selectedTime, restaurantName });
      setStep("success");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to book. Try again.");
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      avoidKeyboard
      propagateSwipe
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View className="rounded-t-3xl bg-surface px-5 pt-5 pb-8">
        <View className="flex-row items-center justify-between">
          <Text className="font-dm-bold text-lg text-text-primary">
            {step === "success" ? "Booking Confirmed" : step === "date" ? "Select Date" : "Select Time"}
          </Text>
          <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
            <X size={22} color="#6b746f" />
          </TouchableOpacity>
        </View>

        {step === "success" && (
          <View className="items-center py-10">
            <CheckCircle size={64} color="#1f4d3a" />
            <Text className="mt-4 font-dm-bold text-lg text-text-primary">Table Booked!</Text>
            <Text className="mt-2 text-center font-dm-regular text-sm text-text-secondary">{restaurantName}</Text>
            <Text className="mt-1 font-dm-semibold text-sm text-primary">{selectedDate} at {selectedTime}</Text>
            <View className="mt-2 rounded-lg bg-warning-light px-3 py-1.5">
              <Text className="font-dm-semibold text-xs text-warning">Expires on {lastBooking?.expiryTime}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              className="mt-6 h-12 w-full items-center justify-center rounded-xl bg-primary"
              onPress={() => { onClose(); router.push("/(tabs)/history"); }}
            >
              <Text className="font-dm-bold text-sm text-white">View Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.85}
              className="mt-3 h-12 w-full items-center justify-center rounded-xl border border-border"
              onPress={onClose}
            >
              <Text className="font-dm-semibold text-sm text-text-secondary">Close</Text>
            </TouchableOpacity>
          </View>
        )}

        {step !== "success" && (
          <View>
            <View className="mt-4 flex-row items-center gap-2">
              <View className={`h-1 flex-1 rounded-full ${step === "date" ? "bg-primary" : "bg-primary/30"}`} />
              <View className={`h-1 flex-1 rounded-full ${step === "time" ? "bg-primary" : "bg-primary/30"}`} />
            </View>

            {step === "date" && (
              <View className="mt-5 px-1">
                <View className="mb-4 flex-row items-center gap-2">
                  <Calendar size={18} color="#1f4d3a" />
                  <Text className="font-dm-semibold text-sm text-text-primary">Choose a date</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getDates().map((d) => (
                    <TouchableOpacity
                      key={d.date}
                      activeOpacity={0.7}
                      className={`mr-2 items-center rounded-xl px-3 py-3 mt-2 ${selectedDate === d.date ? "bg-primary" : "bg-surface-soft"}`}
                      onPress={() => { setSelectedDate(d.date); setSelectedTime(null); }}
                    >
                      <Text className={`font-dm-medium text-xs ${selectedDate === d.date ? "text-white" : "text-text-secondary"}`}>{d.label}</Text>
                      <Text className={`mt-1 font-dm-bold text-lg ${selectedDate === d.date ? "text-white" : "text-text-primary"}`}>{d.day}</Text>
                      <Text className={`font-dm-medium text-xs ${selectedDate === d.date ? "text-white/80" : "text-text-muted"}`}>{d.month}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {step === "time" && (
              <View className="mt-5">
                <View className="mb-4 flex-row items-center gap-2">
                  <Clock size={18} color="#1f4d3a" />
                  <Text className="font-dm-semibold text-sm text-text-primary">Choose a time</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {slots.map((slot) => (
                    <TouchableOpacity
                      key={slot.time}
                      activeOpacity={slot.available ? 0.7 : 1}
                      className={`mr-2 items-center rounded-xl px-4 py-4 ${!slot.available ? "bg-border" : selectedTime === slot.time ? "bg-primary" : "bg-surface-soft"}`}
                      onPress={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                    >
                      <Text className={`font-dm-semibold text-sm ${!slot.available ? "text-text-muted line-through" : selectedTime === slot.time ? "text-white" : "text-text-primary"}`}>{slot.time}</Text>
                      {!slot.available && <Text className="font-dm-regular text-[10px] text-text-muted">Booked</Text>}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View className="mt-6 flex-row gap-3">
                  <TouchableOpacity activeOpacity={0.85} className="h-12 flex-1 items-center justify-center rounded-xl border border-border" onPress={() => setStep("date")}>
                    <Text className="font-dm-semibold text-sm text-text-secondary">Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={!selectedTime || booking}
                    className={`h-12 flex-[2] items-center justify-center rounded-xl ${selectedTime && !booking ? "bg-primary" : "bg-border"}`}
                    onPress={handleBook}
                  >
                    {booking ? <ActivityIndicator color="#fff" /> : <Text className={`font-dm-bold text-sm ${selectedTime && !booking ? "text-white" : "text-text-muted"}`}>Book Now</Text>}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default BookingModal;
