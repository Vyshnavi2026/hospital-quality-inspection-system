import axios from "axios";

// ======================================
// BACKEND API URL
// ======================================
const API_URL =
  "https://hospital-quality-inspection-system.onrender.com/api/ai-reports";

// ======================================
// GET ALL AI REPORTS
// ======================================
export const getAIReports = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

// ======================================
// CREATE AI REPORT
// ======================================
export const createAIReport = async (reportData) => {
  const response = await axios.post(
    API_URL,
    reportData
  );

  return response.data;
};

// ======================================
// UPDATE AI REPORT
// ======================================
export const updateAIReport = async (
  id,
  reportData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    reportData
  );

  return response.data;
};

// ======================================
// DELETE AI REPORT
// ======================================
export const deleteAIReport = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};