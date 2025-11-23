// controllers/project.controller.js
import { projectEnhancerAI } from "../services/project.service.js";

export async function enhanceProject(req, res) {
  try {
    const { name, bullets } = req.body;

    if (!name || !bullets) {
      return res
        .status(400)
        .json({ success: false, error: "Project name and bullets are required." });
    }

    const enhanced = await projectEnhancerAI({ name, bullets });

    return res.json({
      success: true,
      enhanced: enhanced.bullets // array of improved bullets
    });

  } catch (e) {
    console.error("PROJECT ENHANCER ERROR:", e);
    return res
      .status(500)
      .json({ success: false, error: "Project enhancement failed" });
  }
}
