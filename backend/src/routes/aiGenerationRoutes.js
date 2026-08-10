import express from "express";

import {
  generateAIReport,
} from "../controllers/aiGenerationController.js";

const router = express.Router();

// ======================================
// GENERATE AI REPORT
// ======================================
router.post("/generate", generateAIReport);

export default router;