const express = require("express");

const router = express.Router();

const categoryController = require("../controller/category");

router.get(
  "/",

  categoryController.fetchCategories
);

module.exports = router;
