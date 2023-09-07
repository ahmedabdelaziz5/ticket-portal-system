const mongoose = require('mongoose') ; 

const adminsSchema = new mongoose.Schema({
    email  : { type : String, required : true } , 
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    role : {type : String , required : true, default : "admin" } ,
});

exports.adminsModel = mongoose.model('admin', adminsSchema) ;


