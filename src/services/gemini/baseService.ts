
// Gemini API key and URL
const GEMINI_API_KEY = "AIzaSyBBqS5UBfid45GBEDTB99KR0BqcQZtFSHE";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface GeminiResponse {
  text: string;
  error?: string;
}

export async function queryGemini(prompt: string): Promise<GeminiResponse> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return { text: "", error: errorData.error?.message || "Failed to get response from Gemini" };
    }

    const data = await response.json();
    
    // Extract the text from the response
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return { text };
  } catch (error) {
    console.error("Error querying Gemini:", error);
    return { 
      text: "", 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}
