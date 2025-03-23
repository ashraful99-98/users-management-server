const User = require("../models/User");
const jwt = require('jsonwebtoken');

// get all users 
exports.getUsers = async (req, res) => {
    const users = await User.find().sort({ lastLogin: -1 });
    res.json(users);
};

// get single user 
exports.getUser = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// user blocked controller 
exports.blockUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { isBlocked: true },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User blocked successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error blocking user", error: error.message });
    }
};

// user unblocked controller 
exports.unblockUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { isBlocked: false },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User unblocked successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error unblocking user", error: error.message });
    }
};

// user delete controller 
exports.deleteUser = async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
        return res.status(404).json({ message: "User already deleted" });
    }
    res.json({ message: "User deleted" });
};
