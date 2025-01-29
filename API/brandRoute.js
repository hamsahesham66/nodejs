import express from "express";
const router = express.Router();
import {
  getBrands,
  createBrand,
  getBrandById,
  updateBrandById,
  deleteBrandById,
} from "../services/brandService.js";
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from "../utils/validators/brandValidator.js";
import * as authService from "../services/authUserService.js";

router
  .route("/")
  .get(getBrands)
  .post(
    authService.protect,
    authService.allowedRoles("admin", "manager"),
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(
    authService.protect,
    authService.allowedRoles("admin", "manager"),
    updateBrandValidator,
    updateBrandById
  )
  .delete(
    authService.protect,
    authService.allowedRoles("admin", "manager"),
    deleteBrandValidator,
    deleteBrandById
  );

export default router;
