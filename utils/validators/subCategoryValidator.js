import { check, body } from "express-validator";
import validatorMiddleWare from "../../middleware/validatorMiddleWare.js";
import slugify from "slugify";
export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  validatorMiddleWare,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 2 })
    .withMessage("Too short subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subcategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("Category name required")
    .isMongoId()
    .withMessage("invalid category id"),
  validatorMiddleWare,
];

export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleWare
];

export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid subcategory id"),
  validatorMiddleWare,
];
