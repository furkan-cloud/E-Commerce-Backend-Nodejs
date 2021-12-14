const express = require("express");
const router = express.Router();

router.route("/").get(() => {
  console.log("User Index");
});

module.exports = router;
