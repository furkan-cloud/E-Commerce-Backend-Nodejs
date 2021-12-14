const express = require("express");
const app = express();
const { UserRoutes } = require("./routes");
const loaders = require("./loaders");
const config = require("./config");


config();
loaders();

app.use(express.json());

const serverRunning = () => {
  console.log(`Server is running on ${process.env.APP_PORT}`);
  app.use("/users", UserRoutes);
};

app.listen(process.env.APP_PORT, serverRunning);
