const authRoute = require("./AuthRoutes");

const routes = require("express").Router();

routes.use("/", authRoute);

module.exports = routes