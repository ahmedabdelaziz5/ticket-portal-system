const app = require('express').Router();

const {
    signUp,
    sendTicket,
    forgetPassword,
    verifyAccount
} = require('../controller/user.controller'); // user controllers 

const {
    signUpValid,
    sendTicketValid,
    forgetPasswordValid,
} = require('../joi/user.validation'); // validation schemas 

const {
    SEND_TICKET,
} = require('../endPoints'); // user endPoints 

const { validateRequest } = require('../../../validator/req.validation'); // middleware to validate request body 
const isAuth = require('../../../Auth/isAuth'); // middleware to decode token 

app.post('/signUp', validateRequest(signUpValid), signUp);
app.post('/forgetPassword', validateRequest(forgetPasswordValid), forgetPassword);
app.post('/sendTicket', isAuth(SEND_TICKET), validateRequest(sendTicketValid), sendTicket);
app.get('/verifyAccount', verifyAccount);


module.exports = app ; 