const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// register user controller 
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// login user
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const loginUser = await User.findOne({ email });

//         if (!loginUser || loginUser.isBlocked) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         const isMatch = await bcrypt.compare(password, loginUser.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const token = jwt.sign({ id: loginUser._id }, process.env.JWT_SECRET, { expiresIn: "1day" });

//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite: "Strict"
//         });

//         loginUser.lastLogin = new Date();
//         await loginUser.save();

//         // Ensure user object is correctly returned
//         res.json({
//             message: "Login successful",
//             token,
//             user: { id: loginUser._id, name: loginUser.name, email: loginUser.email }
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Send the token in an HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
