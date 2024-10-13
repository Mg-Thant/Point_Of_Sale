const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
  productCode: {
    type: String,
    required: true,
    unique: true,
  },
  currentStock: {
    type: Number,
    required: true,
  },
  miniumStock: {
    type: Number,
    required: true,
    default: 5,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
  stockAdded: [
    {
      addedQuantity: {
        type: Number,
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  stockDeducted: [
    {
      deductedQuantity: {
        type: Number,
        required: true,
      },
      deductedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = model("Inventory", inventorySchema);
