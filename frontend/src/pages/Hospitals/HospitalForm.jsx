import { useEffect, useState } from "react";
import {
  createHospital,
  updateHospital,
} from "../../services/hospitalService";

const emptyForm = {
  hospital_name: "",
  address: "",
  city: "",
  state: "",
  contact_person: "",
  contact_number: "",
};

const HospitalForm = ({ hospital, onSuccess }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(hospital);

  useEffect(() => {
    if (hospital) {
      setFormData({
        hospital_name: hospital.hospital_name || "",
        address: hospital.address || "",
        city: hospital.city || "",
        state: hospital.state || "",
        contact_person: hospital.contact_person || "",
        contact_number: hospital.contact_number || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [hospital]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditMode) {
        await updateHospital(hospital.id, formData);
        alert("Hospital updated successfully");
      } else {
        await createHospital(formData);
        alert("Hospital added successfully");
      }

      setFormData(emptyForm);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Hospital Error:", error);

      if (error.response) {
        alert(
          error.response.data?.message ||
            "Operation failed"
        );
      } else {
        alert(error.message || "Operation failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <input
        type="text"
        name="hospital_name"
        placeholder="Hospital Name"
        value={formData.hospital_name}
        onChange={handleChange}
        className="border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
        className="border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        name="contact_person"
        placeholder="Contact Person"
        value={formData.contact_person}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="text"
        name="contact_number"
        placeholder="Contact Number"
        value={formData.contact_number}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : isEditMode
          ? "Update Hospital"
          : "Add Hospital"}
      </button>
    </form>
  );
};

export default HospitalForm;