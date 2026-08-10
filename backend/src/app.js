import express from "express";
import cors from "cors";

import authRoutes from "./auth/authRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import findingRoutes from "./routes/findingRoutes.js";
import aiReportRoutes from "./routes/aiReportRoutes.js";
import aiGenerationRoutes from "./routes/aiGenerationRoutes.js";

const app = express();

// ======================================
// Middleware
// ======================================
app.use(cors());
app.use(express.json());

// ======================================
// Home Route
// ======================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital Quality Inspection API is running",
  });
});

// ======================================
// API Routes
// ======================================
app.use("/api/auth", authRoutes);

app.use("/api/hospitals", hospitalRoutes);

app.use("/api/departments", departmentRoutes);

app.use("/api/inspections", inspectionRoutes);

app.use("/api/findings", findingRoutes);

app.use("/api/ai-reports", aiReportRoutes);

// 🤖 Gemini AI Generation
app.use("/api/ai-generation", aiGenerationRoutes);

// ======================================
// 404 Route
// ======================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;