const app = require('express').Router();

const {
    login,
    editProfile,
    changePassword,
} = require('../controller/common.controller'); // common controllers 

const {
    loginValid,
    editProfileValid,
    changePasswordValid
} = require('../joi/common.validation'); // validation schemas 

const { validateRequest } = require('../../../validator/req.validation'); // middleware to validate request body 
const decodeToken = require('../../../Auth/tokenDecoding'); // middleware to decode token 
const getUser = require('../../../middleWare/searchForUser'); // middleware to search for user and filter them into based on roles 

app.post('/login', validateRequest(loginValid), login);
app.patch('/editProfile', decodeToken(), validateRequest(editProfileValid), getUser(), editProfile);
app.patch('/changePassword', decodeToken(), validateRequest(changePasswordValid), getUser(), changePassword);


module.exports = app ; 