import BrandModel from "../models/brandModel.js";
import * as factory from "./handlersFactory.js";
// @desc Get list of brands
// @route GET /api/v1/brands
// @access Public
export const getBrands = factory.getAll(BrandModel);
// export const getBrands = asyncHandler(async (req, res) => {

//   const totalDocuments = await BrandModel.countDocuments();
//     //build query
//   const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
//     .filter()
//     .sort()
//     .selectFields()
//     .search()
//     .paginate(totalDocuments);

//   const {mongooseQuery , paginationResult} = apiFeatures;
//   const brands = await mongooseQuery;
//   res.status(200).json({
//     results: brands.length,
//     paginationResult,
//     data: brands,
//   });
// });

// @desc Create brand
// @route POST /api/v1/brands
// @access private
export const createBrand = factory.createOne(BrandModel);
// export const createBrand = asyncHandler(async (req, res) => {
//   const{ name} = req.body;
//   const brand = await BrandModel.create({ name, slug: slugify(name) });
//   res.status(201).json({ data: brand });
// });



// @desc Get specific brand by id
// @route GET /api/v1/brands/:id
// @access Public

export const getBrandById = factory.getOne(BrandModel);


// export const getBrandById = asyncHandler(async (req, res,next) => {
//   const { id } = req.params;
//   const brandGetById = await BrandModel.findById(id);
//   if (!brandGetById) {
//     return next(new ApiError(`no id for this brand ${id}`,404))
//   }
//   res.status(200).json({ data: brandGetById });
// });

// @desc Update brand by id
// @route PUT /api/v1/brands/:id
// @access private
export const updateBrandById = factory.updateOne(BrandModel);
// export const updateBrandById = asyncHandler(async (req, res,next) => {
//   const updateById = await BrandModel.findByIdAndUpdate(
//    req.params.id,
//    req.body,
//     { new: true }
//   );
//   if (!updateById) {
//     return next(new ApiError(`no id for this brand ${req.params.id}`,404))
//   }
//   res.status(200).json({ data: updateById });
// });


// @desc delete brand by id
// @route DELETE /api/v1/categories/:id
// @access private

export const deleteBrandById =factory.deleteOne(BrandModel);
// export const deleteBrandById = asyncHandler(async (req, res,next) => {
//   const { id } = req.params;
//   const deleteById = await BrandModel.findByIdAndDelete(id);
//   if (!deleteById) {
//     return next(new ApiError(`no id for this brand ${id}`,404))
//     // or use " throw new ApiError(`No category found for ID: ${id}`, 404);" >> instead of next
//   }
//   res.status(204).send();
// });
