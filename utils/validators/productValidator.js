import { check,body } from "express-validator";
import validatorMiddleWare from "../../middleware/validatorMiddleWare.js";
import CategoryModel from "../../models/categoryModel.js";
import SubCategoryModel from "../../models/subCategoryModel.js";
import slugify from "slugify";
export const createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage("Product title is too short at least 3 characters")
    .notEmpty()
    .withMessage("Product name is required").custom((val,{req})=>{
      req.body.slug=slugify(val);
      return true;
  }),
  check('description')
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Product description is too long"),
  check('quantity')
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity should be a number"),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage("Sold quantity should be a number"),
  check('price')
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price should be a number")
    .isLength({ max: 32 })
    .withMessage("Price is too long"),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage("priceAfterDiscount should be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount should be less than price");
      }
      return true;
    }),
     check('colors')
        .optional()
        .isArray().withMessage("Colors should be an array"),

     check('coverImage')
        .notEmpty().withMessage("Cover image is required"),

    check('image')
        .optional()
        .isArray().withMessage("Images should be an array"),

    check('category')
        .notEmpty().withMessage("product must be belong to category")
        .isMongoId().withMessage("invalid id format")
        .custom((categoryId) => CategoryModel.findById(categoryId).then
        (category => {
            if (!category) {
                return Promise.reject
                (new Error(`No Category for this id ${categoryId}`));
            }
        })),
    check('subCategories')
        .optional()
        .isMongoId() .withMessage("invalid id format").custom((subCategoriesId) => 
          SubCategoryModel.find({_id :{$exists:true ,$in:subCategoriesId } }).then
        (results => {
          if (results.length <1 || results.length!=subCategoriesId.length) {
            return Promise.reject
            (new Error(`invalid subCategories Ids `));
          }
        }),
      )
      .custom(async (val, { req }) => {
        const subCategories = await SubCategoryModel.find({ category: req.body.category });
        const subCategoriesIdInDb = subCategories.map(subCategory => subCategory._id.toString());
      
        const checker = (arr, target) => target.every(v => arr.includes(v));
        if (!checker(subCategoriesIdInDb, val)) {
          throw new Error('Subcategories should belong to the given category');
        }
      }),
     check('brand')
        .optional()
        .isMongoId().withMessage("invalid id format")
        ,
    check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage("Rating average should be a number")
    .isLength({ min: 1 })
    .withMessage("Rating average is too short must be greater than or equal to 1")
    .isLength({ max: 5 })
    .withMessage("Rating average is too long must be less than or equal to 5"),
    check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage("Rating quantity should be a number"),
  validatorMiddleWare,
];

export const getProductValidator=[
    check('id').isMongoId().withMessage('invalid product id'),
    validatorMiddleWare
]

export const updateProductValidator=[
    check('id').isMongoId().withMessage('invalid product id'),
    body('title').optional().custom((val,{req})=>{
            req.body.slug=slugify(val);
            return true;
        }),
    validatorMiddleWare
]

export const deleteProductValidator=[
    check('id').isMongoId().withMessage('invalid product id'),
    validatorMiddleWare
]