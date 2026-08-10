import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateInspectionReport = async ({
  inspection,
  findings,
}) => {
  const findingsText = findings
    .map(
      (item, index) => `
Finding ${index + 1}:
Category: ${item.category}
Finding: ${item.finding}
Severity: ${item.severity}
Recommendation: ${item.recommendation || "Not provided"}
`
    )
    .join("\n");

  const prompt = `
You are an expert Hospital Quality and Safety AI Agent.

Analyze the following hospital inspection and its findings.

INSPECTION:
Inspector: ${inspection.inspector_name}
Inspection Date: ${inspection.inspection_date || "Not provided"}
Overall Score: ${inspection.overall_score ?? "Not provided"}
Status: ${inspection.status || "Not provided"}

FINDINGS:
${findingsText || "No findings available."}

Generate a professional quality-improvement report.

Return ONLY valid JSON using exactly these fields:

{
  "root_cause": "Main root cause identified from the findings",
  "corrective_action": "Immediate actions that should be taken",
  "preventive_action": "Long-term actions to prevent recurrence",
  "priority": "Low, Medium, High, or Critical"
}

Rules:
- Base the response only on the inspection and findings provided.
- Do not invent specific facts.
- Priority must be exactly one of: Low, Medium, High, Critical.
- Keep each response clear and practical.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return JSON.parse(response.text);
};