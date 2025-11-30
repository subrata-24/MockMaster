import Question from "../models/question";
import Session from "../models/session";

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
