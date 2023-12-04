const express = require("express");
require("dotenv").config();
// const { MongoClient, ServerApiVersion } = require("mongodb");
const auth = require("./middleware");
const products = require("./routes/products");
const brand = require("./routes/brand");
const category = require("./routes/category");
const user = require("./routes/user");
const cart = require("./routes/cart");
const order = require("./routes/order");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtExpireTime = 24 * 60 * 60;
const User = require("./models/User");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

app.use(passport.authenticate("session"));
const { default: mongoose } = require("mongoose");

const { LINKTOMONGO } = process.env;

mongoose.connect(LINKTOMONGO, { useNewUrlParser: true }).then(
  () => {
    console.log("connected to databse");
  },
  (err) => {
    console.log("something went wrong" + err);
  }
);

app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
app.use("/products", products);
app.use("/brands", brand);
app.use("/categories", category);
app.use("/users", user);
app.use("/cart", cart);
app.use("/orders", order);

passport.use(
  new LocalStrategy({ usernameField: "email" }, function (
    email,
    password,
    done
  ) {
    console.log("fdfdf");
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
              const payload = {
                id: user.id,
                email: user.email,
                address: user.address,
              };
              done(null, {
                id: user.id,
                email: user.email,
                address: user.address,
              });
              // jwt.sign(
              //   payload,
              //   process.env.SECRET_KEY,

              //   (err, token) => {
              //     if (err) console.log("there is an error in jwt");
              //     else {
              //       done(null, {
              //         success: true,
              //         token: `Bearer ${token}`,
              //       });
              //     }
              //   }
              // );
            } else {
              done(null, false, { message: "Wrong credentials" });
            }
          });

          // if (user.password === password) {

          //   done(null, {
          //     id: user.id,
          //     email: user.email,
          //     address: user.address,
          //   });
          //   // res
          //   //   .status(201)
          //   //   .json({ id: user.id, email: user.email, address: user.address });
          // } else {
          //   done(null, false, { message: "Wrong credentials" });

          // }
        } else {
          done(null, false, { message: "Wrong credentials" });
        }
      })
      .catch((err) => {
        console.log(err);
        done(err);
        // res.status(400).json(err);
      });
  })
);

passport.serializeUser(function (user, cb) {
  console.log("serl", user);
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserl", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.listen(8080, () => {
  console.log("server is connected at port 8080");
});
