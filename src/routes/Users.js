const express = require("express");
const router = express.Router();
const { index, create } = require("../controllers/Users");
const { createUser } = require("../validations/Users");
const validate = require("../middlewares/validations");

router.route("/").get(index);
router.route("/").post(validate(createUser), create);

module.exports = router;
