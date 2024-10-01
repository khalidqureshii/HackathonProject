import User from "../models/user-model.js";

const addEducation = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData._id;
    const newEducation = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          education: newEducation,
        },
      },
      { new: true }
    );

    return res.json({ education: user.education });
  } catch (error) {
    console.error("Error adding education:", error);
    return res.status(500).json({ error: "Error adding education" });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const userData = req.user;
    const indexToRemove = parseInt(req.params.index, 10);
    const userId = userData._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (indexToRemove < 0 || indexToRemove >= user.education.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    user.education.splice(indexToRemove, 1);

    await user.save();

    return res.json({ education: user.education });
  } catch (error) {
    console.error("Error deleting education:", error);
    return res.status(500).json({ error: "Error deleting education" });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const userData = req.user;
    const indexToRemove = parseInt(req.params.index, 10);
    const userId = userData._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (indexToRemove < 0 || indexToRemove >= user.experience.length) {
      return res.status(400).json({ error: "Invalid index" });
    }
    console.log("Before->", user.length);
    user.experience.splice(indexToRemove, 1);
    console.log("After ->", user.length);
    await user.save();

    return res.json({ experience: user.experience });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return res.status(500).json({ error: "Error deleting experience" });
  }
};

const addExperience = async (req, res) => {
  try {
    const userData = req.user;
    const id = userData._id;
    const newExperience = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          experience: newExperience,
        },
      },
      { new: true }
    );

    return res.json({ experience: user.experience });
  } catch (error) {
    console.error("Error adding experience:", error);
    return res.status(500).json({ error: "Error adding experience" });
  }
};

const fetchUserProfile = async (req, res) => {
  try {
    const userData = req.user;
    const user = await User.findById(userData._id).select(
      "username profileImageUrl education experience"
    );
    console.log(profileImageUrl);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // const profileImage = req.file ? req.file.path : null;
    return res.json({
      msg: {
        username: user.username,
        profileImageUrl: user.profileImageUrl,
        education: user.education,
        experience: user.experience,
      },
    });
  } catch (error) {
    console.log("Error fetching user profile:", error);
    return res.status(500).json({ error: "Error fetching user profile" });
  }
};

//updateProfileImage

const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user authentication in place

    // Check if the image file is available
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profileImageUrl = req.file.path; // The path where multer stored the image

    // Update the user profile with the new image URL
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImageUrl }, // Update the profileImageUrl field
      { new: true } // Return the updated user document
    );

    res.status(200).json({
      message: "Profile image updated successfully",
      profileImageUrl: updatedUser.profileImageUrl,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Error updating profile image", error });
  }
};

export {
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
  fetchUserProfile,
  updateProfileImage,
};
