import supabase from "../config/supabase.js";

// ======================================
// GET ALL AI REPORTS
// ======================================
export const getAllAIReports = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ai_reports")
      .select(`
        *,
        inspections (
          inspector_name,
          inspection_date,
          overall_score,
          status
        )
      `)
      .order("generated_at", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: data.length,
      reports: data,
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
// CREATE AI REPORT
// ======================================
export const createAIReport = async (req, res) => {
  try {
    const {
      inspection_id,
      root_cause,
      corrective_action,
      preventive_action,
      priority,
    } = req.body;

    if (
      !inspection_id ||
      !root_cause ||
      !corrective_action ||
      !preventive_action ||
      !priority
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("ai_reports")
      .insert([
        {
          inspection_id,
          root_cause,
          corrective_action,
          preventive_action,
          priority,
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
      message: "AI Report created successfully",
      report: data,
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
// UPDATE AI REPORT
// ======================================
export const updateAIReport = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      inspection_id,
      root_cause,
      corrective_action,
      preventive_action,
      priority,
    } = req.body;

    if (
      !inspection_id ||
      !root_cause ||
      !corrective_action ||
      !preventive_action ||
      !priority
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const { data, error } = await supabase
      .from("ai_reports")
      .update({
        inspection_id,
        root_cause,
        corrective_action,
        preventive_action,
        priority,
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
        message: "AI Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "AI Report updated successfully",
      report: data,
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
// DELETE AI REPORT
// ======================================
export const deleteAIReport = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("ai_reports")
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
        message: "AI Report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "AI Report deleted successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};