import User from "../models/user.js";

export const currentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found with this ID" });
    }

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      isEmailVerified: user.isEmailVerified,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving current user",
    });
  }
};
