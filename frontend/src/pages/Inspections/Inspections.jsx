import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import PageHeader from "../../components/ui/PageHeader";
import Modal from "../../components/ui/Modal";
import InspectionForm from "./InspectionForm";

import {
  getInspections,
  deleteInspection,
} from "../../services/inspectionService";

const Inspections = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedInspection, setSelectedInspection] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchInspections = async () => {
    try {
      setLoading(true);

      const response = await getInspections();

      setInspections(response.inspections || []);
    } catch (error) {
      console.error("Fetch Inspections Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to fetch inspections"
        );
      } else {
        alert("Failed to fetch inspections");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  // ==============================
  // ADD
  // ==============================
  const handleAdd = () => {
    setSelectedInspection(null);
    setShowModal(true);
  };

  // ==============================
  // EDIT
  // ==============================
  const handleEdit = (inspection) => {
    setSelectedInspection(inspection);
    setShowModal(true);
  };

  // ==============================
  // AFTER ADD / EDIT
  // ==============================
  const handleSuccess = async () => {
    setShowModal(false);
    setSelectedInspection(null);

    await fetchInspections();
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inspection?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteInspection(id);

      alert("Inspection deleted successfully");

      await fetchInspections();
    } catch (error) {
      console.error("Delete Inspection Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to delete inspection"
        );
      } else {
        alert("Failed to delete inspection");
      }
    }
  };

  // ==============================
  // SEARCH
  // ==============================
  const filteredInspections = inspections.filter(
    (inspection) => {
      const search = searchTerm.toLowerCase();

      return (
        inspection.inspector_name
          ?.toLowerCase()
          .includes(search) ||
        inspection.status
          ?.toLowerCase()
          .includes(search) ||
        inspection.remarks
          ?.toLowerCase()
          .includes(search) ||
        String(
          inspection.overall_score ?? ""
        ).includes(search)
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
            title="Inspections"
            subtitle="Manage hospital quality inspections"
            buttonText="+ Add Inspection"
            onButtonClick={handleAdd}
          />

          {/* Search */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">

            <input
              type="text"
              placeholder="Search inspector, status, remarks or score..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Inspection Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Inspector
                  </th>

                  <th className="p-4 text-left">
                    Inspection Date
                  </th>

                  <th className="p-4 text-left">
                    Score
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Remarks
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
                      colSpan="6"
                      className="text-center p-8 text-gray-500"
                    >
                      Loading inspections...
                    </td>
                  </tr>

                ) : filteredInspections.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-8 text-gray-500"
                    >
                      No inspections found.
                    </td>
                  </tr>

                ) : (

                  filteredInspections.map(
                    (inspection) => (

                      <tr
                        key={inspection.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-4 font-medium">
                          {inspection.inspector_name}
                        </td>

                        <td className="p-4">
                          {inspection.inspection_date ||
                            "-"}
                        </td>

                        <td className="p-4 font-semibold">
                          {inspection.overall_score ??
                            "-"}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              inspection.status ===
                              "Completed"
                                ? "bg-green-100 text-green-700"
                                : inspection.status ===
                                  "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {inspection.status ||
                              "Pending"}
                          </span>

                        </td>

                        <td className="p-4">
                          {inspection.remarks || "-"}
                        </td>

                        <td className="p-4">

                          <div className="flex justify-center gap-2">

                            {/* Edit */}
                            <button
                              onClick={() =>
                                handleEdit(
                                  inspection
                                )
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
                                  inspection.id
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

      {/* Add / Edit Inspection Modal */}
      <Modal
        isOpen={showModal}
        title={
          selectedInspection
            ? "Edit Inspection"
            : "Add New Inspection"
        }
        onClose={() => {
          setShowModal(false);
          setSelectedInspection(null);
        }}
      >

        <InspectionForm
          inspection={selectedInspection}
          onSuccess={handleSuccess}
        />

      </Modal>

    </div>
  );
};

export default Inspections;