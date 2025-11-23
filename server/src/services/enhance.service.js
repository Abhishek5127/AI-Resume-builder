import axios from "axios";

export async function enhanceExperienceAI(data) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "kwaipilot/kat-coder-pro:free",

        messages: [
          {
            role: "system",
            content: `
You are an expert resume writer specializing in ATS-optimized work experience.

Return ONLY THIS JSON:

{
  "bullets": ["string", "string", "string"]
}

RULES:
- Generate 3 professional bullet points
- Each bullet must be 1 line long (comma or semicolon allowed)
- Use strong action verbs
- Add metrics (10–50%) if missing
- Keep realistic achievements
- Do NOT repeat the same structure
- Do NOT change company, role, or date
`
          },
          {
            role: "user",
            content: `
Rewrite this experience professionally:

Company: ${data.company}
Role: ${data.role}
Date: ${data.date}

Bullets:
${data.bullets}
`
          }
        ],

        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "AI Resume Enhancer"
        }
      }
    );

    return JSON.parse(response.data.choices[0].message.content);

  } catch (error) {
    console.error("ENHANCER ERROR:", error.response?.data || error.message);
    throw new Error("Enhancement failed");
  }
}



export async function predictSkillsAI(role) {
  const prompt = `
  Suggest 8–12 modern, relevant skills for this job role:
  Role: ${role}

  ONLY return JSON:
  { "skills": ["skill1", "skill2", ...] }
  `;

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "kwaipilot/kat-coder-pro:free",
      messages: [
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
    }
  );

  const data = JSON.parse(response.data.choices[0].message.content);
  return data.skills;
}