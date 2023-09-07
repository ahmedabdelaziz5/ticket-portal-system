const {
    
    GET_ALL_ACTIVE_TICKETS,
    SEND_ANSWER_ON_TICKET,

} = require('../../modules/ticket/endPoints') ;

const {

    REPLY_ON_TICKET,
    CLOSE_TICKET,

} = require('../../modules/ticket/socketEvents')


module.exports = [


    GET_ALL_ACTIVE_TICKETS,
    SEND_ANSWER_ON_TICKET,
    REPLY_ON_TICKET,
    CLOSE_TICKET,
    
] ;