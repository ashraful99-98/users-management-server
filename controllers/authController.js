const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Capitalized for model

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const loginUser = await User.findOne({ email });

        // Check if user exists & is not blocked
        if (!loginUser || loginUser.isBlocked) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Set cookie with token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        });

        // Update last login time
        loginUser.lastLogin = new Date();
        await loginUser.save();

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
