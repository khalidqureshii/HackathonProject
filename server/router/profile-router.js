import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import {
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
  fetchUserProfile,
  updateProfileImage,
} from "../controller/profile-controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const profileRouter = express.Router();

profileRouter.route("/education/add").post(authMiddleware, addEducation);
profileRouter.route("/experience/add").post(authMiddleware, addExperience);
profileRouter
  .route("/education/delete/:index")
  .delete(authMiddleware, deleteEducation);

profileRouter
  .route("/experience/delete/:index")
  .delete(authMiddleware, deleteExperience);

profileRouter.post(
  "/uploadProfileImage",
  upload.single("profileImage"),
  updateProfileImage
);

profileRouter.route("/user").get(authMiddleware, fetchUserProfile);
export default profileRouter;
