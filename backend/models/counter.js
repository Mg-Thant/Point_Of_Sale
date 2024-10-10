const { Schema, model } = require("mongoose");

const counterSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  sequence_val: {
    type: Number,
    required: true,
  },
});

module.exports = model("Counter", counterSchema);