import axios from "axios";

const API_URL = "http://localhost:5000/api/departments";

// Get All Departments
export const getDepartments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create Department
export const createDepartment = async (departmentData) => {
  const response = await axios.post(API_URL, departmentData);
  return response.data;
};

// Update Department
export const updateDepartment = async (id, departmentData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    departmentData
  );

  return response.data;
};

// Delete Department
export const deleteDepartment = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};