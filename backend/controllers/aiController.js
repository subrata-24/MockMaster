import { GoogleGenAI } from "@google/genai";
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompt.js";

// Initialize Google Gemini AI client with API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateInterviewsQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res
        .status(400)
        .json({ success: false, message: "Missing field is required" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    // Call Gemini API to generate content based on the prompt
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Extract raw text from AI response
    let rawText = response.text;

    // Clean the response by removing markdown code block syntax
    // Gemini often wraps JSON responses in `````` blocks
    const cleanText = rawText
      .replace(/^```json\s*/, "") //remove starting ```json
      .replace(/```$/, "") // remove ending ```
      .trim(); // remove extra space

    //Now convert this at JSON formate
    const data = JSON.parse(cleanText);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("Find error while creating question and answer", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

export const questionExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Must provide a question" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawText = response.text;

    const cleanText = rawText
      .replace(/^```json\s*/, "") //remove starting ```json
      .replace(/```$/, "") // remove ending ```
      .trim(); // remove extra space

    const data = JSON.parse(cleanText);
    return res.status(200).json({
      success: true,
      message: "Expalantion generate successfully",
      data,
    });
  } catch (error) {
    console.log("Find error when creating explanation of answer", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};
