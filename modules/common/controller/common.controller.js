const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require('../../user/model/user.model');
const { adminsModel } = require('../../admins/model/admins.model');  
const { hashPassword } = require('../../../helpers/passwordHashing');
const { generatePasswod } = require('../../../helpers/generatePassword');


exports.login = async (req, res) => {
    try {
        const { userName, password, role } = req.body;

        let user ; 
        if(role === "admin" || role === "superAdmin"){
            user = await adminsModel.findOne({ userName , role }).lean();
        }

        else if (role === "user"){
            user = await userModel.findOne({ userName , role }).lean();
        }

        else{
            return res.status(401).json({
                message : "Not Authorized !"
            })
        }

        if (!user) {
            return res.status(401).json({
                message: "you should register first "
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "incorrct password "
            });
        }

        let token = jwt.sign({ email: user.email, userName: user.userName, userId : user._id, role : user.role }, process.env.SECRET_TOKEN);
        delete user.password;
        return res.status(200).json({
            message: "success",
            token,
            user
        });

    }
    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    };
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let isFound = await userModel.findOne({ email }).lean().select("_id isVerified");

        if (!isFound) {
            return res.status(200).json({
                message: "you do not have an account yet , please register first "
            })
        }

        if (!isFound.isVerified) {
            return res.status(200).json({
                message: "you should verify your account first "
            })
        }

        let newPassword = generatePasswod(); // get new password 
        let result = await setUpMails(emailType = "resestPasswordMail", { email, newPassword })
            .then(async (result) => {
                if (result.statusCode == 400) {
                    return res.status(400).json({
                        message: "could not chang your password !"
                    })
                }
                let hashedPassword = await hashPassword(newPassword); // hash it 
                await userModel.updateOne({ email }, { password: hashedPassword });
                return res.status(200).json({
                    message: "success"
                })
            })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            err
        });
    }
}

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, password, confirmPassword } = req.body;

        const userMail = req.user.email;
        const user = await userModel.findOne({ email: userMail }).lean().select("email password userName");

        if (!user) {
            return res.status(400).json({
                message: "there is no such user !"
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                message: "password and confirm passowrd must be the same "
            })
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "wrong password, please type your correct password !"
            })
        }

        let newPassword = await hashPassword(password);
        await userModel.updateOne({ email: userMail, userName: user.userName }, { password: newPassword });
        res.status(200).json({
            message: "success"
        })

    }
    catch (err) {
        res.status(500).json({
            message: " error",
            err
        })
    }
}

exports.editProfile = async (req, res) => {
    try {
        const { userName, email, bussinesName, inventoryName, bussinesIndustry } = req.body;

        const userMail = req.user.email;
        let user = await userModel.findOneAndUpdate({ email: userMail }, {userName, email, bussinesName, inventoryName, bussinesIndustry}).lean().select("email userName");

        if (!user) {
            return res.status(400).json({
                message: "you should register first !"
            })
        }

        res.status(200).json({
            message: "success"
        })
    }

    catch (err) {
        res.status(500).json({
            message: "error",
            err
        })
    };
}