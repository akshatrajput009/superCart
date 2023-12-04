const Category = require("../models/Category");

exports.fetchCategories = (req, res) => {
  Category.find()
    .then((categories) => {
      res.status(201).json(categories);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
