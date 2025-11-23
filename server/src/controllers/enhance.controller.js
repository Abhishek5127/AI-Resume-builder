import { enhanceExperienceAI } from "../services/enhance.service.js";
import { predictSkillsAI } from "../services/enhance.service.js";

export async function enhanceText(req, res) {
  try {
    const improved = await enhanceExperienceAI(req.body);

    res.json({ 
      success: true, 
      enhanced: improved 
    });

  } catch (e) {
    res.status(500).json({ success: false, error: "Enhancement failed" });
  }
}

export async function predictSkills(req, res) {
  try {
    const { role } = req.body;
    const skills = await predictSkillsAI(role);
    res.json({ success: true, skills });
  } catch (e) {
    res.status(500).json({ success: false, error: "Skill prediction failed" });
  }
}

