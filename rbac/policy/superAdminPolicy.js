const {

    CREATE_ADMIN,
    DELETE_ADMIN,
    GET_ALL_ADMINS,

} = require("../../modules/admin/endPoints") ;

const {
    
    GET_ALL_ACTIVE_TICKETS,
    GET_ALL_CLOSED_TICKETS,
    DELETE_SPECIFIC_TICKET,
    SEARCH_FOR_TICKET

} = require('../../modules/ticket/endPoints') ;

const {
    MARK_AS_HIGH_PRIORITY,
    JOIN_ROOM
} = require('../../modules/ticket/socketEvents')


module.exports = [

    CREATE_ADMIN,
    DELETE_ADMIN,
    GET_ALL_ADMINS,
    GET_ALL_ACTIVE_TICKETS,
    GET_ALL_CLOSED_TICKETS,
    DELETE_SPECIFIC_TICKET,
    SEARCH_FOR_TICKET,
    MARK_AS_HIGH_PRIORITY,
    JOIN_ROOM
    
] ;