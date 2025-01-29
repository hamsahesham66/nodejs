import { check,body } from "express-validator";
import validatorMiddleWare from "../../middleware/validatorMiddleWare.js";
import slugify from "slugify";

export const getBrandValidator=[
    check('id').isMongoId().withMessage('invalid brand id'),
    validatorMiddleWare
]

 export const createBrandValidator=[
    check('name').notEmpty().withMessage("brand required")
    .isLength({min:3}).withMessage('Too short brand name')
    .isLength({max:32}).withMessage('Too long brand name')
    .custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare
]

export const updateBrandValidator=[
    check('id').isMongoId().withMessage('invalid brand id'),
    body('name').custom((val,{req})=>{
        req.body.slug=slugify(val);
        return true;
    }),
    validatorMiddleWare
]

export const deleteBrandValidator=[
    check('id').isMongoId().withMessage('invalid brand id'),
    validatorMiddleWare
]