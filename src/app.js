import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import doctorRoutes from "./routes/doctor.routes.js";
import consultationRoutes from "./routes/consultation.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";


const app = express();

// Security Middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Logger
app.use(morgan("dev"));

// Parse JSON
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use(
    "/api/consultations",
    consultationRoutes
);
app.use("/api/consultations", messageRoutes);


// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Doctor Consultation Backend API is running 🚀",
    });
});
app.use(errorHandler);

export default app;