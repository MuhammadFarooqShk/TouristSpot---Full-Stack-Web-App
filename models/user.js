mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false // Set the default value to false
    }
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
module.exports = User;