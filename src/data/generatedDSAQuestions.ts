
import { DSAQuestion } from './dsaQuestions';

// These are placeholder generated questions
// In a production environment, you would run the generateDSAQuestions script
// to create a more complete set of questions from LeetCode
export const generatedDSAQuestions: DSAQuestion[] = [
  {
    id: "two-sum-leetcode",
    title: "Two Sum (LeetCode)",
    difficulty: "Easy",
    category: "Arrays & Hashing",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Visit LeetCode for the full description: https://leetcode.com/problems/two-sum/",
    examples: [
      {
        input: "See LeetCode for examples",
        output: "See LeetCode for examples"
      }
    ],
    constraints: ["See LeetCode for constraints"],
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Write your code here\n};`,
      python: `def two_sum(nums, target):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n    }\n}`
    }
  },
  {
    id: "valid-parentheses-leetcode",
    title: "Valid Parentheses (LeetCode)",
    difficulty: "Easy",
    category: "Stack",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Visit LeetCode for the full description: https://leetcode.com/problems/valid-parentheses/",
    examples: [
      {
        input: "See LeetCode for examples",
        output: "See LeetCode for examples"
      }
    ],
    constraints: ["See LeetCode for constraints"],
    starterCode: {
      javascript: `function isValid(s) {\n  // Write your code here\n};`,
      python: `def is_valid(s):\n    # Write your code here\n    pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n    }\n}`
    }
  }
];

// Helper function to get random questions from the generated questions
export function getRandomGeneratedQuestions(difficulty?: "Easy" | "Medium" | "Hard", count = 5): DSAQuestion[] {
  let filteredQuestions = generatedDSAQuestions;
  
  if (difficulty) {
    filteredQuestions = generatedDSAQuestions.filter(q => q.difficulty === difficulty);
  }
  
  const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
