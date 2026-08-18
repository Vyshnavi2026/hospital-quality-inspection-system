import axios from "axios";

// ======================================
// BACKEND API URL
// ======================================
const API_URL =
  "https://hospital-quality-inspection-system.onrender.com/api/inspections";

// ======================================
// GET ALL INSPECTIONS
// ======================================
export const getInspections = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// ======================================
// CREATE INSPECTION
// ======================================
export const createInspection = async (
  inspectionData
) => {
  const response = await axios.post(
    API_URL,
    inspectionData
  );

  return response.data;
};

// ======================================
// UPDATE INSPECTION
// ======================================
export const updateInspection = async (
  id,
  inspectionData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    inspectionData
  );

  return response.data;
};

// ======================================
// DELETE INSPECTION
// ======================================
export const deleteInspection = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};