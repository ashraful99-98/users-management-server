const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // Unique index
        password: { type: String, required: true },
        lastLogin: { type: Date, default: null },
        isBlocked: { type: Boolean, default: false },
        status: { type: String, enum: ["active", "blocked"], default: "active" },
    },
    { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);

