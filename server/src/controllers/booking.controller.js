const bookingModel = require("../models/booking.model");

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  "21:00", "22:00",
];

const handleCreateBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantId, date, time } = req.body;

    if (!restaurantId || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "restaurantId, date, and time are required",
      });
    }

    if (!TIME_SLOTS.includes(time)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time slot",
      });
    }

    const existing = await bookingModel.findOne({ restaurant: restaurantId, date, time });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "This slot is already booked",
      });
    }

    const booking = await bookingModel.create({
      user: userId,
      restaurant: restaurantId,
      date,
      time,
    });

    return res.status(201).json({
      success: true,
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating booking",
    });
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const { restaurantId, date } = req.params;

    if (!restaurantId || !date) {
      return res.status(400).json({
        success: false,
        message: "restaurantId and date are required",
      });
    }

    const bookedSlots = await bookingModel
      .find({ restaurant: restaurantId, date })
      .select("time -_id");

    const bookedTimes = bookedSlots.map((b) => b.time);

    const available = TIME_SLOTS.map((slot) => ({
      time: slot,
      available: !bookedTimes.includes(slot),
    }));

    return res.status(200).json(available);
  } catch (error) {
    console.error("Error fetching slots:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching slots",
    });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await bookingModel
      .find({ user: userId })
      .populate("restaurant", "name cuisine image")
      .sort({ createdAt: -1 });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching bookings",
    });
  }
};

module.exports = {
  handleCreateBooking,
  getAvailableSlots,
  getUserBookings,
};
