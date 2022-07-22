const Joi = require('joi');

module.exports = {
     contactValidation: (req, res, next) => {
         const { name, email, phone } = req.body;
         const schema = Joi.object({
    name: Joi.string()

      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string()

      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const validationResult = schema.validate({ name, email, phone });

  if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: validationResult.error.message,
    });
  }
        next();
  },
  statusValidation: (req, res, next) => {
    const { favorite } = req.body;
    const schema = Joi.object({
      favorite: Joi.boolean().required()
    });
    const validationResult = schema.validate({ favorite });
     if (validationResult.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: validationResult.error.message,
    });
  }
        next();
  }
}