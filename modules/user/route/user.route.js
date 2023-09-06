const app = require('express').Router();

const {
    signUp,
    sendIInquiry,
    getAllTickets,
    forgetPassword,
    verifyAccount
} = require('../controller/user.controller'); // user controllers 

const {
    signUpValid,
    sendIInquiryValid,
    forgetPasswordValid,
} = require('../joi/user.validation'); // validation schemas 

const {
    SEND_INQUIRY,
    GET_ALL_TICKETS,
} = require('../endPoints'); // user endPoints 

const { validateRequest } = require('../../../validator/req.validation'); // middleware to validate request body 
const isAuth = require('../../../Auth/isAuth'); // middleware to decode token 

app.post('/signUp', validateRequest(signUpValid), signUp);
app.post('/forgetPassword', validateRequest(forgetPasswordValid), forgetPassword);
app.post('/sendIInquiry', isAuth(SEND_INQUIRY), validateRequest(sendIInquiryValid), sendIInquiry);
app.get('/getAllTickets',  isAuth(GET_ALL_TICKETS), getAllTickets);
app.get('/verifyAccount', verifyAccount);


module.exports = app ; 