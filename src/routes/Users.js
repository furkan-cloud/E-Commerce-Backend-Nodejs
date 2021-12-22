const express = require("express");
const router = express.Router();
const { index, create, login } = require("../controllers/Users");
const { createUser, createAdminUser, userLogin } = require("../validations/Users");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.route("/create-admin-user").post(validate(createAdminUser, "body"), create);
router.route("/login").post(validate(userLogin), login);

//! admin stuff
router.route("/").get(authenticateAdmin, index);
router.route("/").post(authenticateAdmin, validate(createUser, "body"), create);
// router.route("/:typeId").post(validate(userQuery, "query"),validate(createUser, "body"), create);

module.exports = router;
