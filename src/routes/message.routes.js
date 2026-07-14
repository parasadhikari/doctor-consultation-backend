import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { sendMessageValidator } from "../validators/message.validator.js";

import {
  createMessage,
  fetchMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/:id/messages",
  sendMessageValidator,
  createMessage
);

router.get(
  "/:id/messages",
  fetchMessages
);

export default router;