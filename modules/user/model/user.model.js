const mongoose = require('mongoose') ; 

const userSchema = new mongoose.Schema({
    email  : { type : String, required : true } , 
    userFirstName : {type : String , required : true},
    userLastName : {type : String , required : true},
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    role : {type : String , default : "user" } ,
    mobileNumber : {type : String , required : true } ,
    currentTicketId : {type : String , default : ""},
    isVerified : {type : Boolean, default : false },
});

exports.userModel = mongoose.model('customers', userSchema) ;
