// const User = require("../models/User");

const user = require("../models/User");

exports.getUsers = async (req, res) => {
    const users = await user.find().sort({ lastLogin: -1 });
    res.json(users);
};

exports.blockUser = async (req, res) => {
    await user.findByIdAndUpdate(req.params.id, { isBlocked: true });
    res.json({ message: "User blocked" });
};

exports.deleteUser = async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};
