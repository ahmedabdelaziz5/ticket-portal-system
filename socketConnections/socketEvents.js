const {ticketModel} = require('../modules/ticket/model/ticket.model');

exports.establishSocketConnections = (io)=>{

    io.on("connection", async (socket) =>{

        socket.on("fireTest", () => {
            const token = socket.handshake.query.token;
            
        });

    })
}