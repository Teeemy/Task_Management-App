const User = require("../models/user.model");

// Get logged-in user's profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Update profile
const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { email,password },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users (Admin only ideally)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // don’t return passwords
        res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// Delete user
const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProfile, updateProfile,getAllUsers, deleteAccount };
