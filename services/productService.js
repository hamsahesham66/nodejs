import ProductModel from "../models/productModel.js";
import * as factory from "./handlersFactory.js";

// @desc Get list of products
// @route GET /api/v1/products
// @access Public
 
export const getProduct  =factory.getAll(ProductModel,'Products');
// export const getProduct = asyncHandler(async (req, res) => {
//   //Filtering product
//   //console.log(req.query);
//   // const queryObject = { ...req.query };
//   // const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
//   // excludedFields.forEach((field) => delete queryObject[field]);
//   // // filteration using gte, gt, lte, lt
//   // let queryStr = JSON.stringify(queryObject);
//   // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//   // // pagination
//   // const page = req.query.page * 1 || 1;
//   // const limit = req.query.limit * 1 || 1000;
//   // const skip = (page - 1) * limit;

//   const totalDocuments = await ProductModel.countDocuments();

//     //build query
//   const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
//     .filter()
//     .sort()
//     .selectFields()
//     .search('Products')
//     .paginate(totalDocuments);
//     //.populate({ path: "category", select: "name -_id" });

//     const products = await apiFeatures.mongooseQuery;
//     res.status(200).json({
//       results: products.length,
//       pagination:apiFeatures.paginationResult,
//       //page,
//      // total,
//      // totalPages: Math.ceil(total / limit),
//       data: products,
//     });
//   //sorting
//   // if (req.query.sort) {
//   //   // i want to sort by more than one field
//   //   const sortBy = req.query.sort.split(",").join(" ");
//   //   mongooseQuery = mongooseQuery.sort(sortBy);
//   // } else {
//   //   mongooseQuery = mongooseQuery.sort("-createdAt");
//   // }
//   // // field selection
//   // if (req.query.fields) {
//   //   const fields = req.query.fields.split(",").join(" ");
//   //   mongooseQuery = mongooseQuery.select(fields);
//   // } else {
//   //   mongooseQuery = mongooseQuery.select("-__v");
//   // }
//   // search feature
//   // if (req.query.keyword) {
//   //   const search = req.query.keyword;
//   //   const query = {}
//   //    query.$or= [
//   //       { title: { $regex: search, $options: 'i' } },
//   //       { description: { $regex: search, $options: 'i' } }
//   //     ];
//   //     console.log('Search keyword:', search);

//   //     console.log(query)
//   //   mongooseQuery = mongooseQuery.find(query);
//   //   }
//   // execute query

// });

// @desc Create product
// @route POST /api/v1/products
// @access private
export const createProduct = factory.createOne(ProductModel);
// export const createProduct = asyncHandler(async (req, res) => {
//   req.body.slug = slugify(req.body.title);
//   const product = await ProductModel.create(req.body);
//   res.status(201).json({ data: product });
// });
// @desc Get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
// export const getProductById = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const productGetById = await ProductModel.findById(id).populate({
//     path: "category",
//     select: "name -_id",
//   });
//   if (!productGetById) {
//     return next(new ApiError(`no id for this product ${id}`, 404));
//   }
//   res.status(200).json({ data: productGetById });
// });
export const getProductById = factory.getOne(ProductModel);

// @desc Update product by id
// @route PUT /api/v1/products/:id
// @access private
export const updateProductById = factory.updateOne(ProductModel);
// export const updateProductById = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   if (req.body.title) {
//     req.body.slug = slugify(req.body.title);
//   }
//   const updateById = await ProductModel.findOneAndUpdate(
//     { _id: id },
//     req.body,
//     { new: true }
//   );
//   if (!updateById) {
//     return next(new ApiError(`no id for this product ${id}`, 404));
//   }
//   res.status(200).json({ data: updateById });
// });


// @desc delete product by id
// @route DELETE /api/v1/products/:id
// @access private

export const deleteProductById = factory.deleteOne(ProductModel);
// export const deleteProductById = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const deleteById = await ProductModel.findByIdAndDelete(id);
//   if (!deleteById) {
//     return next(new ApiError(`no id for this product ${id}`, 404));
//     // or use " throw new ApiError(`No product found for ID: ${id}`, 404);" >> instead of next
//   }
//   res.status(204).send();
// });
