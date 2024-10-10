const Joi = require("joi");

const saleInvoiceSchema = Joi.object({
  staffCode: Joi.string().required(),
  shopCode: Joi.string().required(),
  productCode: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  totalAmount: Joi.number().required(),
  discount: Joi.number().required(),
  tax: Joi.number().required(),
  paymentType: Joi.string().valid("Cash", "MobileBanking").required(),
  customerAccountNo: Joi.number().optional(),
  paymentAmount: Joi.number().required(),
  receivedAmount: Joi.number().required(),
  change: Joi.number().required(),
});

const validateSaleInvoice = (req, res, next) => {
  const { error } = saleInvoiceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateSaleInvoice;
