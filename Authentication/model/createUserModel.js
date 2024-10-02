const mongoose = require("mongoose");

const createUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("users", createUserSchema);
module.exports = UserModel;
