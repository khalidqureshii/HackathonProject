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

export { addEducation, addExperience, deleteEducation, deleteExperience };
