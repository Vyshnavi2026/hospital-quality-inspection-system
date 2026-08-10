import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import PageHeader from "../../components/ui/PageHeader";
import Modal from "../../components/ui/Modal";
import AIReportForm from "./AIReportForm";

import {
  getAIReports,
  deleteAIReport,
} from "../../services/aiReportService";

import {
  generateAIReport,
} from "../../services/aiGenerationService";

import {
  getInspections,
} from "../../services/inspectionService";

const AIReports = () => {
  const [reports, setReports] = useState([]);
  const [inspections, setInspections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingInspections, setLoadingInspections] =
    useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] =
    useState(false);

  const [selectedReport, setSelectedReport] =
    useState(null);

  const [selectedInspectionId, setSelectedInspectionId] =
    useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [generating, setGenerating] = useState(false);

  // ======================================
  // FETCH AI REPORTS
  // ======================================
  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await getAIReports();

      setReports(response.reports || []);
    } catch (error) {
      console.error(
        "Fetch AI Reports Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch AI reports"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // FETCH INSPECTIONS
  // ======================================
  const fetchInspections = async () => {
    try {
      setLoadingInspections(true);

      const response = await getInspections();

      setInspections(
        response.inspections || []
      );
    } catch (error) {
      console.error(
        "Fetch Inspections Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch inspections"
      );
    } finally {
      setLoadingInspections(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ======================================
  // ADD
  // ======================================
  const handleAdd = () => {
    setSelectedReport(null);
    setShowModal(true);
  };

  // ======================================
  // EDIT
  // ======================================
  const handleEdit = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // ======================================
  // AFTER ADD / EDIT
  // ======================================
  const handleSuccess = async () => {
    setShowModal(false);
    setSelectedReport(null);

    await fetchReports();
  };

  // ======================================
  // DELETE
  // ======================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this AI report?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteAIReport(id);

      alert(
        "AI Report deleted successfully"
      );

      await fetchReports();
    } catch (error) {
      console.error(
        "Delete AI Report Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete AI report"
      );
    }
  };

  // ======================================
  // OPEN GENERATE MODAL
  // ======================================
  const handleOpenGenerate = async () => {
    setSelectedInspectionId("");
    setShowGenerateModal(true);

    await fetchInspections();
  };

  // ======================================
  // GENERATE AI REPORT
  // ======================================
  const handleGenerate = async () => {
    if (!selectedInspectionId) {
      alert("Please select an inspection");
      return;
    }

    try {
      setGenerating(true);

      await generateAIReport(
        selectedInspectionId
      );

      alert(
        "🤖 AI Report generated successfully!"
      );

      setShowGenerateModal(false);
      setSelectedInspectionId("");

      await fetchReports();
    } catch (error) {
      console.error(
        "Generate AI Report Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate AI report"
      );
    } finally {
      setGenerating(false);
    }
  };

  // ======================================
  // SEARCH
  // ======================================
  const filteredReports = reports.filter(
    (report) => {
      const search =
        searchTerm.toLowerCase();

      const inspectorName =
        report.inspections?.inspector_name ||
        "";

      return (
        inspectorName
          .toLowerCase()
          .includes(search) ||
        report.root_cause
          ?.toLowerCase()
          .includes(search) ||
        report.corrective_action
          ?.toLowerCase()
          .includes(search) ||
        report.preventive_action
          ?.toLowerCase()
          .includes(search) ||
        report.priority
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8">

          {/* ======================================
              PAGE HEADER
          ====================================== */}
          <div className="flex items-center justify-between mb-6">

            <PageHeader
              title="AI Reports"
              subtitle="Manage AI-generated inspection reports"
              buttonText="+ Add AI Report"
              onButtonClick={handleAdd}
            />

            <button
              onClick={handleOpenGenerate}
              disabled={generating}
              className="bg-purple-700 text-white px-5 py-3 rounded-lg hover:bg-purple-800 disabled:opacity-50"
            >
              🤖 Generate AI Report
            </button>

          </div>

          {/* ======================================
              SEARCH
          ====================================== */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">

            <input
              type="text"
              placeholder="Search inspector, root cause, actions or priority..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* ======================================
              AI REPORT TABLE
          ====================================== */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

            <table className="w-full min-w-[1600px]">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Inspector
                  </th>

                  <th className="p-4 text-left">
                    Inspection Date
                  </th>

                  <th className="p-4 text-left">
                    Root Cause
                  </th>

                  <th className="p-4 text-left">
                    Corrective Action
                  </th>

                  <th className="p-4 text-left">
                    Preventive Action
                  </th>

                  <th className="p-4 text-left">
                    Priority
                  </th>

                  <th className="p-4 text-left">
                    Generated At
                  </th>

                  <th className="p-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>
                    <td
                      colSpan="8"
                      className="text-center p-8 text-gray-500"
                    >
                      Loading AI reports...
                    </td>
                  </tr>

                ) : filteredReports.length === 0 ? (

                  <tr>
                    <td
                      colSpan="8"
                      className="text-center p-8 text-gray-500"
                    >
                      No AI reports found.
                    </td>
                  </tr>

                ) : (

                  filteredReports.map(
                    (report) => {

                      const inspection =
                        report.inspections;

                      return (
                        <tr
                          key={report.id}
                          className="border-b hover:bg-gray-50 align-top"
                        >

                          {/* Inspector */}
                          <td className="p-4 font-medium">
                            {inspection?.inspector_name ||
                              "Unknown"}
                          </td>

                          {/* Inspection Date */}
                          <td className="p-4 whitespace-nowrap">
                            {inspection?.inspection_date
                              ? new Date(
                                  inspection.inspection_date
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "-"}
                          </td>

                          {/* Root Cause */}
                          <td className="p-4 min-w-[220px]">
                            {report.root_cause || "-"}
                          </td>

                          {/* Corrective Action */}
                          <td className="p-4 min-w-[250px]">
                            {report.corrective_action ||
                              "-"}
                          </td>

                          {/* Preventive Action */}
                          <td className="p-4 min-w-[250px]">
                            {report.preventive_action ||
                              "-"}
                          </td>

                          {/* Priority */}
                          <td className="p-4">

                            <span
                              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                                report.priority ===
                                "Critical"
                                  ? "bg-red-200 text-red-800"
                                  : report.priority ===
                                    "High"
                                  ? "bg-red-100 text-red-700"
                                  : report.priority ===
                                    "Medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {report.priority}
                            </span>

                          </td>

                          {/* Generated At */}
                          <td className="p-4 whitespace-nowrap">
                            {report.generated_at
                              ? new Date(
                                  report.generated_at
                                ).toLocaleString(
                                  "en-IN"
                                )
                              : "-"}
                          </td>

                          {/* Actions */}
                          <td className="p-4">

                            <div className="flex justify-center gap-2">

                              <button
                                onClick={() =>
                                  handleEdit(
                                    report
                                  )
                                }
                                className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200"
                                title="Edit"
                              >
                                ✏️
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(
                                    report.id
                                  )
                                }
                                className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200"
                                title="Delete"
                              >
                                🗑️
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

      {/* ======================================
          MANUAL ADD / EDIT MODAL
      ====================================== */}
      <Modal
        isOpen={showModal}
        title={
          selectedReport
            ? "Edit AI Report"
            : "Add New AI Report"
        }
        onClose={() => {
          setShowModal(false);
          setSelectedReport(null);
        }}
      >

        <AIReportForm
          report={selectedReport}
          onSuccess={handleSuccess}
        />

      </Modal>

      {/* ======================================
          GENERATE AI MODAL
      ====================================== */}
      <Modal
        isOpen={showGenerateModal}
        title="🤖 Generate AI Report"
        onClose={() => {
          if (!generating) {
            setShowGenerateModal(false);
            setSelectedInspectionId("");
          }
        }}
      >

        <div className="space-y-5">

          <div>

            <p className="text-gray-600 mb-4">
              Select an inspection. Gemini will
              analyze the inspection and its findings
              and generate the quality report.
            </p>

            <label className="block mb-2 font-medium text-gray-700">
              Select Inspection
            </label>

            <select
              value={selectedInspectionId}
              onChange={(e) =>
                setSelectedInspectionId(
                  e.target.value
                )
              }
              disabled={
                loadingInspections ||
                generating
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            >

              <option value="">
                {loadingInspections
                  ? "Loading inspections..."
                  : "Select an inspection"}
              </option>

              {inspections.map(
                (inspection) => (
                  <option
                    key={inspection.id}
                    value={inspection.id}
                  >
                    {inspection.inspector_name} -{" "}
                    {inspection.inspection_date ||
                      "No Date"}{" "}
                    - Score:{" "}
                    {inspection.overall_score ??
                      "N/A"}
                  </option>
                )
              )}

            </select>

          </div>

          <button
            onClick={handleGenerate}
            disabled={
              !selectedInspectionId ||
              loadingInspections ||
              generating
            }
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-800 disabled:opacity-50"
          >
            {generating
              ? "🤖 Gemini is analyzing..."
              : "🤖 Generate Report"}
          </button>

        </div>

      </Modal>

    </div>
  );
};

export default AIReports;