const express = require("express");
const app = express();
const UserRoutes = require("./routes/Users");

const serverRunning = () => {
  console.log("Server is up!");
  app.use("/users", UserRoutes);
};

app.listen(4545, serverRunning);
