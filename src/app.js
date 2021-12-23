const express = require("express");
const fileUpload = require("express-fileUpload");
const path = require("path");

const { UserRoutes, ProductRoutes } = require("./routes");
const loaders = require("./loaders");
const config = require("./config");
const events = require("./scripts/events");

config();
loaders();
events();

const app = express();
app.use("/product-images", express.static(path.join(__dirname, "./", "uploads/products")));
app.use(express.json());
app.use(fileUpload());

const serverRunning = () => {
  console.log(`Server is running on ${process.env.APP_PORT}`);
  app.use("/users", UserRoutes);
  app.use("/products", ProductRoutes);
};

app.listen(process.env.APP_PORT, serverRunning);
