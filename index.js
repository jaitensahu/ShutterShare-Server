const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const routes = require("./Routes/routes");

const app = express();

app.use(express.json());
app.use("/", routes);

(async function connectToDb() {
  try {
    await mongoose.connect(config.databaseUrl);
    console.log("Connected to Database Successfully");
  } catch (error) {
    console.log("Database Connection Failed", error);
  }
})();

app.listen(config.port, () => {
  console.log("Server is running at port:", config.port);
});
