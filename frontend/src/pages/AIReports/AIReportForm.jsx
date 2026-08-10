import { useEffect, useState } from "react";

import {
  createAIReport,
  updateAIReport,
} from "../../services/aiReportService";

import { getInspections } from "../../services/inspectionService";

const emptyForm = {
  inspection_id: "",
  root_cause: "",
  corrective_action: "",
  preventive_action: "",
  priority: "Medium",
};

const AIReportForm = ({ report, onSuccess }) => {
  const [formData, setFormData] = useState(emptyForm);

  const [inspections, setInspections] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingInspections, setLoadingInspections] =
    useState(true);

  const isEditMode = Boolean(report);

  // ======================================
  // LOAD INSPECTIONS
  // ======================================
  useEffect(() => {
    loadInspections();
  }, []);

  // ======================================
  // LOAD EXISTING REPORT
  // ======================================
  useEffect(() => {
    if (report) {
      setFormData({
        inspection_id:
          report.inspection_id || "",
        root_cause:
          report.root_cause || "",
        corrective_action:
          report.corrective_action || "",
        preventive_action:
          report.preventive_action || "",
        priority:
          report.priority || "Medium",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [report]);

  // ======================================
  // GET INSPECTIONS
  // ======================================
  const loadInspections = async () => {
    try {
      setLoadingInspections(true);

      const response = await getInspections();

      setInspections(
        response.inspections || []
      );
    } catch (error) {
      console.error(
        "Load Inspections Error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to load inspections"
        );
      } else {
        alert("Failed to load inspections");
      }
    } finally {
      setLoadingInspections(false);
    }
  };

  // ======================================
  // HANDLE INPUT
  // ======================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ======================================
  // SUBMIT
  // ======================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.inspection_id) {
      alert("Please select an inspection");
      return;
    }

    if (!formData.root_cause.trim()) {
      alert("Please enter root cause");
      return;
    }

    if (!formData.corrective_action.trim()) {
      alert("Please enter corrective action");
      return;
    }

    if (!formData.preventive_action.trim()) {
      alert("Please enter preventive action");
      return;
    }

    if (!formData.priority) {
      alert("Please select priority");
      return;
    }

    try {
      setLoading(true);

      const reportData = {
        inspection_id:
          formData.inspection_id,

        root_cause:
          formData.root_cause.trim(),

        corrective_action:
          formData.corrective_action.trim(),

        preventive_action:
          formData.preventive_action.trim(),

        priority:
          formData.priority,
      };

      if (isEditMode) {
        await updateAIReport(
          report.id,
          reportData
        );

        alert(
          "AI Report updated successfully"
        );
      } else {
        await createAIReport(
          reportData
        );

        alert(
          "AI Report created successfully"
        );
      }

      setFormData(emptyForm);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(
        "AI Report Error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data?.message ||
            "AI Report operation failed"
        );
      } else {
        alert(
          error.message ||
            "AI Report operation failed"
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

      {/* Inspection */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Inspection
        </label>

        <select
          name="inspection_id"
          value={formData.inspection_id}
          onChange={handleChange}
          disabled={loadingInspections}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">
            {loadingInspections
              ? "Loading inspections..."
              : "Select Inspection"}
          </option>

          {inspections.map(
            (inspection) => (
              <option
                key={inspection.id}
                value={inspection.id}
              >
                {inspection.inspector_name} -{" "}
                {inspection.inspection_date ||
                  "No Date"}
              </option>
            )
          )}
        </select>
      </div>

      {/* Root Cause */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Root Cause
        </label>

        <textarea
          name="root_cause"
          placeholder="Enter root cause..."
          value={formData.root_cause}
          onChange={handleChange}
          rows="3"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Corrective Action */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Corrective Action
        </label>

        <textarea
          name="corrective_action"
          placeholder="Enter corrective action..."
          value={formData.corrective_action}
          onChange={handleChange}
          rows="3"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Preventive Action */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Preventive Action
        </label>

        <textarea
          name="preventive_action"
          placeholder="Enter preventive action..."
          value={formData.preventive_action}
          onChange={handleChange}
          rows="3"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

          <option value="Critical">
            Critical
          </option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={
          loading ||
          loadingInspections
        }
        className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEditMode
          ? "Update AI Report"
          : "Add AI Report"}
      </button>

    </form>
  );
};

export default AIReportForm;