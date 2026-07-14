import { body } from "express-validator";

export const createConsultationValidator = [
  body("doctorId")
    .notEmpty()
    .withMessage("Doctor ID is required")
    .isInt()
    .withMessage("Doctor ID must be an integer"),
];

export const updateStatusValidator = [
  body("status")
    .isIn(["PENDING", "ACTIVE", "COMPLETED"])
    .withMessage("Invalid consultation status"),
];