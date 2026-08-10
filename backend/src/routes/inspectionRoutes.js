import express from "express";

import {
  getAllInspections,
  createInspection,
  updateInspection,
  deleteInspection,
} from "../controllers/inspectionController.js";

const router = express.Router();

// =======================================
// GET ALL INSPECTIONS
// =======================================
router.get("/", getAllInspections);

// =======================================
// CREATE INSPECTION
// =======================================
router.post("/", createInspection);

// =======================================
// UPDATE INSPECTION
// =======================================
router.put("/:id", updateInspection);

// =======================================
// DELETE INSPECTION
// =======================================
router.delete("/:id", deleteInspection);

export default router;