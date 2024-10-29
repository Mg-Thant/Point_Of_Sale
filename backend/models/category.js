const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    categoryCode: {
      type: String,
      required: true,
      unique: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Category", categorySchema);
