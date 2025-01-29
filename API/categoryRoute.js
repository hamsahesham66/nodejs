import express from'express';
const router = express.Router();
import { getCategory,
     createCategory,
      getCategoryById,
      updateCategoryById,
      deleteCategoryById} from '../services/categoryService.js';
import{ createCategoryValidator
      , deleteCategoryValidator
      , getCategoryValidator
      , updateCategoryValidator }from '../utils/validators/categoryValidator.js';
import subCategoryRoute from './subCategoryRoute.js';
import * as authService from '../services/authUserService.js';

router.use('/:categoryId/subcategories',subCategoryRoute);
router.route('/').get(getCategory).post(authService.protect,authService.allowedRoles('admin','manager'),createCategoryValidator,createCategory);
router.route('/:id').get(getCategoryValidator,getCategoryById)
.put(authService.protect,authService.allowedRoles('admin','manager'),updateCategoryValidator,updateCategoryById).
delete(authService.protect,authService.allowedRoles('admin','manager'),deleteCategoryValidator,deleteCategoryById)

export default router;
