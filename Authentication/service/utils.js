const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_EXPIRY_TIME = "30d";

exports.verifyPassword = async (dbHash, userPass) => {
  try {
    return await bcrypt.compare(userPass, dbHash);
  } catch (error) {
    console.log(error);
  }
};

exports.createJWTToken = (payload) => {
  const privateKey = process.env.AUTH_PRIVATE_KEY;
  return jwt.sign(payload, privateKey, {
    algorithm: "HS256",
    expiresIn: TOKEN_EXPIRY_TIME,
  });
};
