import { useContext, useEffect } from "react";
import { RestaurantContext } from "@/context/restaurant-context";
import { getAllRestaurants, getRestaurantById } from "@/services/restaurant.api";

export const useRestaurants = () => {
  const { restaurants, setRestaurants, loading, setLoading } =
    useContext(RestaurantContext);

  const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return { restaurants, loading, refresh: fetchRestaurants };
};

export const useRestaurantDetails = (id) => {
  const {
    restaurantDetails,
    setRestaurantDetails,
    detailLoading,
    setDetailLoading,
  } = useContext(RestaurantContext);

  useEffect(() => {
    if (!id) {
      setDetailLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setDetailLoading(true);
      try {
        const data = await getRestaurantById(id);
        setRestaurantDetails(data);
      } catch (error) {
        setRestaurantDetails(null);
      } finally {
        setDetailLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { restaurantDetails, detailLoading };
};
