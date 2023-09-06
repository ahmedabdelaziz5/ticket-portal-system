const Joi = require('joi') ; 

module.exports = {

    signUpValid : {
        
        body:Joi.object().required().keys({

            email : Joi.string().required().email().messages({
                "string.empty" : "email can not be empty",
                "any.required" : "email is required"
            }),

            userName : Joi.string().required().messages({
                "string.empty" : "user name can not be empty",
                "any.required" : "user name is required"
            }),

            password : Joi.string().required().messages({
                "string.empty" : "password can not be empty",
                "any.required" : "password is required"
            }),

            confirmPassword : Joi.string().required().messages({
                "string.empty" : "confirm password can not be empty",
                "any.required" : "confirm password is required"
            }),

            userFirstName : Joi.string().required().messages({
                "string.empty" : "first name can not be empty",
                "any.required" : "first name is required"
            }),

            userLastName : Joi.string().required().messages({
                "string.empty" : "last name can not be empty",
                "any.required" : "last name is required"
            }),

            mobileNumber : Joi.string().required().messages({
                "string.empty" : "mobile number can not be empty",
                "any.required" : "mobile number is required"
            })

        })
    }, 

    sendIInquiryValid : {
        body:Joi.object().required().keys({

            
        })
    },

    forgetPasswordValid : {
        body:Joi.object().required().keys({

            email : Joi.string().required().email().messages({
                "string.empty" : "email can not be empty",
                "any.required" : "email is required"
            }),
            
        })
    },

}
