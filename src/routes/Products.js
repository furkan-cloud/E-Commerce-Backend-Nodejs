const express = require("express");
const router = express.Router();
const { index, create, update } = require("../controllers/Products");
const { createProduct, updateProduct } = require("../validations/Products");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const authenticateAdmin = require("../middlewares/authenticateAdmin");

router.route("/").get(index);
router.route("/").post(authenticateAdmin, validate(createProduct), create);
router.route("/:id").patch(authenticateAdmin, validate(updateProduct), update);

module.exports = router;
