const userModel = require("../models/user.model");

const handleUpdateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

    if (!username && !email) {
      return res.status(400).json({
        success: false,
        message: "Provide at least username or email to update",
      });
    }

    const updateData = {};

    if (username) {
      updateData.username = username;
    }

    if (email) {
      updateData.email = email;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updateData, { returnDocument: "after" })
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating user",
    });
  }
};

module.exports = { handleUpdateUser };
