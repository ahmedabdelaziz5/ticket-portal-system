const app = require('express').Router();

const {
    signUp,
    sendIInquiry,
    getAllTickets,
} = require('../controller/user.controller'); // controllers 

const {
    signUpValid,
    sendIInquiryValid,
} = require('../joi/user.validation'); // validation schemas 

const {
    SIGN_UP,
    SEND_INQUIRY,
    GET_ALL_TICKETS
} = require('../endPoints');

const { validateRequest } = require('../../../validator/req.validation'); // middleware to validate request body 
const isAuth = require('../../../Auth/isAuth'); // middleware to decode token 

app.post('/signUp', isAuth(SIGN_UP),  validateRequest(signUpValid), signUp);
app.post('/sendIInquiry', isAuth(SEND_INQUIRY), validateRequest(sendIInquiryValid), sendIInquiry);
app.get('/getAllTickets',  isAuth(GET_ALL_TICKETS), getAllTickets);


module.exports = app ; 