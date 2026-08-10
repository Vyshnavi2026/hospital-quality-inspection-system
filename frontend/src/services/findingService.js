import axios from "axios";

const API_URL = "http://localhost:5000/api/findings";

// =======================================
// GET ALL FINDINGS
// =======================================
export const getFindings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// =======================================
// CREATE FINDING
// =======================================
export const createFinding = async (findingData) => {
  const response = await axios.post(
    API_URL,
    findingData
  );

  return response.data;
};

// =======================================
// UPDATE FINDING
// =======================================
export const updateFinding = async (
  id,
  findingData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    findingData
  );

  return response.data;
};

// =======================================
// DELETE FINDING
// =======================================
export const deleteFinding = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};