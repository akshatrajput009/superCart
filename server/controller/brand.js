const Brand = require("../models/Brand");

exports.fetchBrands = (req, res) => {
  Brand.find()
    .then((brands) => {
      res.status(201).json(brands);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
