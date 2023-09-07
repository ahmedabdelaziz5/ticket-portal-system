const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require('../../user/model/user.model');
const { adminsModel } = require('../../admin/model/admins.model');
const { hashPassword } = require('../../../helpers/passwordHashing');


exports.login = async (req, res) => {
    try {
        const { userName, password, role } = req.body;

        let user;
        if (role === "admin" || role === "superAdmin") {
            user = await adminsModel.findOne({ userName, role }).lean();
        }

        else if (role === "user") {
            user = await userModel.findOne({ userName, role }).lean();

            if (!user.isVerified) {
                return res.status(200).json({
                    message: "you should verify your email first !"
                })
            }

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

        let token = jwt.sign({ email: user.email, userName: user.userName, userId: user._id, role: user.role }, process.env.SECRET_TOKEN);
        delete user.password;
        return res.status(200).json({
            message: "success",
            token,
            user
        });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "error",
            err
        })
    };
}

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, password, confirmPassword } = req.body;
        const user = req.tmp[0];

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
        if (user.role === "admin" || user.role === "superAdmin") {
            await adminsModel.updateOne({ _id: user._id, userName: user.userName, role: user.role }, { password: newPassword });
        }
        else {
            await userModel.updateOne({ _id: user._id, userName: user.userName, role: user.role }, { password: newPassword });
        }
        return res.status(200).json({
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
        const { userName, email } = req.body;

        const user = req.tmp[0];

        if (!user) {
            return res.status(400).json({
                message: "you should register first !"
            })
        }

        if (user.role === "admin" || user.role === "superAdmin") {
            await adminsModel.updateOne({ _id: user._id, role: user.role }, { userName, email });
        }

        else {
            await userModel.updateOne({ _id: user._id, role: user.role }, { userName, email });
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
    };
}