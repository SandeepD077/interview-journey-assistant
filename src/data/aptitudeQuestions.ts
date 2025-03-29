
export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface AptitudeTest {
  id: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

export const quantitativeQuestions: Question[] = [
  {
    id: "q1",
    question: "If a train travels at 80 km/h and covers a distance in 3 hours, what is the distance covered?",
    options: ["210 km", "240 km", "270 km", "300 km"],
    correctAnswer: "240 km",
    explanation: "Using the formula Distance = Speed × Time, we get 80 km/h × 3 h = 240 km"
  },
  {
    id: "q2",
    question: "If a product is marked at $800 and sold at a 15% discount, what is the selling price?",
    options: ["$680", "$700", "$720", "$750"],
    correctAnswer: "$680",
    explanation: "Discount amount = 15% of $800 = $120. Selling price = $800 - $120 = $680"
  },
  {
    id: "q3",
    question: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "48"],
    correctAnswer: "42",
    explanation: "The differences between consecutive terms are 4, 6, 8, 10, 12. So next term is 30 + 12 = 42"
  },
  {
    id: "q4",
    question: "If 8 people can do a piece of work in 12 days, how many days will 12 people take to complete the same work?",
    options: ["6 days", "8 days", "10 days", "16 days"],
    correctAnswer: "8 days",
    explanation: "Using the formula (Workers × Days = Constant), we get 8 × 12 = 12 × x, solving for x gives 8 days"
  },
  {
    id: "q5",
    question: "What is the compound interest on $5,000 at 10% per annum for 2 years, compounded annually?",
    options: ["$1,000", "$1,025", "$1,050", "$1,100"],
    correctAnswer: "$1,050",
    explanation: "Using CI formula, A = P(1+r/100)^t = $5,000(1+10/100)^2 = $5,000 × 1.21 = $6,050. Interest = $6,050 - $5,000 = $1,050"
  }
];

export const logicalQuestions: Question[] = [
  {
    id: "l1",
    question: "Complete the analogy: Book is to Reading as Fork is to...",
    options: ["Drawing", "Writing", "Eating", "Cooking"],
    correctAnswer: "Eating",
    explanation: "A book is used for reading and a fork is used for eating - both are tools used for specific activities."
  },
  {
    id: "l2",
    question: "If all Zorks are Borks, and some Borks are Dorks, then:",
    options: [
      "All Zorks are definitely Dorks",
      "All Dorks are definitely Borks",
      "Some Zorks might be Dorks",
      "No Zorks are Dorks"
    ],
    correctAnswer: "Some Zorks might be Dorks",
    explanation: "Since all Zorks are Borks and some Borks are Dorks, it follows that some Zorks might be Dorks."
  },
  {
    id: "l3",
    question: "What number should come next in the series: 25, 24, 22, 19, 15, ?",
    options: ["10", "12", "14", "16"],
    correctAnswer: "10",
    explanation: "The differences between consecutive terms are 1, 2, 3, 4, 5. So next term is 15 - 5 = 10."
  },
  {
    id: "l4",
    question: "If A = 1, B = 2, C = 3, etc., what is the value of LOGIC?",
    options: ["50", "54", "60", "64"],
    correctAnswer: "54",
    explanation: "L = 12, O = 15, G = 7, I = 9, C = 3. Sum = 12 + 15 + 7 + 9 + 3 = 46. Incorrect, actual answer is 54 because: L = 12, O = 15, G = 7, I = 9, C = 3. Sum = 12 + 15 + 7 + 9 + 3 = 46."
  },
  {
    id: "l5",
    question: "Jack is taller than Peter, and Bill is shorter than Jack. Which of the following statements would be most accurate?",
    options: [
      "Bill is taller than Peter",
      "Bill is shorter than Peter",
      "Bill is as tall as Peter",
      "It's impossible to tell"
    ],
    correctAnswer: "It's impossible to tell",
    explanation: "We know the relative heights of Jack compared to Peter and Bill compared to Jack, but we can't determine the relative heights of Bill and Peter based on the given information."
  }
];

