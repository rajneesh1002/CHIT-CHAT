import express from 'express';
import multer from 'multer';
import { protectRoute } from '../middleware/protect.middleware.js';
import { getMessage, getUserForSidebar, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

// Configure multer (memory storage)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Routes
router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessage);

// 💡 This one supports image upload now!
router.post("/send/:id", protectRoute, upload.single("image"), sendMessage);

export default router;
