import subCategoryModel from "../models/subCategoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import * as factory from "./handlersFactory.js";


export const setCategoryIdToBody = (req, res, next) => {
    //nested routes
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
}
export const createFilterObject = (req,res,next) => {
  // if you want to filter by category id
let filterObject = {};
if (req.params.categoryId) filterObject = { category: req.params.categoryId };
req.filterObject = filterObject;
next();
}
// @desc Create Subcategory
// @route POST /api/v1/subcategories
// @access private
export const createSubCategory = factory.createOne(subCategoryModel);
// export const createSubCategory = asyncHandler(async (req, res) => {
//     const{ name,category} = req.body;
//     const subCategory = await subCategoryModel.create({ name,
//          slug: slugify(name),
//          category,
//     });
//     res.status(201).json({ data: subCategory });
//   });



// @desc Get list of subcategory
// @route GET /api/v1/subcategories
// @access private
export const getSubCategory = factory.getAll(subCategoryModel);
// export const getSubCategory = asyncHandler(async (req, res) => {
//   const totalDocuments = await subCategoryModel.countDocuments();
//   const apiFeatures = new ApiFeatures(subCategoryModel.find(), req.query)
//   .filter()
//   .sort()
//   .selectFields()
//   .search()
//   .paginate(totalDocuments);

// const {mongooseQuery , paginationResult} = apiFeatures;
// const subCategories = await mongooseQuery;
//     //  .populate("category", "name -_id") // if you want to fetch category name as well;
//     res.status(200).json({
//       results: subCategories.length,
//       paginationResult,
//       data: subCategories,
//     });
//   });

  export const getSubCategoryById = factory.getOne(subCategoryModel);
  // export const getSubCategoryById = asyncHandler(async (req, res,next) => {
  //   const { id } = req.params;
  //   const subCategoryGetById = await subCategoryModel.findById(id)
  //   //.populate("category", "name -_id") ; optional if you need to make 2 queries
  //   if (!subCategoryGetById) {
  //     return next(new ApiError(`no id for this category ${id}`,404))
  //   }
  //   res.status(200).json({ data: subCategoryGetById });
  // });

// @desc Update subcategory by id
// @route PUT /api/v1/subcategories/:id
// @access private
export const updateSubCategoryById = factory.updateOne(subCategoryModel);
// export const updateSubCategoryById = asyncHandler(async (req, res,next) => {
//     const { id } = req.params;
//     const { name ,category} = req.body;
//     const updateById = await subCategoryModel.findOneAndUpdate(
//       { _id: id },
//       { name, slug: slugify(name), category},
//       { new: true }
//     );
//     if (!updateById) {
//       return next(new ApiError(`no subcategory for this id ${id}`,404))
//     }
//     res.status(200).json({ data: updateById });
//   });
  
  // @desc delete subcategory by id
  // @route DELETE /api/v1/subcategories/:id
  // @access private
  export const deleteSubCategoryById = factory.deleteOne(subCategoryModel);
  // export const deleteSubCategoryById = asyncHandler(async (req, res,next) => {
  //   const { id } = req.params;
  //   const deleteById = await subCategoryModel.findByIdAndDelete(id);
  //   if (!deleteById) {
  //     return next(new ApiError(`no id for this subcategory ${id}`,404))
  //     // or use " throw new ApiError(`No category found for ID: ${id}`, 404);" >> instead of next
  //   }
  //   res.status(204).send();
  // });
  