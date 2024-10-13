const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    categoryCode: {
      required: true,
      type: String,
      ref: "Category",
    },
    productCode: {
      type: String,
      required: true,
      ref: "Inventory",
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
