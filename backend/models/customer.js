const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerAccountNo: {
    type: Number,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: Number,
    requierd: true,
  },
  stateCode: {
    type: String,
  },
  townshipCode: {
    type: String,
  },
  loyaltyPoints: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = model("Customer", customerSchema);
