import supabase from "../config/supabase.js";

// =======================================
// GET ALL FINDINGS
// =======================================
export const getAllFindings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("inspection_findings")
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
      findings: data,
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
// CREATE FINDING
// =======================================
export const createFinding = async (req, res) => {
  try {
    const {
      inspection_id,
      category,
      finding,
      severity,
      recommendation,
    } = req.body;

    if (
      !inspection_id ||
      !category ||
      !finding ||
      !severity
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("inspection_findings")
      .insert([
        {
          inspection_id,
          category,
          finding,
          severity,
          recommendation,
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
      message: "Finding created successfully",
      finding: data,
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
// UPDATE FINDING
// =======================================
export const updateFinding = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      inspection_id,
      category,
      finding,
      severity,
      recommendation,
    } = req.body;

    if (
      !inspection_id ||
      !category ||
      !finding ||
      !severity
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("inspection_findings")
      .update({
        inspection_id,
        category,
        finding,
        severity,
        recommendation,
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
        message: "Finding not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Finding updated successfully",
      finding: data,
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
// DELETE FINDING
// =======================================
export const deleteFinding = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("inspection_findings")
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
        message: "Finding not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Finding deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};