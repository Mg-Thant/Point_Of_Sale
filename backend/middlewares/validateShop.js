const Joi = require("joi");

const shopSchema = Joi.object({
  shopCode: Joi.string().required(),
  shopName: Joi.string().required(),
  mobileNumber: Joi.number().required(),
  address: Joi.string().required(),
});

const validateShop = (req, res, next) => {
  const { error } = shopSchema.validate(req.body);

  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  next();
};

module.exports = validateShop;
