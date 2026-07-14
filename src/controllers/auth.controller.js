import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import { registerUser } from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const user = await registerUser(req.body);

  return successResponse(
    res,
    201,
    "User registered successfully",
    user
  );
});