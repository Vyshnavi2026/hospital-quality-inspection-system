import axios from "axios";

// ======================================
// BACKEND API URL
// ======================================
const API_URL =
  "https://hospital-quality-inspection-system.onrender.com/api/departments";

// ======================================
// GET ALL DEPARTMENTS
// ======================================
export const getDepartments = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// ======================================
// CREATE DEPARTMENT
// ======================================
export const createDepartment = async (
  departmentData
) => {
  const response = await axios.post(
    API_URL,
    departmentData
  );

  return response.data;
};

// ======================================
// UPDATE DEPARTMENT
// ======================================
export const updateDepartment = async (
  id,
  departmentData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    departmentData
  );

  return response.data;
};

// ======================================
// DELETE DEPARTMENT
// ======================================
export const deleteDepartment = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};