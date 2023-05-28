import sanitize from "mongo-sanitize";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import {
  validateUsername,
  validateEmail,
  validatePassword,
} from "../utils/validation.js";
import User from "../models/user.model.js";
import { createError } from "../config/createError.js";
import bcrypt from "bcryptjs";

import asyncHandler from "express-async-handler";

import { isValidPhoneNumber } from "../services/phone.js";
import APPError from "../utils/Error.js";
import sendOTP from "../services/otp.js";
import { generateRandom4DigitNumber } from "../services/generator.js";
import getPhoneCode from "../services/getPhoneCode.js";
import tryCatch from "../utils/tryCatch.js";
import { HttpResponse } from "../utils/HttpResponse.js";
import Cart from "../models/cart.model.js";

export const authRegister = async (req, res, next) => {
  try {
    const email = sanitize(req.body.email);
    const username = sanitize(req.body.username);
    const password = sanitize(req.body.password);
    const address = sanitize(req.body.address);
    const phone = sanitize(req.body.phone);
    const name = sanitize(req.body.name);

    console.log(req.location);

    if (!email || !username || !password || !address || !phone)
      return res.status(400).json({ msg: "Please enter all fields! " });

    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      throw new APPError(
        "Email or username already taken please chooose another !",
        403
      );
    }
    if (username.length <= 6 || username.length > 15)
      return res.status(400).json({
        message: "Username's character must be between 6 and 15 !",
      });
    if (!validateUsername(username))
      return res.status(400).json({
        message:
          "Username should be alphanumeric and not contain special characters !",
      });
    if (!validateEmail(email))
      return res
        .status(400)
        .json({ message: "Email address should be valid!" });
    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain one uppercase, symbol, number, and atleast 8 characters !",
      });
    }

    if (!isValidPhoneNumber(phone, req.location.country)) {
      throw new APPError("Phone number is invalid !", 400);
    }

    sendOTP(
      `${getPhoneCode(req.location.country)}${phone}`,
      generateRandom4DigitNumber(),
      { username }
    );

    const user = new User({
      username,
      email,
      address,
      password,
      phone,
      ...(name && name),
    });

    Promise.all([await user.save(), await Cart.create({ user: user._id })])
      .then((msg) => {
        return res.send(
          new HttpResponse("User registered successfully, Login now !", 200)
        );
      })
      .catch((err) => {
        console.log(err);
        throw new APPError("Failed to Activate user, Try again !", 500);
      });
  } catch (err) {
    next(err);
  }
};

export const userDetails = tryCatch(async (req, res, next) => {
  if (!req.user) return res.status(400).send({ msg: "User unauthorized" });

  const { _doc } = await User.findById(req.user);

  return res.send({ ..._doc, role: req.role });
});

export const verifyLogin = tryCatch(async (req, res, next) => {
  const { emailorusername, password } = req.body;

  if (!emailorusername)
    return next(createError("Please enter your Email or Username.", 400));

  if (!password) return next(createError("Please submit your Password.", 400));

  const user = await User.findOne({
    $or: [{ email: emailorusername }, { username: emailorusername }],
  }).select("+password");

  if (!user) throw new APPError("User doesn't exists!", 404);

  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ id: user._id }, process.env.SECRETTOKEN);
    // const accesstoken = `Bearer ${token}`;

    res.cookie("accesstoken", token);

    return res.send(new HttpResponse("User Logged in", 200, { token }));
  } else {
    res.clearCookie("accesstoken");
    throw new APPError("Invalid credentials!", 403);
  }
});

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("accesstoken");
    return res.status(200).send({ msg: "Logged out successfully !" });
  } catch (error) {
    next(error);
  }
};

export const checkLogin = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const user = await User.findById(req.user).select("+role");
    // return res.status(200).send({ user, status: true, msg: "User is logged" });
    return res.send(new HttpResponse("User", 200, user));
  }

  throw new APPError("User not logged in !", 400);
});
