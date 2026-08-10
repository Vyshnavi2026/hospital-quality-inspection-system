import { useEffect, useState } from "react";

import {
  createFinding,
  updateFinding,
} from "../../services/findingService";

import { getInspections } from "../../services/inspectionService";

const emptyForm = {
  inspection_id: "",
  category: "",
  finding: "",
  severity: "Medium",
  recommendation: "",
};

const FindingForm = ({ finding, onSuccess }) => {
  const [formData, setFormData] = useState(emptyForm);

  const [inspections, setInspections] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingInspections, setLoadingInspections] =
    useState(true);

  const isEditMode = Boolean(finding);

  // =======================================
  // LOAD INSPECTIONS
  // =======================================
  useEffect(() => {
    loadInspections();
  }, []);

  // =======================================
  // LOAD EXISTING FINDING
  // =======================================
  useEffect(() => {
    if (finding) {
      setFormData({
        inspection_id:
          finding.inspection_id || "",
        category: finding.category || "",
        finding: finding.finding || "",
        severity:
          finding.severity || "Medium",
        recommendation:
          finding.recommendation || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [finding]);

  // =======================================
  // GET INSPECTIONS
  // =======================================
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

    if (!formData.inspection_id) {
      alert("Please select an inspection");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter category");
      return;
    }

    if (!formData.finding.trim()) {
      alert("Please enter finding");
      return;
    }

    if (!formData.severity) {
      alert("Please select severity");
      return;
    }

    try {
      setLoading(true);

      const findingData = {
        inspection_id:
          formData.inspection_id,
        category:
          formData.category.trim(),
        finding:
          formData.finding.trim(),
        severity:
          formData.severity,
        recommendation:
          formData.recommendation.trim(),
      };

      if (isEditMode) {
        await updateFinding(
          finding.id,
          findingData
        );

        alert(
          "Finding updated successfully"
        );
      } else {
        await createFinding(
          findingData
        );

        alert(
          "Finding created successfully"
        );
      }

      setFormData(emptyForm);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(
        "Finding Error:",
        error
      );

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Finding operation failed"
        );
      } else {
        alert(
          error.message ||
            "Finding operation failed"
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

      {/* Category */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Category
        </label>

        <input
          type="text"
          name="category"
          placeholder="Example: Safety"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Finding */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Finding
        </label>

        <textarea
          name="finding"
          placeholder="Describe the finding..."
          value={formData.finding}
          onChange={handleChange}
          rows="4"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Severity */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Severity
        </label>

        <select
          name="severity"
          value={formData.severity}
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

      {/* Recommendation */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Recommendation
        </label>

        <textarea
          name="recommendation"
          placeholder="Enter recommendation..."
          value={formData.recommendation}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          ? "Update Finding"
          : "Add Finding"}
      </button>

    </form>
  );
};

export default FindingForm;