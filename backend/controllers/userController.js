import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import axios from "axios";
import oauth2Client from "../utils/oauth2Client.js";
import catchAsync from "../utils/catchAsync.js";

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email });

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

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.json(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const createSendToken = (user, statusCode, res) => {
  try {
    const token = generateToken(user.id);

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

    console.log("cookieOptions====", cookieOptions);

    res.cookie("jwt", token, cookieOptions);

    console.log(user);

    res.status(statusCode).json({
      message: "success",
      token,
      data: {
        user,
      },
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

    let user = await User.findOne({ email: userRes.data.email });

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

export { registerUser, authUser, googleAuth };
