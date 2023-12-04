// {
//     "value": "laptops",
//     "label": "laptops",
//     "checked": false
//   },

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: mongoose.Schema.Types.Mixed },
});
const id = UserSchema.virtual("id");
id.get(() => {
  return this._id;
});
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  tranform: function (document, ret) {
    delete ret._id;
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;

// {
//     "email": "akshatantahal@gmail.com",
//     "password": "Qwerty12",
//     "id": 3,
//     "address": [
//       {
//         "firstName": "Akshat",
//         "lastName": "Antahal",
//         "email": "john@doe.com",
//         "country": "India",
//         "streetAddress": "address2",
//         "city": "UDHAMPUR",
//         "region": "fg",
//         "pinCode": "123"
//       },
//       {
//         "firstName": "Akshat",
//         "lastName": "Antahal",
//         "email": "john@doe.com",
//         "country": "India",
//         "streetAddress": "address2",
//         "city": "UDHAMPUR",
//         "region": "fg",
//         "pinCode": "123"
//       },
//       {
//         "firstName": "Akshat",
//         "lastName": "Antahal",
//         "email": "john@doe.com",
//         "country": "India",
//         "streetAddress": "sadfg",
//         "city": "UDHAMPUR",
//         "region": "fg",
//         "pinCode": "123"
//       }
//     ]
//   },
//   {
//     "email": "john@doe.com",
//     "password": "Qwerty12",
//     "address": [],
//     "id": 4
//   }
// ]
