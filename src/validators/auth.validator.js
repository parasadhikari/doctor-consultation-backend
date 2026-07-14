import { body } from "express-validator";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .isIn(["PATIENT", "DOCTOR"])
    .withMessage("Role must be PATIENT or DOCTOR"),

  body("specialization")
    .if(body("role").equals("DOCTOR"))
    .notEmpty()
    .withMessage("Specialization is required"),

  body("experience")
    .if(body("role").equals("DOCTOR"))
    .isInt({ min: 0 })
    .withMessage("Experience must be a valid number"),
];