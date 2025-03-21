const express = require("express");
const { getUsers, blockUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getUsers);
router.put("/block/:id", authMiddleware, blockUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
