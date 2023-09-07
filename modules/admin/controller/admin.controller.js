const { adminsModel } = require('../../admin/model/admins.model');
const { hashPassword } = require('../../../helpers/passwordHashing');
const mongoose = require('mongoose');

exports.createAdmin = async (req, res) => {
    try {
        const {email, userName, password} = req.body ;

        let user = await adminsModel.findOne({ $or: [{ email }, { userName }] }).lean().select("_id");

        if(user){
            return res.status(400).json({
                message : "user already exsist !"
            })
        }

        let newPassword = await hashPassword(password); 
        await adminsModel.create({email, userName, password : newPassword}).then(()=>{
            return res.status(200).json({
                message : "success"
            })
        })

    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "error",
            err
        })
    };
}

exports.deleteAdmin = async (req, res) => {
    try {
        const {adminId} = req.body ;

        if (!mongoose.Types.ObjectId.isValid(adminId)) {
            return res.status(400).json({
                message: "there is no such admin !"
            });
        } 

        let admin = await adminsModel.findOneAndDelete({_id : adminId, role : "admin"}) ;
        
        if(!admin){
            return res.status(400).json({
                message : "there is no such information !"
            })
        }

        return res.status(200).json({
            message : "success"
        }) 

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "error",
            err
        });
    }

}

exports.getAllAdmins = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt(req.query.limit) || 10 ;
        const skip = (page-1)*limit ;

        let data = await adminsModel.find({role : "admin"}).skip(skip).limit(limit).lean() ;
        let totalNumOfItems = await adminsModel.countDocuments({role : "admin"});

        if(!data.length) {
            return res.status(200).json({
                message : "there is no admins yet !"
            })
        }

        return res.status(200).json({
            message : "success",
            data,
            page ,
            numOfItems: data.length,
            totalNumOfItems: totalNumOfItems,
            numOfPages: Math.ceil(totalNumOfItems / limit)
        })

    }
    catch(err){
        res.status(500).json({
            message : "error",
            err
        })
    }
}

