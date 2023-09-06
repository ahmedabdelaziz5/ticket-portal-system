module.exports = () => {
    return async (req, res, next) => {
        try {
            let {userName , userId , role} = req.user ; 
            let user ; 
            if(role === "admin" || role === "superAdmin"){
                user = await adminsModel.findOne({userId, userName, role }).lean();
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
            
            next(user);
        }
        catch (err) {
            res.status(500).json({
                message : "error",
                err
            })
        }

    }
};