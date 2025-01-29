import express from'express';
const router = express.Router();
import { getProduct,
     createProduct,
      getProductById,
      updateProductById,
      deleteProductById} from '../services/productService.js';
import{ createProductValidator
      , deleteProductValidator
      , getProductValidator
      , updateProductValidator }from '../utils/validators/productValidator.js';
import * as authService from "../services/authUserService.js";

router.route('/').get(getProduct).post(authService.protect,authService.allowedRoles('admin','manager'),createProductValidator,createProduct);
router.route('/:id').get(getProductValidator,getProductById)
.put(authService.protect,authService.allowedRoles('admin','manager'),updateProductValidator,updateProductById).
delete(authService.protect,authService.allowedRoles('admin','manager'),deleteProductValidator,deleteProductById)

export default router;
