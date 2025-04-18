import crypto from "crypto";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/createToken.js"
// @desc Sign up user
// @route POST /api/v1/auth/signup
// @access public
export const signUp = asyncHandler(async (req, res) => {
  // TODO: Implement signup logic CREATE USER,GENERATE TOKEN,SEND RESPONSE
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // send data (payload) and send secret token and other options like expiration time
  const token = generateToken(user._id);
  res.status(201).json({ status: "success", token, data: { user } });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access public
export const login = asyncHandler(async (req, res, next) => {
  // TODO: Implement login logic
  const user = await UserModel.findOne({ email: req.body.email }); //.select("+password");
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }
  const token = generateToken(user._id);
  res.status(200).json({ status: "success", token, data: { user } });
});

  // @desc Protect routes and routes for authenticated users(make sure user is logged in)
  // @access private
  export const protect = asyncHandler(async (req, res, next) => {
    // TODO: Implement protecting routes using JWT (JSON Web Tokens)
    // 1- get token and check if it exists
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new ApiError(
          "You are not authorized to access this route, please login to access this route",
          401
        )
      );
    }
    // 2- i want to verify that the token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //3-  check if user still exists
    const currentUser = await UserModel.findById(decoded.userId);
    if (!currentUser) {
      return next(new ApiError("User no longer exists", 401));
    }
    //4- check if user changed password after token was issued
    if (currentUser.passwordChangedAt) {
      const passChangeTime = parseInt(
        currentUser.passwordChangedAt.getTime() / 1000,
        10
      );
      if (passChangeTime > decoded.iat) {
        return next(
          new ApiError("User recently changed password! Please login again", 401)
        );
      }
    }
    req.user = currentUser;
    next();
  });

// @desc Grant access to specific roles
// @access private
export const allowedRoles = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          ` Role = ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  });

// @desc Forgot password
// @route POST /api/v1/auth/forgotPassword
// @access public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  //1- get user by email
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`No account with this email found ${req.body.email}`, 404)
    );
  }

  const randomCode = Math.floor(1000 + Math.random() * 900000).toString();
  const hashedCode = crypto
    .createHash("sha256")
    .update(randomCode)
    .digest("hex");
  user.passwordResetCode = hashedCode;
  user.passwordResetExpire = Date.now() + 10 * 60 * 1000; // 10 min (expiration time)
  user.passwordResetVerified = false;
  await user.save();
  //2- send email with this code
  const message = `Hi ${user.name},\n we received a request to reset password \n
   here is your password reset code (valid for 10 min) \n${randomCode}`;
  // try {
  await sendEmail({
    email: user.email,
    subject: "Password reset code",
    message,
  });
  // } catch (error) {
  //   user.passwordResetCode = undefined;
  //   user.passwordResetExpire = undefined;
  //   user.passwordResetVerified = undefined;
  //   await user.save();
  //   return next(new ApiError("Failed to send email", 500));
  // }
  res.status(200).json({
    status: "success",
    message: "We sent a password reset code to your email",
  });
});

// @desc Verify reset code
// @route POST /api/v1/auth/verifyResetCode
// @access public
export const verifyResetCode = asyncHandler(async (req, res, next) => {
  const hashedCode = crypto
    .createHash("sha256")
    .update(req.body.resetCode)
    .digest("hex");
  const user = await UserModel.findOne({
    passwordResetCode: hashedCode,
    passwordResetExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError("Invalid or expired reset code", 400));
  }
  user.passwordResetVerified = true;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Code verified successfully",
  });
});

// @desc Reset password
// @route POST /api/v1/auth/  
// @access private
export const resetPassword = asyncHandler(async (req, res, next) => {
  //1- get user by email
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`No account with this email found ${req.body.email}`, 404)
    );
  }
  if (!user.passwordResetVerified) {
    return next(new ApiError("Reset code is not verified", 400));
  }
  //2- update password
  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpire = undefined;
  user.passwordResetVerified = undefined;
  await user.save();

  //3- generate new token
  const token = generateToken(user._id);
  res.status(200).json({
    status: "success",
    token: token,
    message: "Password reset successfully",
  });

})