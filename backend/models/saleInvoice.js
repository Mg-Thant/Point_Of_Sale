const { Schema, model } = require("mongoose");

const saleInvoiceSchema = new Schema(
  {
    staffCode: {
      required: true,
      type: String,
      ref: "Staff",
    },
    shop: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Shop",
    },
    saleInvoiceDateTime: {
      type: Date,
      default: Date.now,
    },
    voucherNo: {
      type: Number,
      required: true,
      unique: true,
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
      enum: ["cash", "mobilebanking"],
      required: true,
    },
    customerAccountNo: {
      type: Number,
      required: true,
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
    saleInvoiceDetails: {
      type: Schema.Types.ObjectId,
      ref: "SaleInvoiceDetails",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("SaleInvoice", saleInvoiceSchema);
