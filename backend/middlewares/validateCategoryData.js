const Joi = require("joi");

const categorySchema = Joi.object({
  categoryCode: Joi.string().required(),
  categoryName: Joi.string().required(),
});

const validateCategoryData = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateCategoryData;
