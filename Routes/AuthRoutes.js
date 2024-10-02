const {
  handleCreateUser,
  handleUserLogin,
} = require("../Authentication/controller/authController");
const {
  signUpValidation,
  loginValidation,
} = require("../MiddleWares/Authvalidation");

const authRoute = require("express").Router();

authRoute.post("/signup", signUpValidation, handleCreateUser);

authRoute.post("/loginv2", loginValidation, handleUserLogin);

module.exports = authRoute;
