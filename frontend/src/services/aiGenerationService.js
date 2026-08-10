import axios from "axios";

const API_URL = "http://localhost:5000/api/ai-generation";

// Generate AI report for an inspection
export const generateAIReport = async (inspection_id) => {
  const response = await axios.post(
    `${API_URL}/generate`,
    {
      inspection_id,
    }
  );

  return response.data;
};