const mongoose = require('mongoose') ; 

const userSchema = new mongoose.Schema({
    email  : { type : String, required : true } , 
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    role : {type : String , required : true, default : "admin" } ,
});

exports.userModel = mongoose.model('customers', userSchema) ;
