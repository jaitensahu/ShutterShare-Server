const configDefault = require("./config-default");
require("dotenv").config();

const env = process.env.NODE_ENV || "prod";
module.exports = configDefault[env];
