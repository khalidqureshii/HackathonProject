import express from "express";
import * as filterControllers from "../controller/filter-controller.js";
const router = express.Router();

router.route("/getAllProfiles").get(filterControllers.getAllProfiles);
router.route("/getProfiles").post(filterControllers.getProfiles);
router.route("/getUserProfile").post(filterControllers.getUserProfile);
router.route("/updateIncoming").put(filterControllers.updateIncoming);

export default router;
