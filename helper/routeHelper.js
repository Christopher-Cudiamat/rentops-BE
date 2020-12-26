const Joi = require('@hapi/joi');

module.exports = {
  validateBody: (schemaType) => {
    return (req,res, next) => {
      const result = schemaType.validate(req.body);

      if(result.error) res.status(400).json(result.error);
      
      if(!req.value) req.value = {};
      
      req.value['body'] = result.value;
      next();

    }
  },
  schemas : {
    signUpSchema: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      termsAndConditions: Joi.boolean().required()
    }),
    signInSchema: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    sendOtpSchema: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
    changePassword: Joi.object({
      email: Joi.string().email().required(),
      newPassword: Joi.string().required()
    }),
  }
}