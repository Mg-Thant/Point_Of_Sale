const Joi = require("joi");

const saleInvoiceDetailsSchema = Joi.object({
  productCode: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  amount: Joi.number().required(),
});

const validateSaleInvoiceDetails = (req, res, next) => {
  const { error } = saleInvoiceDetailsSchema.validate();

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateSaleInvoiceDetails;
