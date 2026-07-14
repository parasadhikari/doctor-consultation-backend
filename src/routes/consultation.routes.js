import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";
import allowRoles from "../middleware/role.middleware.js";

import {
  create,
  getAll,
  getOne,
  updateStatus,
} from "../controllers/consultation.controller.js";

import {
  createConsultationValidator,
  updateStatusValidator,
} from "../validators/consultation.validator.js";

const router = express.Router();

router.use(authMiddleware);

// Only patients
router.post(
  "/",
  allowRoles("PATIENT"),
  createConsultationValidator,
  create
);

// Patient OR Doctor
router.get(
  "/",
  getAll
);

router.get(
  "/:id",
  getOne
);

// Only doctors
router.patch(
  "/:id/status",
  allowRoles("DOCTOR"),
  updateStatusValidator,
  updateStatus
);

export default router;