const { createUser, loginUser } = require("../AuthService/authService");

const handleCreateUser = async (req, res) => {
  let response = await createUser(req.body);
  if (response.success) {
    res.status(200).send("User Created Successfully");
  } else {
    res.status(409).send("Failed to create user");
  }
};
const handleUserLogin = async (req, res) => {
  let response = await loginUser(req.body);
  if (response.success) {
    res.status(200).send(response);
  } else {
    res.status(401).send(response);
  }
};

module.exports = { handleCreateUser, handleUserLogin };
