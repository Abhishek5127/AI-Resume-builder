export function safeJSONParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("JSON parse error:", err);
    return null;
  }
}
