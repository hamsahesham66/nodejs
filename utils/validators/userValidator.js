import { check, body } from "express-validator";
import validatorMiddleWare from "../../middleware/validatorMiddleWare.js";
import slugify from "slugify";
import UserModel from "../../models/userModel.js";
import bcrypt from "bcryptjs";

export const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name required")
    .isLength({ min: 3 })
    .withMessage("Too short user name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email already in use"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("Too short password")
    .custom((pass, { req }) => {
      if (pass !== req.body.confirmPassword) {
        throw new Error("password confirmation do not match");
      }
      return true;
    }),
  check("confirmPassword").notEmpty().withMessage("confirm password required"),
  // phone number validation by country for Egypt and Saudi Arabia
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage(
      "Invalid phone number format only accepted for Egypt and Saudi Arabia"
    ),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleWare,
];

export const getUserValidator = [
  check("id").isMongoId().withMessage("invalid user id format"),
  validatorMiddleWare,
];
export const updateUserValidator = [
  check("id").isMongoId().withMessage("invalid user id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("email")
  .notEmpty()
  .withMessage("email required")
  .isEmail()
  .withMessage("Invalid email format")
  .custom((val) =>
    UserModel.findOne({ email: val }).then((user) => {
      if (user) {
        return Promise.reject(new Error("Email already in use"));
      }
    })),
    check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage(
      "Invalid phone number format only accepted for Egypt and Saudi Arabia"
    ),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleWare,
];

export const changePasswordValidator = [
  check("id").isMongoId().withMessage("invalid user id format"),
  body("currentPassword")
    .notEmpty()
    .withMessage("current password is required"),
  body("confirmPassword").notEmpty().withMessage("confirmPassword is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters")
    .custom(async (val, { req }) => {
      // verify current password
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new Error(`there is no user for this id ${req.params.id}`);
      }
      const isMatchPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isMatchPassword) {
        throw new Error("Current password is incorrect");
      }

      if (val !== req.body.confirmPassword) {
        throw new Error("password confirmation do not match");
      }
      return true;
    }),
  validatorMiddleWare,
];
export const deleteUserValidator = [
  check("id").isMongoId().withMessage("invalid User id format"),
  validatorMiddleWare,
];


export const updateLoggedUserValidator = [
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("email")
  .notEmpty()
  .withMessage("email required")
  .isEmail()
  .withMessage("Invalid email format")
  .custom((val) =>
    UserModel.findOne({ email: val }).then((user) => {
      if (user) {
        return Promise.reject(new Error("Email already in use"));
      }
    })),
    check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage(
      "Invalid phone number format only accepted for Egypt and Saudi Arabia"
    ),
  validatorMiddleWare,
];
