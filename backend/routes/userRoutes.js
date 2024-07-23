import express from "express";
import {
  authUser,
  googleAuth,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerUser);

router.route("/login").post(authUser);

router.route("/google").get(googleAuth);

export default router;
