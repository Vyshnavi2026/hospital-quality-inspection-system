import { useEffect, useState } from "react";

import {
  createInspection,
  updateInspection,
} from "../../services/inspectionService";

import { getHospitals } from "../../services/hospitalService";

import { getDepartments } from "../../services/departmentService";

const emptyForm = {
  hospital_id: "",
  department_id: "",
  inspector_name: "",
  inspection_date: "",
  overall_score: "",
  status: "Pending",
  remarks: "",
};

const InspectionForm = ({
  inspection,
  onSuccess,
}) => {
  const [formData, setFormData] = useState(emptyForm);

  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const isEditMode = Boolean(inspection);

  // =======================================
  // LOAD HOSPITALS AND DEPARTMENTS
  // =======================================
  useEffect(() => {
    loadFormData();
  }, []);

  // =======================================
  // LOAD EXISTING INSPECTION FOR EDIT
  // =======================================
  useEffect(() => {
    if (inspection) {
      setFormData({
        hospital_id: inspection.hospital_id || "",
        department_id: inspection.department_id || "",
        inspector_name:
          inspection.inspector_name || "",
        inspection_date:
          inspection.inspection_date || "",
        overall_score:
          inspection.overall_score ?? "",
        status:
          inspection.status || "Pending",
        remarks:
          inspection.remarks || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [inspection]);

  // =======================================
  // LOAD FORM DATA
  // =======================================
  const loadFormData = async () => {
    try {
      setLoadingData(true);

      const [hospitalResponse, departmentResponse] =
        await Promise.all([
          getHospitals(),
          getDepartments(),
        ]);

      setHospitals(
        hospitalResponse.hospitals || []
      );

      setDepartments(
        departmentResponse.departments || []
      );
    } catch (error) {
      console.error(
        "Inspection Form Data Error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to load form data"
        );
      } else {
        alert("Failed to load form data");
      }
    } finally {
      setLoadingData(false);
    }
  };

  // =======================================
  // HANDLE INPUT
  // =======================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =======================================
  // SUBMIT
  // =======================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.hospital_id) {
      alert("Please select a hospital");
      return;
    }

    if (!formData.department_id) {
      alert("Please select a department");
      return;
    }

    if (!formData.inspector_name.trim()) {
      alert("Please enter inspector name");
      return;
    }

    try {
      setLoading(true);

      const inspectionData = {
        hospital_id: formData.hospital_id,
        department_id: formData.department_id,
        inspector_name:
          formData.inspector_name.trim(),
        inspection_date:
          formData.inspection_date || null,
        overall_score:
          formData.overall_score === ""
            ? null
            : Number(formData.overall_score),
        status: formData.status,
        remarks: formData.remarks.trim(),
      };

      if (isEditMode) {
        await updateInspection(
          inspection.id,
          inspectionData
        );

        alert(
          "Inspection updated successfully"
        );
      } else {
        await createInspection(
          inspectionData
        );

        alert(
          "Inspection created successfully"
        );
      }

      setFormData(emptyForm);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(
        "Inspection Error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Inspection operation failed"
        );
      } else {
        alert(
          error.message ||
            "Inspection operation failed"
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
          disabled={loadingData}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {loadingData
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

      {/* Department */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Department
        </label>

        <select
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          disabled={loadingData}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {loadingData
              ? "Loading departments..."
              : "Select Department"}
          </option>

          {departments.map((department) => (
            <option
              key={department.id}
              value={department.id}
            >
              {department.department_name}
            </option>
          ))}
        </select>
      </div>

      {/* Inspector Name */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Inspector Name
        </label>

        <input
          type="text"
          name="inspector_name"
          placeholder="Enter inspector name"
          value={formData.inspector_name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Inspection Date */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Inspection Date
        </label>

        <input
          type="date"
          name="inspection_date"
          value={formData.inspection_date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Overall Score */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Overall Score
        </label>

        <input
          type="number"
          name="overall_score"
          placeholder="Enter score"
          min="0"
          max="100"
          step="0.01"
          value={formData.overall_score}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pending">
            Pending
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      {/* Remarks */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Remarks
        </label>

        <textarea
          name="remarks"
          placeholder="Enter inspection remarks"
          value={formData.remarks}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || loadingData}
        className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEditMode
          ? "Update Inspection"
          : "Add Inspection"}
      </button>

    </form>
  );
};

export default InspectionForm;