const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

let Products = mongoose.model("Products", productsSchema);
module.exports = Products;