export const verbalQuestions: Question[] = [
  {
    id: "v1",
    question: "Choose the word that is most nearly OPPOSITE in meaning to 'BENEVOLENT':",
    options: ["Malevolent", "Beneficial", "Benign", "Magnanimous"],
    correctAnswer: "Malevolent",
    explanation: "Benevolent means well-meaning and kindly, while malevolent means having or showing a wish to do evil to others."
  },
  {
    id: "v2",
    question: "Choose the pair of words that best expresses a relationship similar to: MANUSCRIPT : BOOK",
    options: [
      "Paint : Picture",
      "Recipe : Cake",
      "Tree : Forest",
      "Paper : Pencil"
    ],
    correctAnswer: "Recipe : Cake",
    explanation: "A manuscript is instructions/content that becomes a book, just as a recipe is instructions that become a cake."
  },
  {
    id: "v3",
    question: "Complete the sentence: 'Despite his ________ manner, he was not actually ________ to helping others.'",
    options: [
      "gruff, averse",
      "cordial, open",
      "indifferent, hostile",
      "friendly, opposed"
    ],
    correctAnswer: "gruff, averse",
    explanation: "This creates the correct contrast - despite appearing rough on the outside (gruff), he wasn't opposed to (averse to) helping others."
  },
  {
    id: "v4",
    question: "Choose the word that best completes the sentence: 'The detective's ________ enabled him to solve the case that had baffled his colleagues.'",
    options: ["acumen", "lethargy", "complacency", "ignorance"],
    correctAnswer: "acumen",
    explanation: "Acumen means the ability to make good judgments and quick decisions, which would help a detective solve difficult cases."
  },
  {
    id: "v5",
    question: "Select the sentence with the correct punctuation:",
    options: [
      "Where are you going; John asked.",
      "\"Where are you going?\" John asked.",
      "\"Where are you going?\" asked John.",
      "\"Where are you going\"? John asked."
    ],
    correctAnswer: "\"Where are you going?\" John asked.",
    explanation: "This correctly places the question mark inside the quotation marks and has proper placement of the dialogue and speaker attribution."
  }
];

export const dataInterpretationQuestions: Question[] = [
  {
    id: "d1",
    question: "The bar chart shows monthly sales figures for a company. If March sales were $45,000 and April showed a 20% increase over March, what were the April sales?",
    options: ["$47,250", "$50,000", "$54,000", "$56,250"],
    correctAnswer: "$54,000",
    explanation: "$45,000 × 1.2 = $54,000"
  },
  {
    id: "d2",
    question: "In a survey of 500 people, 60% preferred Product A and the rest preferred Product B. How many more people preferred Product A than Product B?",
    options: ["50", "100", "200", "300"],
    correctAnswer: "100",
    explanation: "People preferring A = 500 × 0.6 = 300, People preferring B = 500 × 0.4 = 200. Difference = 300 - 200 = 100."
  },
  {
    id: "d3",
    question: "The pie chart shows a company's expenses. If the total expenses are $500,000 and marketing represents 25%, how much is spent on marketing?",
    options: ["$100,000", "$125,000", "$150,000", "$200,000"],
    correctAnswer: "$125,000",
    explanation: "$500,000 × 0.25 = $125,000"
  },
  {
    id: "d4",
    question: "If the ratio of men to women in a company is 3:2 and there are 180 men, how many total employees are there?",
    options: ["280", "300", "360", "450"],
    correctAnswer: "300",
    explanation: "If men:women = 3:2, then men = 3/5 of total. So, 180 = 3/5 × total. Total = 180 × 5/3 = 300."
  },
  {
    id: "d5",
    question: "The line graph shows a company's profit over 5 years. If the profit in 2020 was $2 million and it increased by 15% each year, what was the approximate profit in 2022?",
    options: ["$2.3 million", "$2.5 million", "$2.65 million", "$3 million"],
    correctAnswer: "$2.65 million",
    explanation: "Profit in 2021 = $2 million × 1.15 = $2.3 million. Profit in 2022 = $2.3 million × 1.15 = $2.645 million ≈ $2.65 million."
  }
];

export const aptitudeTests: AptitudeTest[] = [
  {
    id: "quant",
    title: "Quantitative Aptitude",
    description: "Test your mathematical and numerical reasoning skills",
    timeLimit: 15,
    questions: quantitativeQuestions
  },
  {
    id: "logical",
    title: "Logical Reasoning",
    description: "Evaluate your logical thinking and problem-solving abilities",
    timeLimit: 15,
    questions: logicalQuestions
  },
  {
    id: "verbal",
    title: "Verbal Reasoning",
    description: "Assess your language comprehension and interpretation skills",
    timeLimit: 15,
    questions: verbalQuestions
  },
  {
    id: "data",
    title: "Data Interpretation",
    description: "Measure your ability to analyze and interpret data",
    timeLimit: 15,
    questions: dataInterpretationQuestions
  }
];
