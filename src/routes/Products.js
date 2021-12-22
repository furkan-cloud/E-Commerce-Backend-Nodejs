const express = require("express");
const router = express.Router();
const { index, create, update, addComment } = require("../controllers/Products");
const schemas = require("../validations/Products");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.route("/").get(index);
router.route("/").post(authenticateAdmin, validate(schemas.createProduct), create);
router.route("/:id/add-comment").post(authenticate, validate(schemas.addComment), addComment);
router.route("/:id").patch(authenticateAdmin, validate(schemas.updateProduct), update);

module.exports = router;
