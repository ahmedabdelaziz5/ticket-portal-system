const Joi = require('joi') ; 

module.exports = {

    sendAnswerOnTicketValid : {
        body:Joi.object().required().keys({

            answer : Joi.string().required().messages({
                "string.empty" : "answer can not be empty",
                "any.required" : "answer is required"
            }),

        })
    },


}
