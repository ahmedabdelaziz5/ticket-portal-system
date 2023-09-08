const {
    
    GET_ALL_ACTIVE_TICKETS,
    SEND_ANSWER_ON_TICKET,

} = require('../../modules/ticket/endPoints') ;

const {

    CHANGE_TICKET_STATUS,
    JOIN_ROOM

} = require('../../modules/ticket/socketEvents')


module.exports = [

    GET_ALL_ACTIVE_TICKETS,
    SEND_ANSWER_ON_TICKET,
    CHANGE_TICKET_STATUS,
    JOIN_ROOM
    
] ;