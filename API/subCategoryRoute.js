import {
  createSubCategory,
  getSubCategory,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoryById,
} from "../services/subCategoryService.js";
import express from "express";
import {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";

// mergeParams middleware to make sure subcategory id is included in the request
// ex we need to access category id from the category route
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategoryById)
  .put(updateSubCategoryValidator, updateSubCategoryById)
  .delete(deleteSubCategoryValidator, deleteSubCategoryById);

export default router;
