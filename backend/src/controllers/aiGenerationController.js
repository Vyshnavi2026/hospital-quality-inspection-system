import supabase from "../config/supabase.js";

import {
  generateInspectionReport,
} from "../services/geminiService.js";

// ======================================
// GENERATE AI REPORT
// ======================================
export const generateAIReport = async (req, res) => {
  try {
    const { inspection_id } = req.body;

    // --------------------------------------
    // Validate inspection ID
    // --------------------------------------
    if (!inspection_id) {
      return res.status(400).json({
        success: false,
        message: "Inspection ID is required",
      });
    }

    // --------------------------------------
    // Get inspection
    // --------------------------------------
    const {
      data: inspection,
      error: inspectionError,
    } = await supabase
      .from("inspections")
      .select("*")
      .eq("id", inspection_id)
      .single();

    if (inspectionError) {
      return res.status(404).json({
        success: false,
        message: "Inspection not found",
      });
    }

    // --------------------------------------
    // Get findings
    // --------------------------------------
    const {
      data: findings,
      error: findingsError,
    } = await supabase
      .from("inspection_findings")
      .select("*")
      .eq("inspection_id", inspection_id);

    if (findingsError) {
      return res.status(400).json({
        success: false,
        message: findingsError.message,
      });
    }

    // --------------------------------------
    // Generate report using Gemini
    // --------------------------------------
    const aiReport =
      await generateInspectionReport({
        inspection,
        findings: findings || [],
      });

    // --------------------------------------
    // Validate AI response
    // --------------------------------------
    if (
      !aiReport.root_cause ||
      !aiReport.corrective_action ||
      !aiReport.preventive_action ||
      !aiReport.priority
    ) {
      return res.status(500).json({
        success: false,
        message:
          "Gemini returned an incomplete report",
      });
    }

    // --------------------------------------
    // Save AI report to Supabase
    // --------------------------------------
    const {
      data: savedReport,
      error: saveError,
    } = await supabase
      .from("ai_reports")
      .insert([
        {
          inspection_id,
          root_cause: aiReport.root_cause,
          corrective_action:
            aiReport.corrective_action,
          preventive_action:
            aiReport.preventive_action,
          priority: aiReport.priority,
        },
      ])
      .select();

    if (saveError) {
      return res.status(400).json({
        success: false,
        message: saveError.message,
      });
    }

    // --------------------------------------
    // Success
    // --------------------------------------
    return res.status(201).json({
      success: true,
      message:
        "AI Report generated successfully",
      report: savedReport,
    });
  } catch (error) {
    console.error(
      "AI Report Generation Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate AI report",
    });
  }
};