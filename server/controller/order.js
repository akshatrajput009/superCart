const Order = require("../models/Orders");

exports.addOrder = (req, res) => {
  const order = new Order(req.body);
  order
    .save()
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

exports.fetchOrders = (req, res) => {
  const userId = req.query.userId;
  Order.find({ userId: userId })
    .then((orders) => {
      res.status(201).json(orders);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};
