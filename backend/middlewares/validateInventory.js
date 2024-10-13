const Joi = require("joi");

const inventorySchema = Joi.object({
  productCode: Joi.string().required(),
  initialStock: Joi.number().optional(),
  addedQuantity: Joi.number().optional(),
  deductedQuantity: Joi.number().optional(),
});

const validateInventory = (req, res, next) => {
  const { error } = inventorySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateInventory;
