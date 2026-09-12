import { createContext, useState } from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [detailLoading, setDetailLoading] = useState(true);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        loading,
        setLoading,
        restaurantDetails,
        setRestaurantDetails,
        detailLoading,
        setDetailLoading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
