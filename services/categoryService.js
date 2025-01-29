import CategoryModel from "../models/categoryModel.js";
import * as factory from "./handlersFactory.js";

// @desc Get list of category
// @route GET /api/v1/categories
// @access Public
export const getCategory = factory.getAll(CategoryModel);
// export const getCategory = asyncHandler(async (req, res) => {
//     //build query 
//   const totalDocuments = await CategoryModel.countDocuments();
//   const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
//   .filter()
//   .sort()
//   .selectFields()
//   .search()
//   .paginate(totalDocuments);

// const {mongooseQuery , paginationResult} = apiFeatures;
// const categories = await mongooseQuery;
//   res.status(200).json({
//     results: categories.length,
//     paginationResult,
//     data: categories,
//   });
// });

// @desc Create category
// @route POST /api/v1/categories
// @access private
export const createCategory = factory.createOne(CategoryModel);
// export const createCategory = asyncHandler(async (req, res) => {
//   const{ name} = req.body;
//   const category = await CategoryModel.create({ name, slug: slugify(name) });
//   res.status(201).json({ data: category });
// });

// @desc Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
export const getCategoryById = factory.getOne(CategoryModel);
// export const getCategoryById = asyncHandler(async (req, res,next) => {
//   const { id } = req.params;
//   const categoryGetById = await CategoryModel.findById(id);
//   if (!categoryGetById) {
//     return next(new ApiError(`no id for this category ${id}`,404))
//   }
//   res.status(200).json({ data: categoryGetById });
// });

// @desc Update category by id
// @route PUT /api/v1/categories/:id
// @access private
export const updateCategoryById = factory.updateOne(CategoryModel);
// export const updateCategoryById = asyncHandler(async (req, res,next) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const updateById = await CategoryModel.findOneAndUpdate(
//     { _id: id },
//     { name, slug: slugify(name) },
//     { new: true }
//   );
//   if (!updateById) {
//     return next(new ApiError(`no id for this category ${id}`,404))
//   }
//   res.status(200).json({ data: updateById });
// });

// @desc delete category by id
// @route DELETE /api/v1/categories/:id
// @access private
export const deleteCategoryById = factory.deleteOne(CategoryModel);
// export const deleteCategoryById = asyncHandler(async (req, res,next) => {
//   const { id } = req.params;
//   const deleteById = await CategoryModel.findByIdAndDelete(id);
//   if (!deleteById) {
//     return next(new ApiError(`no id for this category ${id}`,404))
//     // or use " throw new ApiError(`No category found for ID: ${id}`, 404);" >> instead of next
//   }
//   res.status(204).send();
// });
