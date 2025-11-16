import uploadOnCloudinary from "../utils/cloudinary";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let imageUrl;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
  } catch (error) {}
};
