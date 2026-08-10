import express from "express";

import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

// ===================================
// GET ALL DEPARTMENTS
// ===================================
router.get("/", getAllDepartments);

// ===================================
// CREATE DEPARTMENT
// ===================================
router.post("/", createDepartment);

// ===================================
// UPDATE DEPARTMENT
// ===================================
router.put("/:id", updateDepartment);

// ===================================
// DELETE DEPARTMENT
// ===================================
router.delete("/:id", deleteDepartment);

export default router;