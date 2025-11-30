import Question from "../models/question.js";
import Session from "../models/session.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.userId;
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });

        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    return res.status(200).json({ success: true, session });
  } catch (error) {
    console.error("Create session error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create session",
    });
  }
};

export const getMyAllSession = async (req, res) => {
  try {
    const userId = req.userId;
    const sessions = await Session.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("questions");
    return res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.log("Get error when want to get all session", error);
    return res.status(500).json({
      success: false,
      message: "Find error when user want to get all session",
    });
  }
};
