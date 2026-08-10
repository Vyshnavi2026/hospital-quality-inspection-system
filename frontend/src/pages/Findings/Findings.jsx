import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import PageHeader from "../../components/ui/PageHeader";
import Modal from "../../components/ui/Modal";
import FindingForm from "./FindingForm";

import {
  getFindings,
  deleteFinding,
} from "../../services/findingService";

const Findings = () => {
  const [findings, setFindings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedFinding, setSelectedFinding] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // =======================================
  // FETCH FINDINGS
  // =======================================
  const fetchFindings = async () => {
    try {
      setLoading(true);

      const response = await getFindings();

      setFindings(response.findings || []);
    } catch (error) {
      console.error("Fetch Findings Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to fetch findings"
        );
      } else {
        alert("Failed to fetch findings");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFindings();
  }, []);

  // =======================================
  // ADD FINDING
  // =======================================
  const handleAdd = () => {
    setSelectedFinding(null);
    setShowModal(true);
  };

  // =======================================
  // EDIT FINDING
  // =======================================
  const handleEdit = (finding) => {
    setSelectedFinding(finding);
    setShowModal(true);
  };

  // =======================================
  // AFTER ADD / EDIT
  // =======================================
  const handleSuccess = async () => {
    setShowModal(false);
    setSelectedFinding(null);

    await fetchFindings();
  };

  // =======================================
  // DELETE FINDING
  // =======================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this finding?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteFinding(id);

      alert("Finding deleted successfully");

      await fetchFindings();
    } catch (error) {
      console.error("Delete Finding Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to delete finding"
        );
      } else {
        alert("Failed to delete finding");
      }
    }
  };

  // =======================================
  // SEARCH
  // =======================================
  const filteredFindings = findings.filter(
    (finding) => {
      const search = searchTerm.toLowerCase();

      return (
        finding.category
          ?.toLowerCase()
          .includes(search) ||
        finding.finding
          ?.toLowerCase()
          .includes(search) ||
        finding.severity
          ?.toLowerCase()
          .includes(search) ||
        finding.recommendation
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">

        {/* Header */}
        <Header />

        <main className="p-8">

          {/* Page Header */}
          <PageHeader
            title="Inspection Findings"
            subtitle="Manage findings identified during inspections"
            buttonText="+ Add Finding"
            onButtonClick={handleAdd}
          />

          {/* Search */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">

            <input
              type="text"
              placeholder="Search category, finding, severity or recommendation..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Findings Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Category
                  </th>

                  <th className="p-4 text-left">
                    Finding
                  </th>

                  <th className="p-4 text-left">
                    Severity
                  </th>

                  <th className="p-4 text-left">
                    Recommendation
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
                      colSpan="5"
                      className="text-center p-8 text-gray-500"
                    >
                      Loading findings...
                    </td>
                  </tr>

                ) : filteredFindings.length === 0 ? (

                  <tr>
                    <td
                      colSpan="5"
                      className="text-center p-8 text-gray-500"
                    >
                      No findings found.
                    </td>
                  </tr>

                ) : (

                  filteredFindings.map(
                    (finding) => (

                      <tr
                        key={finding.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-4 font-medium">
                          {finding.category}
                        </td>

                        <td className="p-4">
                          {finding.finding}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              finding.severity ===
                              "Critical"
                                ? "bg-red-200 text-red-800"
                                : finding.severity ===
                                  "High"
                                ? "bg-red-100 text-red-700"
                                : finding.severity ===
                                  "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {finding.severity}
                          </span>

                        </td>

                        <td className="p-4">
                          {finding.recommendation ||
                            "-"}
                        </td>

                        <td className="p-4">

                          <div className="flex justify-center gap-2">

                            {/* Edit */}
                            <button
                              onClick={() =>
                                handleEdit(finding)
                              }
                              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200"
                              title="Edit"
                            >
                              ✏️
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() =>
                                handleDelete(
                                  finding.id
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

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

      {/* Add / Edit Finding Modal */}
      <Modal
        isOpen={showModal}
        title={
          selectedFinding
            ? "Edit Finding"
            : "Add New Finding"
        }
        onClose={() => {
          setShowModal(false);
          setSelectedFinding(null);
        }}
      >

        <FindingForm
          finding={selectedFinding}
          onSuccess={handleSuccess}
        />

      </Modal>

    </div>
  );
};

export default Findings;