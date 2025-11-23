import { summaryEnhancerAI } from "../services/summary.service.js"

export async function generateSummary(req, res) {
  try {
    const { role, summary } = req.body;

    if (!role || !summary) {
      return res.status(400).json({ success: false, error: "Role and summary are required." });
    }

    // Call AI service correctly
    const enhanced = await summaryEnhancerAI({ role, summary });

    // enhanced = { summary: "improved version here" }

    return res.json({
      success: true,
      enhanced: {
        summary: enhanced.summary
      }
    });

  } catch (e) {
    console.error("SUMMARY ERROR:", e);
    return res.status(500).json({ success: false, error: "Summary generation failed" });
  }
}
