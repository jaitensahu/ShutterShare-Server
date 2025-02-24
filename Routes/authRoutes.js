const {
  handleCreateUser,
  handleUserLogin,
  handleUpdateUserData,
} = require("../Authentication/controller/userController");
const {
  signUpValidation,
  loginValidation,
  validateUser,
} = require("../MiddleWares/authValidation");

const authRoute = require("express").Router();

authRoute.post("/signup", signUpValidation, handleCreateUser);

authRoute.post("/login", loginValidation, handleUserLogin);

authRoute.patch("/update", validateUser, handleUpdateUserData);

module.exports = authRoute;
