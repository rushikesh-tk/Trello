import express from "express";
import {
  authUser,
  getUserData,
  googleAuth,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(registerUser);

router.route("/userdata").get(protect, getUserData);

router.route("/login").post(authUser);

router.route("/google").get(googleAuth);

export default router;
