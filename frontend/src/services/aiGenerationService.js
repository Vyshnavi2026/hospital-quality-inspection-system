import axios from "axios";

// ======================================
// BACKEND API URL
// ======================================
const API_URL =
  "https://hospital-quality-inspection-system.onrender.com/api/ai-generation";

// ======================================
// GENERATE AI REPORT
// ======================================
export const generateAIReport = async (
  inspection_id
) => {
  const response = await axios.post(
    `${API_URL}/generate`,
    {
      inspection_id,
    }
  );

  return response.data;
};