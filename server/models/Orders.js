const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: { type: mongoose.Schema.Types.Mixed, required: true },
  subTotal: { type: Number, required: true },
  address: { type: mongoose.Schema.Types.Mixed, required: true },
  paymentMethod: { type: String, required: true },
  userId: { type: String, required: true },
});

const id = OrderSchema.virtual("id");
id.get(() => {
  return this._id;
});
OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  tranform: function (document, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
