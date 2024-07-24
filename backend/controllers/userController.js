import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import axios from "axios";
import oauth2Client from "../utils/oauth2Client.js";
import catchAsync from "../utils/catchAsync.js";
import sanitize from "mongo-sanitize";

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email: sanitize(email) });

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  console.log("normal signup user===", user);

  if (user) {
    res
      .status(201)
      .json({ message: "success", token: generateToken(user._id) });
  } else {
    res.json(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: sanitize(email) });

  console.log("normal login user===", user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "success",
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const createSendToken = (user, statusCode, res) => {
  try {
    const token = generateToken(user._id);

    var date = new Date(); // Now
    date.setDate(date.getDate() + 30);

    const cookieOptions = {
      expires: date,
      httpOnly: true,
      path: "/",
      // sameSite: "none",
      secure: false,
    };
    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
      cookieOptions.sameSite = "none";
    }

    user.password = undefined;

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
      message: "success",
      token,
    });
  } catch (error) {
    console.log("Token error=>", error);
  }
};

const googleAuth = catchAsync(async (req, res, next) => {
  try {
    const code = req.query.code;

    const googleRes = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    let user = await User.findOne({ email: sanitize(userRes.data.email) });

    if (!user) {
      console.log("New User found");
      user = await User.create({
        // googleId: sub,
        email: userRes.data.email,
        firstName: userRes.data.name,
        lastName: userRes.data.name,
        picture: userRes.data.picture,
      });
    }

    createSendToken(user, 201, res);
  } catch (error) {
    console.log("Error===", error);
  }
});

const getUserData = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user; // Assuming req.user is set by authentication middleware
    const data = await User.findOne({ _id: sanitize(_id) });

    let userInfo = {};

    if (data) {
      userInfo = {
        isAdmin: data?.isAdmin,
        firstName: data?.firstName,
        lastName: data?.lastName,
        picture: data?.picture,
      };
    }

    res.status(200).json({ userInfo, message: "success" });
  } catch (error) {
    console.log("user in error===");
    res.status(500).json({ message: `Server error : ${error}` });
  }
});

export { registerUser, authUser, googleAuth, getUserData };
