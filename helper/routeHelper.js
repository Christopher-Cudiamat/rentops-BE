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
    userAuthSchema: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      termsAndConditions: Joi.boolean().required()
    })
  }
}