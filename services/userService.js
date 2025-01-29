import UserModel from "../models/userModel.js";
import * as factory from "./handlersFactory.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
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
