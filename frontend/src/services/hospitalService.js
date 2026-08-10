import axios from "axios";

const API_URL = "http://localhost:5000/api/hospitals";

// Get All Hospitals
export const getHospitals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create Hospital
export const createHospital = async (hospitalData) => {
  const response = await axios.post(API_URL, hospitalData);
  return response.data;
};

// Update Hospital
export const updateHospital = async (id, hospitalData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    hospitalData
  );

  return response.data;
};

// Delete Hospital
export const deleteHospital = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};