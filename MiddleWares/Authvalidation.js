const Joi = require("joi");
const { STATUS_CODE_MESSAGE } = require("../Public/StatusCode/StatusCodeError");

const CreateUSerValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(100).required(),
  userName: Joi.string().required(),
  password: Joi.string().min(6).max(20).required(),
});

const LoginUserValidationSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().required(),
});

const signUpValidation = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      status: "Failed",
      message: "Request body is missing",
    });
  }

  const { error } = CreateUSerValidationSchema.validate(req.body);

  if (error) {
    res.status(500).send(STATUS_CODE_MESSAGE["500"]);
  } else {
    next();
  }
};

const loginValidation = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send(STATUS_CODE_MESSAGE["400"]);
  }

  const { error } = LoginUserValidationSchema.validate(req.body);

  if (error) {
    res.status(400).send(STATUS_CODE_MESSAGE["400"]);
  } else {
    next();
  }
};

module.exports = {
  signUpValidation,
  loginValidation,
};
