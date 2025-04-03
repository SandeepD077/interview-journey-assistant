// Gemini API key
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

export async function analyzeResume(resumeText: string): Promise<{
  score: number;
  suggestions: string[];
  analysis: string;
}> {
  const prompt = `
    You are an expert ATS (Applicant Tracking System) and resume reviewer.
    
    Analyze the following resume and provide:
    1. An ATS compatibility score from 0-100
    2. 3-5 specific suggestions for improvement
    3. A brief analysis of the resume's strengths and weaknesses
    
    Format your response in JSON with these exact keys: "score", "suggestions" (an array of strings), and "analysis" (a string).
    
    Resume:
    ${resumeText}
  `;

  try {
    const response = await queryGemini(prompt);
    
    if (response.error) {
      throw new Error(response.error);
    }

    // Try to parse the JSON response
    try {
      // Extract JSON from the response text
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }
      
      const jsonResult = JSON.parse(jsonMatch[0]);
      return {
        score: parseInt(jsonResult.score, 10) || 0,
        suggestions: Array.isArray(jsonResult.suggestions) ? jsonResult.suggestions : [],
        analysis: jsonResult.analysis || ""
      };
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError, response.text);
      // Fallback response
      return {
        score: 70,
        suggestions: ["Could not generate specific suggestions. Please try again."],
        analysis: "Error analyzing resume. The AI response couldn't be properly parsed."
      };
    }
  } catch (error) {
    console.error("Resume analysis error:", error);
    return {
      score: 0,
      suggestions: ["An error occurred during analysis. Please try again later."],
      analysis: "Failed to analyze resume due to an error."
    };
  }
}

export async function generateInterviewQuestions(jobTitle: string, experience: string): Promise<string[]> {
  const prompt = `
    Generate 5 realistic interview questions for a ${jobTitle} position with ${experience} years of experience.
    
    For each question, provide:
    1. The question itself
    2. What the interviewer is looking for in the answer
    
    Format each question as:
    "Question: [The question]
    Looking for: [What interviewer expects]"
    
    Return exactly 5 questions.
  `;
  
  try {
    const response = await queryGemini(prompt);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    // Parse the questions from the response
    const questions = response.text
      .split(/Question:/)
      .filter(q => q.trim().length > 0)
      .map(q => `Question:${q.trim()}`)
      .slice(0, 5);
    
    return questions.length > 0 ? questions : [
      "Question: Tell me about your experience with similar roles.\nLooking for: Relevant experience and how it applies to this position.",
      "Question: How do you handle challenging situations at work?\nLooking for: Problem-solving abilities and resilience.",
      "Question: What are your strengths and weaknesses?\nLooking for: Self-awareness and growth mindset.",
      "Question: Why do you want to work at our company?\nLooking for: Research about the company and alignment with values.",
      "Question: Where do you see yourself in five years?\nLooking for: Career ambitions and commitment."
    ];
  } catch (error) {
    console.error("Error generating interview questions:", error);
    return [
      "Failed to generate interview questions. Please try again."
    ];
  }
}

export async function evaluateInterviewAnswer(question: string, answer: string): Promise<{
  score: number;
  feedback: string;
  improvementTips: string;
}> {
  const prompt = `
    You are an expert interview coach. Evaluate the following interview answer for this question:
    
    Question: ${question}
    
    Answer: ${answer}
    
    Provide:
    1. A score from 0-10
    2. Brief but specific feedback (2-3 sentences)
    3. One tip for improvement
    
    Format your response in JSON with these keys: "score", "feedback", and "improvementTips".
  `;
  
  try {
    const response = await queryGemini(prompt);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    // Try to parse the JSON response
    try {
      const jsonMatch = response.text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }
      
      const jsonResult = JSON.parse(jsonMatch[0]);
      return {
        score: parseInt(jsonResult.score, 10) || 5,
        feedback: jsonResult.feedback || "No specific feedback provided.",
        improvementTips: jsonResult.improvementTips || "Try to be more specific in your answer."
      };
    } catch (parseError) {
      console.error("Failed to parse evaluation response:", parseError);
      return {
        score: 5,
        feedback: "The response could not be properly evaluated. Please try again.",
        improvementTips: "Ensure your answer is clear and addresses the question directly."
      };
    }
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return {
      score: 0,
      feedback: "Failed to evaluate your answer due to a technical issue.",
      improvementTips: "Please try again later."
    };
  }
}

export async function explainAptitudeAnswer(question: string, correctAnswer: string): Promise<string> {
  const prompt = `
    Explain the following aptitude test question and its correct answer:
    
    Question: ${question}
    Correct Answer: ${correctAnswer}
    
    Please provide:
    1. A clear step-by-step explanation of how to arrive at the answer
    2. Any formulas or concepts needed to understand the question
    3. A brief explanation of why other answers would be incorrect (if applicable)
    
    Make your explanation educational and easy to understand.
  `;
  
  try {
    const response = await queryGemini(prompt);
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return response.text;
  } catch (error) {
    console.error("Error explaining aptitude answer:", error);
    return "Sorry, I couldn't generate an explanation for this question. Please try again later.";
  }
}
