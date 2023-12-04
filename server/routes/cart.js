const express = require("express");

const router = express.Router();

const cartController = require("../controller/cart");

router.post("/", cartController.addToCart);

router.get("/", cartController.fetchItems);
router.patch("/:id", cartController.updateItem);
router.delete("/:id", cartController.deleteItem);
router.delete("/all/:id", cartController.deleteWholeCart);

module.exports = router;
