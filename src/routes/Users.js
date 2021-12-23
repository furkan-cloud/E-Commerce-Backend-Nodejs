const express = require("express");
const router = express.Router();
const { index, create, login, resetPassword } = require("../controllers/Users");
const userSchemas = require("../validations/Users");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.route("/create-admin-user").post(validate(userSchemas.createAdminUser, "body"), create);
router.route("/login").post(validate(userSchemas.userLogin), login);

//! admin stuff
router.route("/").get(authenticateAdmin, index);
router.route("/").post(authenticateAdmin, validate(userSchemas.createUser, "body"), create);
router.route("/reset-password").post(validate(userSchemas.resetPassword), resetPassword);
// router.route("/:typeId").post(validate(userQuery, "query"),validate(createUser, "body"), create);

module.exports = router;
