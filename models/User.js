const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // Unique index
        password: { type: String, required: true },
        lastLogin: { type: Date, default: null },
        isBlocked: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
