import {
  createSubCategory,
  getSubCategory,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoryById,
  setCategoryIdToBody,
  createFilterObject,
} from "../services/subCategoryService.js";
import express from "express";
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";
import * as authService from "../services/authUserService.js";
// mergeParams middleware to make sure subcategory id is included in the request
// ex we need to access category id from the category route
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authService.protect,authService.allowedRoles('admin','manager'),setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
  .get(createFilterObject,getSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(authService.protect,authService.allowedRoles('admin','manager'),updateSubCategoryValidator, updateSubCategoryById)
  .delete(authService.protect,authService.allowedRoles('admin','manager'),deleteSubCategoryValidator, deleteSubCategoryById);

export default router;
