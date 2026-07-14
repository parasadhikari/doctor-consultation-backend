import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

export const registerUser = async (userData) => {
  const {
    name,
    email,
    password,
    role,
    specialization,
    experience,
  } = userData;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  // Create doctor profile if role is DOCTOR
  if (role === "DOCTOR") {
    await prisma.doctorProfile.create({
      data: {
        userId: user.id,
        specialization,
        experience: Number(experience),
      },
    });
  }

  // Never return password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};