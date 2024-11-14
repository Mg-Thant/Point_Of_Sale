const Joi = require("joi");

const staffSchema = Joi.object({
  staffCode: Joi.string().required(),
  staffName: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  mobileNumber: Joi.number().required(),
  address: Joi.string().required(),
  gender: Joi.string().required(),
  position: Joi.string().required(),
  shopId: Joi.string().required(),
});

const validateStaffData = (req, res, next) => {
  const { error } = staffSchema.validate(req.body);

  if (error) {
    return res.status(422).json({
      message: error.details[0].message,
    });
  }

  next();
};

module.exports = validateStaffData;
