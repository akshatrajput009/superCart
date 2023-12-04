const express = require("express");

const router = express.Router();

const orderController = require("../controller/order");

router.post(
  "/",

  orderController.addOrder
);
router.get(
  "/",

  orderController.fetchOrders
);

module.exports = router;
