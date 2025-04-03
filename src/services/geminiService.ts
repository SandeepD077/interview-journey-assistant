
// This file is now a barrel file that re-exports all Gemini services
// for backward compatibility
export {
  queryGemini,
  type GeminiResponse,
  analyzeResume,
  generateInterviewQuestions,
  evaluateInterviewAnswer,
  explainAptitudeAnswer
} from './gemini';
