import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import PageHeader from "../../components/ui/PageHeader";
import Modal from "../../components/ui/Modal";
import HospitalForm from "./HospitalForm";

import {
  getHospitals,
  deleteHospital,
} from "../../services/hospitalService";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const fetchHospitals = async () => {
    try {
      setLoading(true);

      const response = await getHospitals();

      setHospitals(response.hospitals || []);
    } catch (error) {
      console.error("Fetch Hospitals Error:", error);
      alert("Failed to fetch hospitals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleAdd = () => {
    setSelectedHospital(null);
    setShowModal(true);
  };

  const handleEdit = (hospital) => {
    setSelectedHospital(hospital);
    setShowModal(true);
  };

  const handleSuccess = async () => {
    setShowModal(false);
    setSelectedHospital(null);
    await fetchHospitals();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hospital?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteHospital(id);

      alert("Hospital deleted successfully");

      await fetchHospitals();
    } catch (error) {
      console.error("Delete Hospital Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to delete hospital"
        );
      } else {
        alert("Failed to delete hospital");
      }
    }
  };

  // Search
  const filteredHospitals = hospitals.filter((hospital) => {
    const search = searchTerm.toLowerCase();

    return (
      hospital.hospital_name
        ?.toLowerCase()
        .includes(search) ||
      hospital.city
        ?.toLowerCase()
        .includes(search) ||
      hospital.state
        ?.toLowerCase()
        .includes(search)
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Header />

        <main className="p-8">

          <PageHeader
            title="Hospitals"
            subtitle="Manage hospitals registered in the system"
            buttonText="+ Add Hospital"
            onButtonClick={handleAdd}
          />

          {/* Search */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">

            <input
              type="text"
              placeholder="Search by hospital name, city or state..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Hospital Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Hospital
                  </th>

                  <th className="p-4 text-left">
                    Address
                  </th>

                  <th className="p-4 text-left">
                    City
                  </th>

                  <th className="p-4 text-left">
                    State
                  </th>

                  <th className="p-4 text-left">
                    Contact Person
                  </th>

                  <th className="p-4 text-left">
                    Phone
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
                      colSpan="7"
                      className="text-center p-8 text-gray-500"
                    >
                      Loading hospitals...
                    </td>
                  </tr>

                ) : filteredHospitals.length === 0 ? (

                  <tr>
                    <td
                      colSpan="7"
                      className="text-center p-8 text-gray-500"
                    >
                      No hospitals found.
                    </td>
                  </tr>

                ) : (

                  filteredHospitals.map((hospital) => (

                    <tr
                      key={hospital.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 font-medium">
                        {hospital.hospital_name}
                      </td>

                      <td className="p-4">
                        {hospital.address}
                      </td>

                      <td className="p-4">
                        {hospital.city}
                      </td>

                      <td className="p-4">
                        {hospital.state}
                      </td>

                      <td className="p-4">
                        {hospital.contact_person || "-"}
                      </td>

                      <td className="p-4">
                        {hospital.contact_number || "-"}
                      </td>

                      <td className="p-4">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              handleEdit(hospital)
                            }
                            className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200"
                          >
                            ✏️
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(hospital.id)
                            }
                            className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200"
                          >
                            🗑️
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </main>

      </div>

      {/* Add / Edit Hospital Modal */}
      <Modal
        isOpen={showModal}
        title={
          selectedHospital
            ? "Edit Hospital"
            : "Add New Hospital"
        }
        onClose={() => {
          setShowModal(false);
          setSelectedHospital(null);
        }}
      >

        <HospitalForm
          hospital={selectedHospital}
          onSuccess={handleSuccess}
        />

      </Modal>

    </div>
  );
};

export default Hospitals;