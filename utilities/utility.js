const Joi = require('joi');


const validateGenre = (genre)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(3).max(225).required(),
        tags: Joi.array().length(3).required(),
        category: Joi.string().required()
    })

    const validationResult = schema.validate(genre);
    return validationResult;
}
const validateCustomer = (customer)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(10).max(11).required(),
    })

    const validationResult = schema.validate(customer);
    return validationResult;
}
const validateCustomerGoldStatus = (status)=>{
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
    })

    const validationResult = schema.validate(status);
    return validationResult;
}

module.exports.valiGenre = validateGenre;
module.exports.valiCustomer = validateCustomer;
module.exports.valiGoldStatus = validateCustomerGoldStatus;


