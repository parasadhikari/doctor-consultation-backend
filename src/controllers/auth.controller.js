import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  registerUser,
  loginUser,
} from "../services/auth.service.js";

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



export const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  const result = await loginUser({
    email,
    password,
  });

  return successResponse(
    res,
    200,
    "Login successful",
    result
  );

});


export const getProfile = asyncHandler(async (req, res) => {

  return successResponse(
    res,
    200,
    "Profile fetched successfully",
    req.user
  );

});