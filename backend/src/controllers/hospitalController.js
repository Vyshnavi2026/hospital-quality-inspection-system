import supabase from "../config/supabase.js";

// ======================================
// GET ALL HOSPITALS
// ======================================
export const getAllHospitals = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("hospitals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      hospitals: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// CREATE HOSPITAL
// ======================================
export const createHospital = async (req, res) => {
  try {
    console.log("POST Hospital API Hit");
    console.log(req.body);

    const {
      hospital_name,
      address,
      city,
      state,
      contact_person,
      contact_number,
    } = req.body;

    if (!hospital_name || !address || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("hospitals")
      .insert([
        {
          hospital_name,
          address,
          city,
          state,
          contact_person,
          contact_number,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Hospital added successfully",
      hospital: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// UPDATE HOSPITAL
// ======================================
export const updateHospital = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      hospital_name,
      address,
      city,
      state,
      contact_person,
      contact_number,
    } = req.body;

    if (!hospital_name || !address || !city || !state) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("hospitals")
      .update({
        hospital_name,
        address,
        city,
        state,
        contact_person,
        contact_number,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hospital updated successfully",
      hospital: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ======================================
// DELETE HOSPITAL
// ======================================
export const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("hospitals")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hospital deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};