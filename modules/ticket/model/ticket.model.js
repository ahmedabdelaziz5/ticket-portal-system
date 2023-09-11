const mongoose = require('mongoose') ; 

const ticketSchema = new mongoose.Schema({
    customerId  : { type : mongoose.Types.ObjectId, required : true } , 
    customerUserName : {type : String, required : true},
    customerFirstName : {type : String, required : true},
    customerLastName : {type : String, required : true},
    userEmail : {type: String , required : true},
    ticketContent  : { type : String, required : true } , 
    ticketAnswers  : [{
        answer : {type : String, required : true },
        createdAt : {type : Date, required : true },
    }] , 
    isTaken : {type : Boolean, default : false},
    ticketStatus : { type : String, required : true, default : "active"} , // ( active , closed )
    isHighPriority  : { type : Boolean, default : false } , 
    createdAt : {type : Date , required : true} ,
});


ticketSchema.index({customerId : -1 });
ticketSchema.index( {ticketStatus : -1});

const ticketModel = mongoose.model('ticket', ticketSchema) ;

ticketModel.createIndexes(); 

module.exports = {ticketModel} ;


