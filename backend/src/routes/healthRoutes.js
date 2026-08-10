import express from "express";
import {
  getAllHospitals,
  createHospital,
} from "../controllers/hospitalController.js";

const router = express.Router();

// Get All Hospitals
router.get("/", getAllHospitals);

// Add Hospital
router.post("/", createHospital);

export default router;