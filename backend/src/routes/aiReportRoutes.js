import express from "express";

import {
  getAllAIReports,
  createAIReport,
  updateAIReport,
  deleteAIReport,
} from "../controllers/aiReportController.js";

const router = express.Router();

// ======================================
// GET ALL AI REPORTS
// ======================================
router.get("/", getAllAIReports);

// ======================================
// CREATE AI REPORT
// ======================================
router.post("/", createAIReport);

// ======================================
// UPDATE AI REPORT
// ======================================
router.put("/:id", updateAIReport);

// ======================================
// DELETE AI REPORT
// ======================================
router.delete("/:id", deleteAIReport);

export default router;