const Joi = require("joi");

const invoiceSchema = Joi.object({
  staffCode: Joi.string().required(),
  shopId: Joi.string().required(),
  totalAmount: Joi.number().required(),
  discount: Joi.number().required(),
  tax: Joi.number().required(),
  paymentType: Joi.string().valid("cash", "mobilebanking").required(),
  customerAccountNo: Joi.number().required(),
  receivedAmount: Joi.number().required(),
  products: Joi.array().items(
    Joi.object({
      productCode: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      amount: Joi.number().required(),
    })
  ),
  redeemPoints: Joi.number().required(),
});

const validateInvoice = (req, res, next) => {
  const { error } = invoiceSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateInvoice;
