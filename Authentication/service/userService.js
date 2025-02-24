const {
  STATUS_CODE,
  STATUS_CODE_MESSAGE,
} = require("../../Public/StatusCode/StatusCodeError");
const UserModel = require("../model/createUserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyPassword, createJWTToken } = require("./utils");
// const { verifyPassword, createJWTToken } = require("./utils");

const createUser = async (userData) => {
  //Later need to add decode logic as data will be encoded

  try {
    const { email, userName } = userData;

    const user = await UserModel.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (user) {
      return STATUS_CODE_MESSAGE[STATUS_CODE.CONFLICT];
    }
    const userModel = await new UserModel(userData);
    userModel.password = await bcrypt.hash(userData.password, 10);
    const createdUser = await userModel.save();

    const userPayload = createUserPayload(createdUser);
    const token = createJWTToken(userPayload);

    return {
      ...STATUS_CODE_MESSAGE.USER_CREATED_SUCCESFULLY,
      token,
    };
  } catch (error) {
    console.log("error-->", error);
  }
};

const loginUser = async (loginDetails) => {
  try {
    const { email, password } = loginDetails;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return STATUS_CODE_MESSAGE.NO_USER_FOUND;
    }
    const isValid = await verifyPassword(user.password, password);
    const payload = createUserPayload(user);
    if (isValid) {
      const token = createJWTToken(payload);
      return { ...STATUS_CODE_MESSAGE.LOGGED_IN, token };
    } else return STATUS_CODE_MESSAGE.INCORRECT_PASSWORD;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  createUser,
  loginUser,
};

function createUserPayload(user) {
  return {
    email: user.email,
    name: user.name,
    userName: user.userName,
    createdAt: user.createdAt,
    deletedAt: user.deletedAt,
  };
}
