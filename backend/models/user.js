const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
  position: {
    type: String,
    enum: ["cashier", "admin"],
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = model("User", userSchema);
