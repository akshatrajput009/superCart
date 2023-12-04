const Product = require("../models/Products");

exports.createProduct = (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

let count = "";
exports.fetchProducts = (req, res) => {
  let products = Product.find();
  let count = Product.find();
  function fetching() {
    if (req.query._sort && req.query._order) {
      console.log(req.query);
      let order = 0;
      if (req.query._order === "desc") {
        order = -1;
      } else {
        order = 1;
      }
      products = products.find().sort({ [req.query._sort]: order });
      count = count.find().sort({ [req.query._sort]: order });
    }

    if (req.query.category) {
      console.log(req.query);
      products = products.find({ category: req.query.category });
      count = count.find({ category: req.query.category });
    }

    if (req.query.brand) {
      console.log(req.query);
      products = products.find({ brand: req.query.brand });
      count = count.find({ brand: req.query.brand });
    }
    if (req.query._page && req.query._limit) {
      const limit = req.query._limit;
      const skip = (req.query._page - 1) * limit;
      products = products.skip(skip).limit(limit);
    }

    return products;
  }

  fetching()
    .then((productItem) => {
      const totalProducts = count.countDocuments().then((totalProducts) => {
        res.set("X-Total-Count", totalProducts);
        res.status(201).json(productItem);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });

  // Product.find()
  //   .then((product) => {
  //     res.status(201).json(product);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err);
  //   });
};

exports.fetchProductByID = (req, res) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
