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

router.use('/:categoryId/subcategories',subCategoryRoute);
router.route('/').get(getCategory).post(createCategoryValidator,createCategory);
router.route('/:id').get(getCategoryValidator,getCategoryById)
.put(updateCategoryValidator,updateCategoryById).
delete(deleteCategoryValidator,deleteCategoryById)

export default router;
