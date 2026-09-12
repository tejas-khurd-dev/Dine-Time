import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react-native";
import { useLocalSearchParams } from "expo-router";
import BookingModal from "./booking-modal";

const BookBar = () => {
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View
        className="border-t border-border bg-surface px-5 py-3 pb-5"
        style={{ shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: -2 }, elevation: 4 }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          className="h-14 flex-row items-center justify-center rounded-2xl bg-primary shadow-md shadow-primary/30"
          onPress={() => setModalVisible(true)}
        >
          <Text className="font-dm-bold text-base text-white">Book a Table</Text>
          <ChevronRight size={18} color="#ffffff" strokeWidth={2.5} className="ml-1" />
        </TouchableOpacity>
      </View>

      <BookingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        restaurantId={id}
      />
    </>
  );
};

export default BookBar;
