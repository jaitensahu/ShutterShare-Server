const {
  STATUS_CODE,
  STATUS_CODE_MESSAGE,
} = require("../../Public/StatusCode/StatusCodeError");
const UserModel = require("../model/createUserModel");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const { email, name, userName, password } = userData;

    const user = await UserModel.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (user) {
      return STATUS_CODE_MESSAGE[STATUS_CODE.CONFLICT];
    }
    const userModel = await new UserModel(userData);
    userModel.password = await bcrypt.hash(userData.password, 10);
    await userModel.save();

    return STATUS_CODE_MESSAGE[STATUS_CODE.SUCCESS];
  } catch (error) {
    console.log("error-->", error);
  }
};

const loginUser = async (loginDetails) => {
  const { email, password } = loginDetails;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return STATUS_CODE_MESSAGE.NO_USER_FOUND;
  }
  const isValid = await verifyPassword(user.password, password);
  if (isValid) return STATUS_CODE_MESSAGE.LOGGED_IN;
  else return STATUS_CODE_MESSAGE.INCORRECT_PASSWORD;
};

module.exports = {
  createUser,
  loginUser,
};

const verifyPassword = async (dbHash, userPass) => {
  try {
    return await bcrypt.compare(userPass, dbHash);
  } catch (error) {
    console.log(error);
  }
};
