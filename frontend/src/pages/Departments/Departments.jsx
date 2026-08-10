import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import PageHeader from "../../components/ui/PageHeader";
import Modal from "../../components/ui/Modal";
import DepartmentForm from "./DepartmentForm";

import {
  getDepartments,
  deleteDepartment,
} from "../../services/departmentService";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const response = await getDepartments();

      setDepartments(response.departments || []);
    } catch (error) {
      console.error("Fetch Departments Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to fetch departments"
        );
      } else {
        alert("Failed to fetch departments");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Add Department
  const handleAdd = () => {
    setSelectedDepartment(null);
    setShowModal(true);
  };

  // Edit Department
  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  // After Add / Edit
  const handleSuccess = async () => {
    setShowModal(false);
    setSelectedDepartment(null);

    await fetchDepartments();
  };

  // Delete Department
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteDepartment(id);

      alert("Department deleted successfully");

      await fetchDepartments();
    } catch (error) {
      console.error("Delete Department Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Failed to delete department"
        );
      } else {
        alert("Failed to delete department");
      }
    }
  };

  // Search
  const filteredDepartments = departments.filter(
    (department) => {
      const search = searchTerm.toLowerCase();

      return (
        department.department_name
          ?.toLowerCase()
          .includes(search) ||
        department.head_of_department
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

          <PageHeader
            title="Departments"
            subtitle="Manage hospital departments"
            buttonText="+ Add Department"
            onButtonClick={handleAdd}
          />

          {/* Search */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">

            <input
              type="text"
              placeholder="Search department or head of department..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Department Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Department
                  </th>

                  <th className="p-4 text-left">
                    Head of Department
                  </th>

                  <th className="p-4 text-left">
                    Hospital ID
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
                      colSpan="4"
                      className="text-center p-8 text-gray-500"
                    >
                      Loading departments...
                    </td>
                  </tr>

                ) : filteredDepartments.length === 0 ? (

                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-8 text-gray-500"
                    >
                      No departments found.
                    </td>
                  </tr>

                ) : (

                  filteredDepartments.map(
                    (department) => (

                      <tr
                        key={department.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-4 font-medium">
                          {department.department_name}
                        </td>

                        <td className="p-4">
                          {department.head_of_department ||
                            "-"}
                        </td>

                        <td className="p-4 text-sm text-gray-500">
                          {department.hospital_id}
                        </td>

                        <td className="p-4">

                          <div className="flex justify-center gap-2">

                            {/* Edit */}
                            <button
                              onClick={() =>
                                handleEdit(department)
                              }
                              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200"
                            >
                              ✏️
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() =>
                                handleDelete(
                                  department.id
                                )
                              }
                              className="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200"
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

      {/* Add / Edit Department Modal */}
      <Modal
        isOpen={showModal}
        title={
          selectedDepartment
            ? "Edit Department"
            : "Add New Department"
        }
        onClose={() => {
          setShowModal(false);
          setSelectedDepartment(null);
        }}
      >

        <DepartmentForm
          department={selectedDepartment}
          onSuccess={handleSuccess}
        />

      </Modal>

    </div>
  );
};

export default Departments;