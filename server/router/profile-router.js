import express from "express";
import authMiddleware from "../middlewares/auth-middleware.js";
import {
  addEducation,
  addExperience,
  deleteEducation,
  deleteExperience,
} from "../controller/profile-controller.js";

const profileRouter = express.Router();

profileRouter.route("/education/add").post(authMiddleware, addEducation);
profileRouter.route("/experience/add").post(authMiddleware, addExperience);
profileRouter
  .route("/education/delete/:index")
  .delete(authMiddleware, deleteEducation);

profileRouter
  .route("/experience/delete/:index")
  .delete(authMiddleware, deleteExperience);

export default profileRouter;
