import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
// @desc Get list of category
// @route GET /api/v1/categories
// @access Public
export const getCategory = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;
  const skip = (page - 1) * limit;
  const total = await CategoryModel.countDocuments();

  const categories = await CategoryModel.find({})
    .select("name")
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    results: categories.length,
    page,
    total,
    totalPages: Math.ceil(total / limit),
    data: categories,
  });
});

// @desc Create category
// @route POST /api/v1/categories
// @access private
export const createCategory = asyncHandler(async (req, res) => {
  const{ name} = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
// @desc Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
export const getCategoryById = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const categoryGetById = await CategoryModel.findById(id);
  if (!categoryGetById) {
    return next(new ApiError(`no id for this category ${id}`,404))
  }
  res.status(200).json({ data: categoryGetById });
});

// @desc Update category by id
// @route PUT /api/v1/categories/:id
// @access private
export const updateCategoryById = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateById = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!updateById) {
    return next(new ApiError(`no id for this category ${id}`,404))
  }
  res.status(200).json({ data: updateById });
});

// @desc delete category by id
// @route DELETE /api/v1/categories/:id
// @access private
export const deleteCategoryById = asyncHandler(async (req, res,next) => {
  const { id } = req.params;
  const deleteById = await CategoryModel.findByIdAndDelete(id);
  if (!deleteById) {
    return next(new ApiError(`no id for this category ${id}`,404))
    // or use " throw new ApiError(`No category found for ID: ${id}`, 404);" >> instead of next
  }
  res.status(204).send();
});
