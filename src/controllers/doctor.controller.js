import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  getAllDoctors,
  getDoctorById,
} from "../services/doctor.service.js";

export const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await getAllDoctors();

  return successResponse(
    res,
    200,
    "Doctors fetched successfully",
    doctors
  );
});

export const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await getDoctorById(req.params.id);

  return successResponse(
    res,
    200,
    "Doctor fetched successfully",
    doctor
  );
});