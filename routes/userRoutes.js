const express = require("express");
const { getUsers, blockUser, deleteUser, unblockUser, getUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUsers);
// router.get("/user", authMiddleware, getUser);
router.get("/user", getUser, authMiddleware, (req, res) => {
    res.json({ message: "User authenticated", user: req.user });
});
router.put("/block/:id", authMiddleware, blockUser);
router.put("/unblock/:id", authMiddleware, unblockUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
