const express = require("express");
const router = express.Router();
const { index, create, update, addComment, addMedia } = require("../controllers/Products");
const schemas = require("../validations/Products");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.route("/").get(index);
router.route("/:id/add-comment").post(authenticate, validate(schemas.addComment), addComment);

router.route("/").post(authenticateAdmin, validate(schemas.createProduct), create);
router.route("/:id").patch(authenticateAdmin, validate(schemas.updateProduct), update);
router.route("/:id/add-media").post(authenticateAdmin, addMedia);

module.exports = router;
