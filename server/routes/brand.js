const express = require("express");

const router = express.Router();

const brandController = require("../controller/brand");

router.get(
  "/",

  brandController.fetchBrands
);

module.exports = router;
