const STATUS_CODE_MESSAGE = {
  409: {
    statusCode: 409,
    success: false,
    message: "Data Already Exits",
  },
  200: {
    statusCode: 200,
    success: true,
    message: "Success",
  },
  400: {
    statusCode: 400,
    success: false,
    message: "Bad request",
  },
  NO_USER_FOUND: {
    success: false,
    message: "No User Found",
  },
  LOGGED_IN: {
    success: true,
    message: " User logged in Successfully",
  },
  INCORRECT_PASSWORD: {
    success: false,
    message: "Incorrect Password",
  },
  USER_CREATED_SUCCESFULLY: {
    success: true,
    message: "user created succesfully"
  }
};

const STATUS_CODE = {
  CONFLICT: 409,
  SUCCESS: 200,
  BAD_REQUEST: 400,
};

module.exports = {
  STATUS_CODE,
  STATUS_CODE_MESSAGE,
};
