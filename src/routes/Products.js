const express = require("express");
const router = express.Router();
const Products = require("../controllers/Products");
const schemas = require("../validations/Products");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.route("/").get(Products.index);
router.route("/:id/add-comment").post(authenticate, validate(schemas.addComment), Products.addComment);

router.route("/").post(authenticateAdmin, validate(schemas.createProduct), Products.create);
router.route("/:id").patch(authenticateAdmin, validate(schemas.updateProduct), Products.update);
router.route("/:id/add-media").post(authenticateAdmin, Products.addMedia);

module.exports = router;
