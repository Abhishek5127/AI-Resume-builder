// project.service.js
import axios from "axios";

export async function projectEnhancerAI(data) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "kwaipilot/kat-coder-pro:free",

        messages: [
          {
            role: "system",
            content: `
You are a professional resume project bullet enhancer.

Return ONLY this JSON:
{
  "bullets": ["string", "string", ...]
}

RULES:
- Improve the clarity and impact of project description bullets.
- Keep bullets short, crisp, and achievement-focused.
- Max 3 bullets.
- Use strong action verbs.
- No more than 90 characters per bullet.
- No fluff, no exaggeration.
- Keep tone corporate and realistic.
`
          },
          {
            role: "user",
            content: `
Enhance this project description:

Project Name: ${data.name}
Bullets:
${Array.isArray(data.bullets) ? data.bullets.join("\n") : data.bullets}
`
          }
        ],

        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "AI Project Enhancer"
        }
      }
    );

    // Response is JSON string, parse it
    const parsed = JSON.parse(response.data.choices[0].message.content);

    // Return enhanced bullets array
    return parsed;

  } catch (error) {
    console.error("PROJECT ENHANCER ERROR:", error.response?.data || error.message);
    throw new Error("Project enhancement failed");
  }
}
