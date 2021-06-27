const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object({
    firstname: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).required(),
    passwordconfirm: Joi.string().min(6)
    });

    //Data Validation
    return schema.validate(data);
};

const loginValidation = data => {
    const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(6).required()
    });

    //Data Validation
    return schema.validate(data);
};

const eventValidation = data => {
    const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    description: Joi.string().max(10240),
    location: Joi.string().min(2).required(),
    postalcode: Joi.number().min(1000).required(),
    numberofguests: Joi.number()    
    });

    //Data Validation
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.eventValidation = eventValidation;