import * as userService from "../services/userService.js";
import * as userValidator from "../utils/validators/userValidator.js";
import express from "express";
const router = express.Router();

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
