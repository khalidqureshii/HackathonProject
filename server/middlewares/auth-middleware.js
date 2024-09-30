import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token Not Provided" });
  }

  try {
    const jwtToken = token.split(" ")[1].trim();

    const isVerified = jwt.verify(jwtToken, process.env.JWT_GENERATING_STRING);
    const currUser = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    req.user = currUser;
    req.token = currUser.token;
    req.userID = currUser._id;
    next();
  } catch (err) {
    const status = 401;
    const message = err;
    const extraDetails = "";
    const errorDetails = {
      message,
      status,
      extraDetails,
    };
    next(errorDetails);
  }
};

export default authMiddleware;
