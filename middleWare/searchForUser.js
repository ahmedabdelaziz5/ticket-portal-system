const {adminsModel} = require('../modules/admin/model/admins.model');
const {userModel} = require('../modules/user/model/user.model');

module.exports = () => {
    return async (req, res, next) => {
        try {
            let {userName , userId , role} = req.user ; 
            let user ; 

            if(role === "admin" || role === "superAdmin"){
                user = await adminsModel.find({_id : userId, userName, role }).lean();
            }
    
            else if (role === "user"){
                user = await userModel.findOne({userId, userName, role }).lean();
            }
    
            else{
                return res.status(401).json({
                    message : "Not Authorized !"
                })
            }    

            if(!user){
                return res.status(400).json({
                    message : "there is no such user !"
                })
            }
            req.tmp = user ;
            next();
        }
        catch (err) {
            res.status(500).json({
                message : "error",
                err
            })
        }

    }
};