const mongoose = require('mongoose');
const {setUpMails} = require('../../../mailServices/verificationMail');
const { ticketModel } = require('../model/ticket.model');


exports.getAllActiveTickets = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let data = await ticketModel.find({ ticketStatus: "active" }).sort({createdAt : -1 }).skip(skip).limit(limit).lean();
        let totalNumOfItems = await ticketModel.countDocuments({ ticketStatus: "active" });

        if (!data.length) {
            return res.status(200).json({
                message: "there is no active tickets yet !"
            })
        }

        return res.status(200).json({
            message: "success",
            data,
            page,
            numOfItems: data.length,
            totalNumOfItems: totalNumOfItems,
            numOfPages: Math.ceil(totalNumOfItems / limit)
        })
    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.getAllClosedTickets = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let data = await ticketModel.find({ ticketStatus: "closed" }).sort({createdAt : -1}).skip(skip).limit(limit).lean();
        let totalNumOfItems = await ticketModel.countDocuments({ ticketStatus: "closed" });

        if (!data.length) {
            return res.status(200).json({
                message: "there is no closed tickets yet !"
            })
        }

        return res.status(200).json({
            message: "success",
            data,
            page,
            numOfItems: data.length,
            totalNumOfItems: totalNumOfItems,
            numOfPages: Math.ceil(totalNumOfItems / limit)
        })
    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.deleteSpecificTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({
                message: "there is no such information !"
            })
        }

        let ticket = await ticketModel.findByIdAndDelete({ _id: ticketId }).select("_id").lean();

        if (!ticket) {
            return res.status(400).json({
                message: "there is no such ticket !"
            })
        }

        return res.status(200).json({
            message: "success"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.searchForTicket = async (req, res) => {
    try {
        const ticketId = req.params.ticketId;

        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({
                message: "there is no such information !"
            })
        }

        let ticket = await ticketModel.findOne({ _id: ticketId }).lean();

        if (!ticket) {
            return res.status(400).json({
                message: "there is no such ticket !"
            })
        }

        return res.status(200).json({
            message: "success",
            data : ticket
        })

    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    }
}

exports.sendAnswerOnTicket = async (req, res) => {
    try{
        const {answer} = req.body ;
        const {ticketId} = req.params ;

        if (!mongoose.Types.ObjectId.isValid(ticketId)) {
            return res.status(400).json({
                message: "there is no such information !"
            })
        }
        const queryFilter = '_id customerFirstName userEmail';
        let ticket = await ticketModel.findOneAndUpdate({_id : ticketId}, {$push : {ticketAnswers : {answer, createdAt : Date.now() }}}).select(queryFilter).lean();

        if(!ticket){
            return res.status(400).json({
                message : "there is no such ticket !"
            })
        }

        let result = await setUpMails("ticketAnswer", {ticketId : ticket._id, email : ticket.userEmail, userName : ticket.customerFirstName}) ;
        return res.status(result.statusCode).json({
            message : result.message
        })

    }
    catch(err){
        // console.log(err);
        return res.status(500).json({
            message : "error",
            err
        })
    }
}


