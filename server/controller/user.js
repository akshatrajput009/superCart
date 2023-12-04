const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const jwt = require("jsonwebtoken");
// const jwtExpireTime = 24 * 60 * 60;

const filterUser = (user) => {
  return { id: user.id, email: user.email, address: user.address };
};

exports.createUser = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ message: "you are already a registered user!" });
    } else {
      const user = new User(req.body);

      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) {
          console.log("something went wrong" + err);
        } else {
          user.password = hash;
          user.save().then((user) => {
            console.log("registered successfully");
            return req.login(filterUser(user), function (err) {
              if (err) {
                return res.status(400);
              } else {
                res.status(201).json({
                  id: user.id,
                  email: user.email,
                  address: user.address,
                });
              }
            });
          });
        }
      });

      // user
      //   .save({ new: true })
      //   .then((user) => {
      //     res.status(201).json(user);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.status(400).json(err);
      //   });
    }
  });
};

exports.fetchUser = (req, res) => {
  console.log(req.user);
  res.json(req.user);
};

exports.checkUser = (req, res) => {
  console.log(req.user);
  res.json(req.user);
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then((user) => {
      res.status(200).json(user);
      console.log(user, "updatedUser");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
// User.findOne({ email: req.body.email })
//   .then((user) => {
//     if (user) {
//       if (user.password === req.body.password) {
//         res
//           .status(201)
//           .json({ id: user.id, email: user.email, address: user.address });
//       } else {
//         res.status(404).json({ message: "Wrong credentials" });
//       }
//     } else {
//       res.status(404).json({ message: "Wrong credentials" });
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(400).json(err);
//   });
