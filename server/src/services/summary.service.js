import axios from "axios";

export async function summaryEnhancerAI(data) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "kwaipilot/kat-coder-pro:free",

        messages: [
          {
            role: "system",
            content: `
You are a professional resume summary writer.

Return ONLY the following JSON:

{
  "summary": "string"
}

RULES:
- Max length: 440 CHARACTERS (NOT words)
- Use clean corporate language
- No exaggeration
- No buzzword spam
- 1 paragraph only
- Strong verbs, real experience tone
            `
          },
          {
            role: "user",
            content: `
Generate a resume summary based on:

Role: ${data.role}
User Summary: ${data.summary}
`
          }
        ],

        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "AI Summary Enhancer"
        }
      }
    );

    // content will be a JSON string, so parse it
    const parsed = JSON.parse(response.data.choices[0].message.content);

    return parsed;

  } catch (error) {
    console.error("ENHANCER ERROR:", error.response?.data || error.message);
    throw new Error("Summary enhancement failed");
  }
}
