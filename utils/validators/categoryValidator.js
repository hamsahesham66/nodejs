import { check ,body} from "express-validator";
import validatorMiddleWare from "../../middleware/validatorMiddleWare.js";
import slugify from "slugify";

export const getCategoryValidator=[
    check('id').isMongoId().withMessage('invalid category id'),
    validatorMiddleWare
]

 export const createCategoryValidator=[
    check('name').notEmpty().withMessage("Category required")
    .isLength({min:3}).withMessage('Too short category name')
    .isLength({max:32}).withMessage('Too long category name')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare
]

export const updateCategoryValidator=[
    check('id').isMongoId().withMessage('invalid category id'),
        body('name').custom((val,{req})=>{
            req.body.slug=slugify(val);
            return true;
        }),
    validatorMiddleWare
]

export const deleteCategoryValidator=[
    check('id').isMongoId().withMessage('invalid category id'),
    validatorMiddleWare
]