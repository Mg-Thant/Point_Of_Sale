const Joi = require("joi");

const productSchema = Joi.object({
  productCode: Joi.string().alphanum().required(),
  categoryCode: Joi.string().required(),
  productName: Joi.string().required(),
  price: Joi.number().required(),
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateProduct;
