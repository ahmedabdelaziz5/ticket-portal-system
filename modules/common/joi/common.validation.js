const Joi = require('joi') ; 

module.exports = {

    loginValid : {
        body:Joi.object().required().keys({

            userName : Joi.string().required().messages({
                "string.empty" : "user name can not be empty",
                "any.required" : "user name is required"
            }),

            password : Joi.string().required().messages({
                "string.empty" : "password can not be empty",
                "any.required" : "password is required"
            }),

            role : Joi.string().required().messages({
                "string.empty" : "role can not be empty",
                "any.required" : "role is required"
            }),

        })
    },

    editProfileValid : {
        body:Joi.object().required().keys({

            email : Joi.string().email(),

            userName : Joi.string(),

        })
    },

    changePasswordValid : {
        body:Joi.object().required().keys({

            oldPassword : Joi.string().required().messages({
                "string.empty" : "old password can not be empty",
                "any.required" : "old password is required"
            }),

            password : Joi.string().required().messages({
                "string.empty" : "password can not be empty",
                "any.required" : "password is required"
            }),

            confirmPassword : Joi.string().required().messages({
                "string.empty" : "confirm password can not be empty",
                "any.required" : "confirm password is required"
            }),

        })
    },

}
