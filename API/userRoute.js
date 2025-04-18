import * as userService from "../services/userService.js";
import * as userValidator from "../utils/validators/userValidator.js";
import * as authService from "../services/authUserService.js";

import express from "express";
const router = express.Router();
router.use(authService.protect)

router.get('/getMe',userService.getLoggedUserData,userService.getUserById);
router.put('/changeMyPassword',userService.updateLoggedUserPassword);
router.put('/updateMe',userValidator.updateLoggedUserValidator,userService.updateLoggedUserData);
router.delete('/deleteMe',userService.deleteLoggedUser);

router.use(authService.allowedRoles('admin','manager'));

router.put(
  "/changePassword/:id",
  userValidator.changePasswordValidator,
  userService.changeUserPassword
);

router
  .route("/")
  .get(userService.getUsers)
  .post(userValidator.createUserValidator, userService.createUser);
router
  .route("/:id")
  .get(userValidator.getUserValidator, userService.getUserById)
  .delete(userValidator.deleteUserValidator, userService.deleteUserById)
  .put(userValidator.updateUserValidator, userService.updateUserById);

export default router;
