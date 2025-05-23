import * as authService from "../services/authUserService.js";
import * as authValidator from "../utils/validators/authValidator.js";
import express from "express";
const router = express.Router();

router.route("/signup").post(authValidator.signUpValidator, authService.signUp);
router.route("/login").post(authValidator.loginValidator, authService.login);
router.route("/forgotPassword").post(authService.forgotPassword);
router.route("/verifyResetCode").post(authService.verifyResetCode);
router.route("/resetPassword").put(authService.resetPassword);


export default router;
