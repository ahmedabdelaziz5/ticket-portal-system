const app = require('express').Router();

const {
    getAllActiveTickets,
    sendAnswerOnTicket,
    deleteSpecificTicket,
    searchForTicket,
    getAllClosedTickets, 
} = require('../controller/ticket.controller'); // common controllers 

const {
    sendAnswerOnTicketValid,
} = require('../joi/ticket.validation'); // validation schemas 

const {
    GET_ALL_ACTIVE_TICKETS,
    DELETE_SPECIFIC_TICKET,
    SEARCH_FOR_TICKET,
    SEND_ANSWER_ON_TICKET,
    GET_ALL_CLOSED_TICKETS
} = require('../endPoints');

const { validateRequest } = require('../../../validator/req.validation'); // middleware to validate request body 
const isAuth = require('../../../Auth/isAuth'); // middleware to decode token and check auth 

app.get('/searchForTicket/:ticketId', isAuth(SEARCH_FOR_TICKET), searchForTicket);
app.get('/getAllActiveTickets', isAuth(GET_ALL_ACTIVE_TICKETS), getAllActiveTickets);
app.get('/getAllClosedTickets', isAuth(GET_ALL_CLOSED_TICKETS), getAllClosedTickets);
app.patch('/sendAnswerOnTicket/:ticketId', isAuth(SEND_ANSWER_ON_TICKET), validateRequest(sendAnswerOnTicketValid), sendAnswerOnTicket);
app.delete('/deleteSpecificTicket/:ticketId', isAuth(DELETE_SPECIFIC_TICKET), deleteSpecificTicket);


module.exports = app ; 