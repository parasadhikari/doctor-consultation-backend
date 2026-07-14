import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  register,
  login,
  getProfile,
} from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", login);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

export default router;