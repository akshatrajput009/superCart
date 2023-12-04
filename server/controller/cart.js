const Cart = require("../models/Cart");

exports.addToCart = (req, res) => {
  const item = new Cart(req.body);

  item
    .save()
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.fetchItems = (req, res) => {
  const userId = req.query.userId;

  Cart.find({ userId: userId })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.updateItem = (req, res) => {
  const id = req.params.id;
  Cart.findByIdAndUpdate(id, { quantity: req.body.quantity }, { new: true })
    .then((item) => {
      res.status(200).json(item);
      console.log(item, "updatedItem");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.deleteItem = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Cart.deleteOne({ _id: id })
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.deleteWholeCart = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Cart.deleteMany({ userId: id })
    .then(() => {
      res.status(201).json({ message: "deleted successfully" });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
