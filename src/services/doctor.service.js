import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const getAllDoctors = async () => {
  return await prisma.doctorProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

export const getDoctorById = async (doctorId) => {
  const doctor = await prisma.doctorProfile.findUnique({
    where: {
      id: Number(doctorId),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return doctor;
};