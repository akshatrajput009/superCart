const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, min: [0, "min price is 0"], required: true },
  discountPercentage: { type: Number, min: [0, "min discount is 0"] },
  rating: { type: Number, min: [0, "min rating is 0"] },
  stock: { type: Number, min: [0, "min stock is 0"] },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  userId: { type: String, required: true },
  quantity: { type: Number, min: [0], required: true },
});

const id = CartSchema.virtual("id");
id.get(() => {
  return this._id;
});
CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  tranform: function (document, ret) {
    delete ret._id;
  },
});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
