import { useContext } from "react";
import { BookingContext } from "@/context/booking-context";
import {
  getAvailableSlots,
  createBooking as createBookingApi,
  getMyBookings as getMyBookingsApi,
} from "@/services/booking.api";

export const useBooking = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  const {
    slots,
    setSlots,
    loadingSlots,
    setLoadingSlots,
    booking,
    setBooking,
    lastBooking,
    setLastBooking,
  } = context;

  const fetchSlots = async (restaurantId, date) => {
    setLoadingSlots(true);
    try {
      const data = await getAvailableSlots(restaurantId, date);
      setSlots(data);
      return data;
    } catch (error) {
      setSlots([]);
      throw error;
    } finally {
      setLoadingSlots(false);
    }
  };

  const createBooking = async ({ restaurantId, date, time, restaurantName }) => {
    setBooking(true);
    try {
      const result = await createBookingApi({ restaurantId, date, time });
      const expiry = getExpiryTime(time);
      const bookingData = {
        ...result.booking,
        restaurantName,
        expiryTime: expiry,
      };
      setLastBooking(bookingData);
      return bookingData;
    } catch (error) {
      throw error;
    } finally {
      setBooking(false);
    }
  };

  const getMyBookings = async () => {
    try {
      const data = await getMyBookingsApi();
      return data.map((b) => ({
        ...b,
        expiryTime: getExpiryTime(b.time),
      }));
    } catch (error) {
      throw error;
    }
  };

  return {
    slots,
    loadingSlots,
    booking,
    lastBooking,
    fetchSlots,
    createBooking,
    getMyBookings,
  };
};

export const getExpiryTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const expiryMinutes = minutes + 5;
  const expiryHours = hours + Math.floor(expiryMinutes / 60);
  const finalMinutes = expiryMinutes % 60;
  const h = String(expiryHours).padStart(2, "0");
  const m = String(finalMinutes).padStart(2, "0");
  return `${h}:${m}`;
};

export const formatBookingDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${day} ${months[month - 1]} ${year}`;
};
