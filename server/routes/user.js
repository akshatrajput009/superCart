const express = require("express");

const router = express.Router();
const passport = require("passport");

const userController = require("../controller/user");

router.post(
  "/auth",
  function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      // User authenticated successfully
      // You can handle the successful authentication response here
      res.json({ user });
    })(req, res, next);
  },
  userController.fetchUser
);

router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.get("/check", userController.checkUser);

module.exports = router;
