import { body } from "express-validator";

export const sendMessageValidator = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 1000 })
    .withMessage("Message cannot exceed 1000 characters"),
];