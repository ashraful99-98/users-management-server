const express = require("express");
const { getUsers, blockUser, deleteUser, unblockUser, getUser, blockUsers, unblockUsers, deleteUsers } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/", authMiddleware, getUsers);
// router.get("/me", authMiddleware, getUser);
// router.put("/block/:id", authMiddleware, blockUser);
// router.put("/unblock/:id", authMiddleware, unblockUser);
// router.delete("/:id", authMiddleware, deleteUser);

// router.put("/block", authMiddleware, blockUsers);
// router.put("/unblock", authMiddleware, unblockUsers);
// router.delete("/", authMiddleware, deleteUsers);

router.get("/me", authMiddleware, getUser);
router.get("/", authMiddleware, getUsers);
router.put("/block", authMiddleware, blockUsers);
router.put("/unblock", authMiddleware, unblockUsers);
router.delete("/", authMiddleware, deleteUsers);


module.exports = router;
