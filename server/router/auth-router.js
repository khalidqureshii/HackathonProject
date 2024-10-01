import express from "express";
import * as authControllers from "../controller/auth-controller.js";
import signUpSchema from "../validators/auth-validator.js";
import validateSignUp from "../middlewares/validate-middleware.js";
import loginSchema from "../validators/login-validator.js";
import validateLogin from "../middlewares/login-middleware.js";
import authMiddleware from "../middlewares/auth-middleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.route("/login").post(authControllers.login);
router
  .route("/register")
  .post(upload.single("profileImage"), authControllers.register);
router.route("/");
router.route("/user").get(authMiddleware, authControllers.user);

export default router;

// router.route("/login").post(validateLogin(loginSchema),authControllers.login);
// router.route("/register").post(validateSignUp(signUpSchema),authControllers.register);
// router.route("/login").post(authControllers.login);
// router.route("/register").post(authControllers.register);
// router.route("/login").post(validateLogin(loginSchema),authControllers.login);
// router.route("/register").post(validateSignUp(signUpSchema),authControllers.register);
