import Question from "../models/Question.js";
import Session from "../models/Session.js";

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
    return res.status(200).json({ success: true, session });
  } catch (error) {
    console.log("Find error to adding question", error);
    return res
      .status(500)
      .json({ success: false, message: "Find eror to add question" });
  }
};

export const togglePinQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(200).json({
      success: true,
      message: "Question pinned state updated successfully",
      question,
    });
  } catch (error) {
    console.log("Error while toggling pinned state", error);
    return res.status(500).json({
      success: false,
      message: "Server error while toggling pinned state",
    });
  }
};

export const addNote = async (req, res) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(404)
        .json({ success: false, message: "No question found" });
    }

    question.note = note;
    await question.save();
    return res
      .status(200)
      .json({ success: true, message: "Note added successfully", question });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while adding note" });
  }
};
