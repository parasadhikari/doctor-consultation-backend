import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const createConsultation = async (
  patientId,
  doctorId
) => {

  // Check doctor exists
  const doctor = await prisma.user.findFirst({
    where: {
      id: Number(doctorId),
      role: "DOCTOR",
    },
  });

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  const consultation =
    await prisma.consultation.create({
      data: {
        patientId,
        doctorId: Number(doctorId),
      },
    });

  return consultation;
};

export const getConsultations = async (user) => {

  if (user.role === "PATIENT") {

    return prisma.consultation.findMany({
      where: {
        patientId: user.id,
      },
      include: {
        doctor: true,
      },
    });

  }

  return prisma.consultation.findMany({
    where: {
      doctorId: user.id,
    },
    include: {
      patient: true,
    },
  });

};

export const getConsultation = async (
  consultationId,
  user
) => {

  const consultation =
    await prisma.consultation.findUnique({
      where: {
        id: Number(consultationId),
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

  if (!consultation) {
    throw new ApiError(
      404,
      "Consultation not found"
    );
  }

  if (
    consultation.patientId !== user.id &&
    consultation.doctorId !== user.id
  ) {
    throw new ApiError(
      403,
      "Unauthorized"
    );
  }

  return consultation;

};

export const updateConsultationStatus =
async (
  consultationId,
  status,
  doctorId
) => {

  const consultation =
    await prisma.consultation.findUnique({
      where: {
        id: Number(consultationId),
      },
    });

  if (!consultation) {
    throw new ApiError(
      404,
      "Consultation not found"
    );
  }

  if (
    consultation.doctorId !== doctorId
  ) {
    throw new ApiError(
      403,
      "Only assigned doctor can update status"
    );
  }

  if (
    consultation.status === "COMPLETED"
  ) {
    throw new ApiError(
      400,
      "Consultation already completed"
    );
  }

  return prisma.consultation.update({
    where: {
      id: consultation.id,
    },
    data: {
      status,
    },
  });

};