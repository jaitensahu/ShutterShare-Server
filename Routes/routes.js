const authRoute = require("./authRoutes");

const routes = require("express").Router();

routes.use("/", authRoute);

module.exports = routes;
