import { generateResumeFromAI } from "../services/ai.service.js";
import { safeJSONParse } from "../utils/validateJSON.js";

export async function generateResume(req, res) {
  const userData = req.body;

  try {
    const aiOutput = await generateResumeFromAI(userData);
    const parsed = safeJSONParse(aiOutput);

    if (!parsed) {
      return res.status(500).json({ error: "Invalid JSON from AI" });
    }

    res.json({
      success: true,
      resume: parsed
    });
  }  catch (error) {
  console.error("FULL ERROR:", error);

  res.status(500).json({
    success: false,
    message: "AI request failed",
    error: error.message,
    details: error.response?.data || null
  });
}
}

