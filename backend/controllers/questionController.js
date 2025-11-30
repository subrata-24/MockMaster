import Question from "../models/question.js";
import Session from "../models/session.js";

export const addQuestions = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input formate" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Not session found." });
    }

    //Create question
    const questionDocs = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    //Insert new question to the session
    session.questions.push(...questionDocs.map((q) => q._id));
    await session.save();
    return res.status(200).json({ success: true, questionDocs });
  } catch (error) {
    console.log("Find error to adding question", error);
    return res
      .status(500)
      .json({ success: false, message: "Find eror to add question" });
  }
};
