import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const sendMessage = async (
  consultationId,
  senderId,
  message
) => {
  const consultation = await prisma.consultation.findUnique({
    where: {
      id: Number(consultationId),
    },
  });

  if (!consultation) {
    throw new ApiError(404, "Consultation not found");
  }

  if (consultation.status !== "ACTIVE") {
    throw new ApiError(
      400,
      "Messages can only be sent in active consultations"
    );
  }

  if (
    consultation.patientId !== senderId &&
    consultation.doctorId !== senderId
  ) {
    throw new ApiError(
      403,
      "You are not part of this consultation"
    );
  }

  return await prisma.message.create({
    data: {
      consultationId: consultation.id,
      senderId,
      message,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
  });
};

export const getMessages = async (
  consultationId,
  userId
) => {
  const consultation = await prisma.consultation.findUnique({
    where: {
      id: Number(consultationId),
    },
  });

  if (!consultation) {
    throw new ApiError(404, "Consultation not found");
  }

  if (
    consultation.patientId !== userId &&
    consultation.doctorId !== userId
  ) {
    throw new ApiError(
      403,
      "You are not part of this consultation"
    );
  }

  return await prisma.message.findMany({
    where: {
      consultationId: consultation.id,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          role: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};