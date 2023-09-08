# ticket-portal-system

#### This was my second task on my internship @Asterisc Technocrat 

#### I used these technologies :
![Static Badge](https://img.shields.io/badge/5.1.1-bcrypt-red)
![Static Badge](https://img.shields.io/badge/16.3.1-dotenv-yellow)
![Static Badge](https://img.shields.io/badge/4.18.2-express-blue)
![Static Badge](https://img.shields.io/badge/17.10.1-joi-green)
![Static Badge](https://img.shields.io/badge/9.0.2-jsonwebtoken-purple)
![Static Badge](https://img.shields.io/badge/7.0.4-mongoose-white)
![Static Badge](https://img.shields.io/badge/20.5.0-node-darkgreen)
![Static Badge](https://img.shields.io/badge/6.9.4-nodemailer-orange)
![Static Badge](https://img.shields.io/badge/3.0.1-nodemon-09c)
![Static Badge](https://img.shields.io/badge/socket.io-4.7.2-03E)
![Static Badge](https://img.shields.io/badge/easy_rbac-3.2.0-08A)


#### Ticket Portal is to enhance customer service relationships, promote customer retention, and drive sales growth. By this system, businesses can streamline their support processes, provide efficient assistance to customers and optimize their overall customer service experience

#### the term of inquiry has been mentioned as a ticket ( each inquiry is a ticket with a unique ID )

# Modules ( REST APIs ) -> 

# Common module :

#### Common endPoints : 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/login|POST|allow you to sign in your account
|/editProfile|PATCH|allow you to edit/update youe prodile data
|/changePassword|PATCH|allow you to update/change your password


# User module :

#### User schema : 

```JavaScript
{
    email  : { type : String, required : true } , 
    userFirstName : {type : String , required : true},
    userLastName : {type : String , required : true},
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    role : {type : String , default : "user" } ,
    mobileNumber : {type : String , required : true } ,
    isVerified : {type : Boolean, default : false },
}

```

#### User endPoints : 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/signUp|POST|allow customer to create an account 
|/forgetPassword|POST|allow customer to ask for a new password
|/sendTicket|POST|allow customer to send his inquiry to custimer service 
|/getUserTickets|GET|allow customer to get all his tickets 
|/verifyAccount|GET|allow customer to recive a verify his email after creating account


# Admin module :

#### Admins schema : 

```JavaScript
{
    email  : { type : String, required : true } , 
    userName  : { type : String, required : true  } , 
    password  : { type : String, required : true  } , 
    role : {type : String , required : true, default : "admin" } ,
}

```

#### Admin endPoints : 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/createAdmin|POST|allow superAdmin to create admins accounts 
|/deleteAdmin|DELETE|allow superAdmin to delete admins accounts  
|/getAllAdmins|GET|allow superAdmin to get all admins accounts  


# Ticket module :

#### Ticket schema : 

```JavaScript
{
    customerId  : { type : mongoose.Types.ObjectId, required : true } , 
    customerUserName : {type : String, required : true},
    customerFirstName : {type : String, required : true},
    customerLastName : {type : String, required : true},
    userEmail : {type: String , required : true},
    ticketContent  : { type : String, required : true } , 
    ticketAnswers  : [{
        answer : {type : String, required : true },
    }] , 
    isTaken : {type : Boolean, default : false},
    ticketStatus : { type : String, required : true, default : "active"} , // ( active , closed )
    isHighPriority  : { type : Boolean, default : false } , 
}

```

#### Ticket endPoints : 

|Endpoint|Method|Usage
|-------:|-----:|-----
|/searchForTicket/:ticketId|GET|allow superAdmin to serach for ticket with ticket ID 
|/getAllActiveTickets|GET|allow admins to get all active tickets in system 
|/getAllClosedTickets|GET|allow superAdmin to get all closed tickets in system 
|/sendAnswerOnTicket/:ticketId|PATCH|allow admin to send answer on the ticket 
|/deleteSpecificTicket/:ticketId|DELETE|allow superAdmin to delete a specific ticket  


# socket events :
|EventName|linstenOn|Usage
|-------:|-----:|-----
|joinRoom|none|allow all admins to be in the same room to hear events when one of them make any change to any ticket 
|markTicketStatus|marked|allow admnin change status (closed or taken by one of admins) of any ticket 
|markAsHighPriority|marked|allow superAdmin to mark this ticket as a high priority so that admins know that they needs to reply for it as fast as they can 




# notes :
#### you can find the roles in `enums folder`

#### each module has a file named `endPoints` which has all the edPoints refers to this module 

#### the authentication will be found in `rbac` folder which contains the policy of each role in the system

#### all the services is full production using `onrender` cloud services

#### you can run the project using the following command : `npm start`

