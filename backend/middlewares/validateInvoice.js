const Joi = require("joi");

const invoiceSchema = Joi.object({
  staffCode: Joi.string().required(),
  shopCode: Joi.string().required(),
  totalAmount: Joi.number().required(),
  discount: Joi.number().required(),
  tax: Joi.number().required(),
  paymentType: Joi.string().valid("Cash", "MobileBanking").required(),
  customerAccountNo: Joi.number().optional(),
  receivedAmount: Joi.number().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productCode: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        amount: Joi.number().required(),
      })
    )
    .required(),
});

const validateInvoice = (req, res, next) => {
  const { error } = invoiceSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateInvoice;
