export const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) =>
  `
You are an AI assistant acting as a technical interview coach. 

## Task
Generate exactly ${numberOfQuestions} technical interview questions for the following role and context:
- Role: ${role}
- Experience Level: ${experience}
- Focus Topics: ${topicsToFocus}

For each question:
- Provide a clear and beginner-friendly answer.
- If the answer requires a code example, include a concise code snippet.
- Make sure the answer is not too advanced for a beginner.

## Format
Return ONLY a pure, valid JSON array with this structure (do not add any extra text, formatting, or explanation):

[
  {
    "question": "Question goes here",
    "answer": "Beginner-friendly answer here (include code if relevant)"
  }
  // Repeat for each question and answer
]
Do not include comments or any text outside the JSON array.
`;

export const conceptExplainPrompt = (question) => `
You are an AI assistant trained to explain technical interview concepts.

## Task
Explain the following interview question and its underlying concept in depth, as if you are teaching a beginner developer.

Question: ${question}

For the explanation:
- Break down the concept step-by-step.
- Use simple, clear language suitable for beginners.
- If relevant, include a small code example inside the explanation.
- After the explanation, generate a short, clear title that summarizes the concept (suitable for an article or page header).

## Format
Return ONLY a valid JSON object with this exact structure (do not add any extra text, formatting, or explanation):

{
  "title": "Short title summarizing the concept",
  "explanation": "Detailed beginner-friendly explanation here (include code if relevant)"
}

Do not include comments or any text outside the JSON object.
`;
