const jwt = require('jsonwebtoken');
const { userModel } = require('../../user/model/user.model');
const { setUpMails } = require('../../../mailServices/verificationMail');
const { hashPassword } = require('../../../helpers/passwordHashing');
const {generatePasswod} = require('../../../helpers/generatePassword');

exports.signUp = async (req, res) => {
    try {
        const
            {
                userName, email, password, confirmPassword,
                userFirstName, userLastName, mobileNumber
            } = req.body;

        let user = await userModel.findOne({ $or: [{ email }, { userName }] }).lean().select("_id");

        if (user) {
            return res.status(400).json({
                message: "this account already exsist !"
            })
        }

        if (password != confirmPassword) {
            return res.status(400).json({
                message: "password and confirm passwrod must be the same"
            })
        }

        let result;
        let newPassword = await hashPassword(password);

        await userModel.create({
            userName, email, password: newPassword, confirmPassword,
            userFirstName, userLastName, mobileNumber
        })
            .then(async () => {
                result = await setUpMails(emailType = "verificationMail", { email });
            })

        return res.status(result.statusCode).json({
            message: result.message
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
        await setUpMails(emailType = "resestPasswordMail", { email, newPassword })
            .then(async (result) => {

                if (result.statusCode == 400) {
                    return res.status(400).json({
                        message: "could not chang your password !"
                    })
                }

                let hashedPassword = await hashPassword(newPassword); // hash it 
                await userModel.updateOne({ email }, { password: hashedPassword });
                return res.status(result.statusCode).json({
                    message: result.message
                })
            })
    }
    catch (err) {
        console.log(err) ;
        return res.status(500).json({
            message: "error",
            err
        });
    }

}

exports.verifyAccount = async (req, res) => {
    let { token } = req.query;
    let decodedMail = jwt.verify(token, process.env.SECRET_TOKEN);
    let user = await userModel.findOneAndUpdate({ email: decodedMail.userMail }, { isVerified: true });
    if (!user) {
        return res.send('there is no such email , please register first');
    }
    return res.send("your account was verified successfully !")
}

exports.sendIInquiry = async (req, res) => {


}

exports.getAllTickets = async (req, res) => {


}