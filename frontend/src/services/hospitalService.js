import axios from "axios";

// ======================================
// BACKEND API URL
// ======================================
const API_URL =
  "https://hospital-quality-inspection-system.onrender.com/api/hospitals";

// ======================================
// GET ALL HOSPITALS
// ======================================
export const getHospitals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ======================================
// CREATE HOSPITAL
// ======================================
export const createHospital = async (hospitalData) => {
  const response = await axios.post(
    API_URL,
    hospitalData
  );

  return response.data;
};

// ======================================
// UPDATE HOSPITAL
// ======================================
export const updateHospital = async (
  id,
  hospitalData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    hospitalData
  );

  return response.data;
};

// ======================================
// DELETE HOSPITAL
// ======================================
export const deleteHospital = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};