import Post from "../models/post-model.js";
export const createPost = async (req, res) => {
  try {
    const { postedBy, title, description, isDonation } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const newPost = new Post({
      postedBy,
      title,
      description,
      imageUrl,
      isDonation,
    });
    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const retrievePost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Images cannot be fetched!", error });
  }
};
