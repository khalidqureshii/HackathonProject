import express from "express";
import multer from "multer";
import { createPost, retrievePost } from "../controller/post-controller.js"; // Ensure the correct path

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Ensure 'uploads/' directory exists

// POST route to create a post
router.post("/create", upload.single("image"), createPost);

router.get("/dispPosts", retrievePost);
export default router;