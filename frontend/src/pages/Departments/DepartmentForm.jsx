import { useEffect, useState } from "react";
import {
  createDepartment,
  updateDepartment,
} from "../../services/departmentService";
import { getHospitals } from "../../services/hospitalService";

const emptyForm = {
  hospital_id: "",
  department_name: "",
  head_of_department: "",
};

const DepartmentForm = ({ department, onSuccess }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHospitals, setLoadingHospitals] = useState(true);

  const isEditMode = Boolean(department);

  useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (department) {
      setFormData({
        hospital_id: department.hospital_id || "",
        department_name: department.department_name || "",
        head_of_department: department.head_of_department || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [department]);

  const fetchHospitals = async () => {
    try {
      const response = await getHospitals();
      setHospitals(response.hospitals || []);
    } catch (error) {
      console.error("Fetch Hospitals Error:", error);
      alert("Failed to load hospitals");
    } finally {
      setLoadingHospitals(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hospital_id) {
      alert("Please select a hospital");
      return;
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await updateDepartment(department.id, formData);
        alert("Department updated successfully");
      } else {
        await createDepartment(formData);
        alert("Department added successfully");
      }

      setFormData(emptyForm);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Department Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Department operation failed"
        );
      } else {
        alert(
          error.message ||
            "Department operation failed"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Hospital */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Hospital
        </label>

        <select
          name="hospital_id"
          value={formData.hospital_id}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
          disabled={loadingHospitals}
        >
          <option value="">
            {loadingHospitals
              ? "Loading hospitals..."
              : "Select Hospital"}
          </option>

          {hospitals.map((hospital) => (
            <option
              key={hospital.id}
              value={hospital.id}
            >
              {hospital.hospital_name}
            </option>
          ))}
        </select>
      </div>

      {/* Department Name */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Department Name
        </label>

        <input
          type="text"
          name="department_name"
          placeholder="Example: Cardiology"
          value={formData.department_name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Head of Department */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Head of Department
        </label>

        <input
          type="text"
          name="head_of_department"
          placeholder="Example: Dr. Ramesh"
          value={formData.head_of_department}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || loadingHospitals}
        className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEditMode
          ? "Update Department"
          : "Add Department"}
      </button>
    </form>
  );
};

export default DepartmentForm;