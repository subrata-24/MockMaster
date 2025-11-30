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

    //Async function always returns promise.So it must be resolved
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

export const getSessionById = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId).populate({
      path: "questions",
      options: { sort: { isPinned: -1, createdAt: 1 } },
    });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session is not found" });
    }

    return res.status(200).json({ success: true, session });
  } catch (error) {
    console.log("Error at finding session by id", error);
    return res
      .status(500)
      .json({ success: false, message: "Error at finding session by id" });
  }
};
