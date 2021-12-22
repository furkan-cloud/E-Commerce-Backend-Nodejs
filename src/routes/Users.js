const express = require("express");
const router = express.Router();
const { index, create, login } = require("../controllers/Users");
const { createUser, userLogin } = require("../validations/Users");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.route("/").get(authenticate, index);
router.route("/").post(validate(createUser), create);
router.route("/login").post(validate(userLogin), login);

module.exports = router;
