import express from "express";

import {
  getAllHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} from "../controllers/hospitalController.js";

const router = express.Router();

// Get All Hospitals
router.get("/", getAllHospitals);

// Create Hospital
router.post("/", createHospital);

// Update Hospital
router.put("/:id", updateHospital);

// Delete Hospital
router.delete("/:id", deleteHospital);

export default router;