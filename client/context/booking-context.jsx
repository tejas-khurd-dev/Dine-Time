import { createContext, useState } from "react";

export const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);

  return (
    <BookingContext.Provider
      value={{
        slots,
        setSlots,
        loadingSlots,
        setLoadingSlots,
        booking,
        setBooking,
        lastBooking,
        setLastBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
