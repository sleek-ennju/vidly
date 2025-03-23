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
const validateMovie = (movie)=>{
    const schema = Joi.object({
        title: Joi.string().length(3).max(100).required(),
        genre: Joi.string().min(3).max(100).required(),
        numberInStock: Joi.number().min(1),
        dailyRentalRate: Joi.number()
    })

    const validationResult = schema.validate(movie);
    return validationResult;
}
const validateMovieGenre = (movie)=>{
    const schema = Joi.object({
        title: Joi.string().length(3).max(100).required(),
    })

    const validationResult = schema.validate(movie);
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
module.exports.valiMovieGenre = validateMovie;
module.exports.valiCustomer = validateCustomer;
module.exports.valiGoldStatus = validateCustomerGoldStatus;


