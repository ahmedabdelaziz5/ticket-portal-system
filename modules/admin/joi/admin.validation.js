const Joi = require('joi');

module.exports = {

    createAdminValid: {

        body: Joi.object().required().keys({

            userName : Joi.string().required().messages({
                "string.empty" : "user name can not be empty",
                "any.required" : "user name is required"
            }),

            email : Joi.string().required().email().messages({
                "string.empty" : "email can not be empty",
                "any.required" : "email is required"
            }),

            password : Joi.string().required().messages({
                "string.empty" : "password can not be empty",
                "any.required" : "password is required"
            }),

        })
    },

}
