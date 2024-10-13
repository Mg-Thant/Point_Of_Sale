const { Schema, model } = require("mongoose");

const saleInvoiceSchema = new Schema(
  {
    staffCode: {
      required: true,
      type: String,
      ref: "Staff",
    },
    shopCode: {
      required: true,
      type: String,
      ref: "Shop",
    },
    saleInvoiceDateTime: {
      type: Date,
      default: Date.now(),
    },
    voucherNo: {
      type: Number,
      required: true,
      ref: "SaleInvoiceDetails",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["Cash", "MobileBanking"],
      required: true,
    },
    customerAccountNo: {
      type: Number,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    receivedAmount: {
      type: Number,
      required: true,
    },
    change: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("SaleInvoice", saleInvoiceSchema);
