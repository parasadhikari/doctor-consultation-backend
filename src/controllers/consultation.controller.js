import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

import {
  createConsultation,
  getConsultations,
  getConsultation,
  updateConsultationStatus,
} from "../services/consultation.service.js";

export const create = asyncHandler(async (req, res) => {

  const consultation =
    await createConsultation(
      req.user.id,
      req.body.doctorId
    );

  return successResponse(
    res,
    201,
    "Consultation created successfully",
    consultation
  );

});

export const getAll = asyncHandler(async (req, res) => {

  const consultations =
    await getConsultations(req.user);

  return successResponse(
    res,
    200,
    "Consultations fetched successfully",
    consultations
  );

});

export const getOne = asyncHandler(async (req, res) => {

  const consultation =
    await getConsultation(
      req.params.id,
      req.user
    );

  return successResponse(
    res,
    200,
    "Consultation fetched successfully",
    consultation
  );

});

export const updateStatus =
asyncHandler(async (req, res) => {

  const consultation =
    await updateConsultationStatus(
      req.params.id,
      req.body.status,
      req.user.id
    );

  return successResponse(
    res,
    200,
    "Status updated successfully",
    consultation
  );

});