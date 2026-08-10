import supabase from "../config/supabase.js";

// ===================================
// GET ALL DEPARTMENTS
// ===================================
export const getAllDepartments = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("departments")
      .select(`
        *,
        hospitals (
          hospital_name
        )
      `)
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
      departments: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ===================================
// CREATE DEPARTMENT
// ===================================
export const createDepartment = async (req, res) => {
  try {
    const {
      hospital_id,
      department_name,
      head_of_department,
    } = req.body;

    if (!hospital_id || !department_name) {
      return res.status(400).json({
        success: false,
        message: "Hospital and Department are required",
      });
    }

    const { data, error } = await supabase
      .from("departments")
      .insert([
        {
          hospital_id,
          department_name,
          head_of_department,
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
      message: "Department created successfully",
      department: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ===================================
// UPDATE DEPARTMENT
// ===================================
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      hospital_id,
      department_name,
      head_of_department,
    } = req.body;

    if (!hospital_id || !department_name) {
      return res.status(400).json({
        success: false,
        message: "Hospital and Department are required",
      });
    }

    const { data, error } = await supabase
      .from("departments")
      .update({
        hospital_id,
        department_name,
        head_of_department,
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
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ===================================
// DELETE DEPARTMENT
// ===================================
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("departments")
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
        message: "Department not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};