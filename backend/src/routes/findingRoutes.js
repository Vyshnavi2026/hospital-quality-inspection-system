import express from "express";

import {
  getAllFindings,
  createFinding,
  updateFinding,
  deleteFinding,
} from "../controllers/findingController.js";

const router = express.Router();

// =======================================
// GET ALL FINDINGS
// =======================================
router.get("/", getAllFindings);

// =======================================
// CREATE FINDING
// =======================================
router.post("/", createFinding);

// =======================================
// UPDATE FINDING
// =======================================
router.put("/:id", updateFinding);

// =======================================
// DELETE FINDING
// =======================================
router.delete("/:id", deleteFinding);

export default router;