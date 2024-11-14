const { Schema, model } = require("mongoose");

const staffSchema = new Schema({
  staffCode: {
    type: String,
    required: true,
    unique: true,
  },
  staffName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  position: {
    type: String,
    enum: ["cashier", "manager", "admin"],
    required: true,
  },
  shopId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Shop",
  }
});

module.exports = model("Staff", staffSchema);
