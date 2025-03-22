const express = require("express");
const { getUsers, blockUser, deleteUser, unblockUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.put("/block/:id", authMiddleware, blockUser);
router.put("/unblock/:id", authMiddleware, unblockUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
