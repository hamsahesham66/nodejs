import UserModel from "../models/userModel.js";
import * as factory from "./handlersFactory.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import{generateToken} from "../utils/createToken.js";

// for admin only

// @desc Get all users
// @route GET /api/v1/users
// @access private
export const getUsers = factory.getAll(UserModel);

// @desc Create user
// @route POST /api/v1/users
// @access private
export const createUser = factory.createOne(UserModel);

// @desc Get user by id
// @route GET /api/v1/users/:id
// @access private

export const getUserById = factory.getOne(UserModel);

// @desc Update user by id
// @route PUT /api/v1/users/:id
// @access private

export const updateUserById = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    // update user except password
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
       phone: req.body.phone,
      profileImg: req.body.profileImg,
      role: req.body.role,
    },

    { new: true }
  );
  if (!document) {
    return next(new ApiError(`no document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc Change user password
// @route PUT /api/v1/users/changePassword/:id
export const changeUserPassword =  asyncHandler(async (req, res, next) => {
    const document = await UserModel.findByIdAndUpdate(
      req.params.id,
      // update user for password only
      {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      },

      { new: true }
    );
    if (!document) {
      return next(new ApiError(`no document for this id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });
    

// @desc Delete user by id
// @route DELETE /api/v1/users/:id
// @access private

export const deleteUserById = factory.deleteOne(UserModel);

// @desc Get current user
// @route GET /api/v1/users/getMe
// @access private

export const getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc update logged user password
// @route PUT /api/v1/users/updateMyPassword
// @access private/protect

export const updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    // update user for password only
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },

    { new: true }
  );
  const token= generateToken(user._id);
  if (!user) {
    return next(new ApiError(`no document for this id ${req.user._id}`, 404));
  }
  res.status(200).json({ data: user, token });
})

// @desc update logged user data except password and role
// @route PUT /api/v1/users/updateMe
// @access private/protect

export const updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    // update user except password
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },

    { new: true }
  );
  if (!updatedUser) {
    return next(new ApiError(`no document for this id ${req.user._id}`, 404));
  }
  res.status(200).json({ data: updatedUser });
})
// @desc deactivated logged user
// @route DELETE /api/v1/users/deleteMe
// @access private/protect

export const deleteLoggedUser = asyncHandler(async (req, res, next) => {
  const userDelete=await UserModel.findByIdAndUpdate(req.user._id,{active:false});
  if(!userDelete){
    return next(new ApiError(`No user found with ID:  ${req.user._id}`, 404));
  }
  res.status(204).json({ status:"Success",message: "User deleted successfully" });
});

