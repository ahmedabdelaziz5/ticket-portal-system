const Joi = require('joi') ; 

module.exports = {

    signUpValid : {
        
        
        body:Joi.object().required().keys({

        })
    }, 

    sendIInquiryValid : {
        body:Joi.object().required().keys({

            
        })
    },

}
