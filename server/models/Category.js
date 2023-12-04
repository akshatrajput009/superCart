// {
//     "value": "laptops",
//     "label": "laptops",
//     "checked": false
//   },

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  value: { type: String, required: true, unique: true },
  label: { type: String, required: true, unique: true },
  checked: { type: Boolean, required: true, default: false },
});
const id = CategorySchema.virtual("id");
id.get(() => {
  return this._id;
});
CategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  tranform: function (document, ret) {
    delete ret._id;
  },
});

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
