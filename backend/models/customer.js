const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
  customerAccountNo: {
    type: Number,
    required: true,
    unique: true,
  },
  loyaltyPoints: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = model("Customer", customerSchema);