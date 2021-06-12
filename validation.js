const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
    firstname: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    passwordconfirm: Joi.string().min(6)
});
//Data Validation

return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
});
//Data Validation

return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;