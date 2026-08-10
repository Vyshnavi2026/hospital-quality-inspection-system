import supabase from "../config/supabase.js";

// =======================================
// GET ALL INSPECTIONS
// =======================================
export const getAllInspections = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("inspections")
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
      inspections: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================================
// CREATE INSPECTION
// =======================================
export const createInspection = async (req, res) => {
  try {
    const {
      hospital_id,
      department_id,
      inspector_name,
      inspection_date,
      overall_score,
      status,
      remarks,
    } = req.body;

    if (
      !hospital_id ||
      !department_id ||
      !inspector_name
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("inspections")
      .insert([
        {
          hospital_id,
          department_id,
          inspector_name,
          inspection_date,
          overall_score,
          status,
          remarks,
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
      message: "Inspection created successfully",
      inspection: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================================
// UPDATE INSPECTION
// =======================================
export const updateInspection = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      hospital_id,
      department_id,
      inspector_name,
      inspection_date,
      overall_score,
      status,
      remarks,
    } = req.body;

    if (
      !hospital_id ||
      !department_id ||
      !inspector_name
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("inspections")
      .update({
        hospital_id,
        department_id,
        inspector_name,
        inspection_date,
        overall_score,
        status,
        remarks,
      })
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inspection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inspection updated successfully",
      inspection: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =======================================
// DELETE INSPECTION
// =======================================
export const deleteInspection = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("inspections")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inspection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inspection deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};