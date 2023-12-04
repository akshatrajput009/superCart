const express = require("express");

const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user");

router.post("/auth", passport.authenticate("local"), userController.fetchUser);

router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.get("/check", userController.checkUser);

module.exports = router;
