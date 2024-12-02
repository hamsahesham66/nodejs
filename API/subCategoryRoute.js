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
const router = express.Router();

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
