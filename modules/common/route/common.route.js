const app = require('express').Router();

const {
    login,
    forgetPassword,
    editProfile,
    changePassword,
} = require('../controller/common.controller'); // common controllers 

const {
    loginValid,
    forgetPasswordValid,
    editProfileValid,
    changePasswordValid
} = require('../joi/common.validation'); // validation schemas 

const { validateRequest } = require('../../../validator/req.validation'); // middleware to validate request body 
const decodeToken = require('../../../Auth/tokenDecoding'); // middleware to decode token 
const getUser = require('../../../middleWare/searchForUser'); // middleware to search for user 

app.post('/login', validateRequest(loginValid), login);
app.post('/forgetPassword', validateRequest(forgetPasswordValid), forgetPassword);
app.patch('/editProfile', decodeToken(), validateRequest(editProfileValid), editProfile);
app.patch('/changePassword', decodeToken(), validateRequest(changePasswordValid), getUser(), changePassword);


module.exports = app ; 