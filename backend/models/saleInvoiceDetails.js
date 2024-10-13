const { Schema, model } = require("mongoose");

const saleInvoiceDetailsSchema = new Schema(
  {
    voucherNo: {
      type: Number,
      unique: true,
    },
    productCode: {
      type: String,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("SaleInvoiceDetails", saleInvoiceDetailsSchema);
