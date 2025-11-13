import axios from "axios";

export async function generateResumeFromAI(userData) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "kwaipilot/kat-coder-pro:free",   // KatCoder Pro V1 (FREE)

        messages: [
          {
            role: "system",
            content: `
You are an expert resume generator AI designed to return STRICT JSON only. 
Do NOT include explanations, markdown, or any extra text.

Your job:
- Rewrite user details into a *professional resume*
- Improve language and grammar
- Create bullet points that look strong and quantified
- Fill missing information logically but realistically

Your JSON MUST follow this exact schema:

{
  "summary": "string",
  "skills": ["string"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "date": "string",
      "bullets": ["string"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "bullets": ["string"]
    }
  ],
  "education": [
    {
      "degree": "string",
      "college": "string",
      "year": "string"
    }
  ]
}

Always return valid JSON only.
            `
          },
          {
            role: "user",
            content: `Generate a professional resume JSON using the following data: ${JSON.stringify(
              userData
            )}`
          }
        ],

        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "AI Resume Builder"
        }
      }
    );

    // Return the JSON output from AI
    return response.data.choices[0].message.content;

  } catch (error) {

    console.error("AI SERVICE ERROR:");
    console.error("message:", error.message);
    console.error("code:", error.code);
    console.error("response DATA:", error.response?.data);
    console.error("response STATUS:", error.response?.status);

    throw new Error("AI generation failed");
  }
}
