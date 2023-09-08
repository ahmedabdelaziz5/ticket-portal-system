// manage all socket events 

const mongoose  = require('mongoose');
const { ticketModel } = require('../modules/ticket/model/ticket.model');
const { socketAuth } = require('../Auth/socketAuth');

const {
    JOIN_ROOM,
    CHANGE_TICKET_STATUS,
    MARK_AS_HIGH_PRIORITY,
} = require('../modules/ticket/socketEvents');


exports.establishSocketConnections = (io) => {

    io.on("connection", async (socket) => {

        // make any ( admin or superAdmin ) join the room once they loged in the system
        socket.on("joinRoom", async (data, ack) => {

            try {

                const token = socket.handshake.query.token;
                let isAllowed = await socketAuth(token, JOIN_ROOM);

                if (!isAllowed) {
                    return ack({ message: "Not Authorized !" })
                }

                socket.join("adminsRoom");
                return ack({ message: "success" })

            }
            catch (err) {
                console.log(err);
            }

        });

        // change the ticket status ( closed or taken by one of admins ) 
        socket.on("markTicketStatus", async(data, ack)=>{

            const token = socket.handshake.query.token;
            const ticketId = data.ticketId , status = data.status; 
            let isAllowed = await socketAuth(token, CHANGE_TICKET_STATUS);

            if (!isAllowed) {
                return ack({ message: "Not Authorized !" })
            }

            if(!mongoose.Types.ObjectId.isValid(ticketId)){
                return ack({ message : "there is no such information !"})
            }

            let ticket , ticketStatus ; 
            if(status === "markAsTaken"){
                ticketStatus = "taken";
                ticket = await ticketModel.findByIdAndUpdate({_id : ticketId}, {isTaken : true}).select("_id").lean();
            }

            else if (status === "markAsClosed"){
                ticketStatus = "closed";
                ticket = await ticketModel.findByIdAndUpdate({_id : ticketId}, {ticketStatus : "closed"}).select("_id").lean();
            }


            if(!ticket){
                return ack({message : "there is no ticket !"})
            }

            io.to("adminsRoom").emit("marked", { ticketId : ticket._id , ticketStatus : ticketStatus });
            ack({ ticketId : ticket._id , ticketStatus : ticketStatus });

        })

        // superAdmin mark the ticket as a high priority one 
        socket.on("markAsHighPriority", async(data, ack)=>{

            const token = socket.handshake.query.token;
            const ticketId = data.ticketId ; 
            let isAllowed = await socketAuth(token, MARK_AS_HIGH_PRIORITY);

            if (!isAllowed) {
                return ack({ message: "Not Authorized !" })
            }

            if(!mongoose.Types.ObjectId.isValid(ticketId)){
                return ack({ message : "there is no such information !"})
            }

            let ticket = await ticketModel.findByIdAndUpdate({_id : ticketId}, {isHighPriority : true}).select("_id").lean();

            if(!ticket){
                return ack({message : "there is no ticket !"})
            }

            io.to("adminsRoom").emit("marked", { ticketId : ticket._id , ticketStatus : "high priority" });
            ack({ ticketId : ticket._id , ticketStatus : "high priority" });

        })

    })
}