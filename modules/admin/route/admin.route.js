const app = require('express').Router();

const {
    createAdmin,
    deleteAdmin,
    getAllAdmins,
} = require('../controller/admin.controller'); // user controllers 

const {
    createAdminValid,
} = require('../joi/admin.validation'); // validation schemas 

const {
    CREATE_ADMIN,
    DELETE_ADMIN,
    GET_ALL_ADMINS
} = require('../endPoints'); // user endPoints 

const { validateRequest } = require('../../../validator/req.validation'); // middleware to validate request body 
const isAuth = require('../../../Auth/isAuth'); // middleware to decode token 

app.post('/createAdmin', isAuth(CREATE_ADMIN), validateRequest(createAdminValid), createAdmin);
app.delete('/deleteAdmin', isAuth(DELETE_ADMIN), deleteAdmin);
app.get('/getAllAdmins', isAuth(GET_ALL_ADMINS), getAllAdmins);


module.exports = app ; 