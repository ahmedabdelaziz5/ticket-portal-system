// function to send email depends on type of mail it recives from controller 
  
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.setUpMails = async(emailType, emailCredentials) => {

  let mailOptions = {
    from: '2nd task',
    to: `${emailCredentials.email}`,
  };

  if (emailType === "verificationMail") {
    let token = jwt.sign({ userMail: emailCredentials.email }, process.env.SECRET_TOKEN, { expiresIn: `1d` });
    mailOptions['subject'] = "verify your account";
    mailOptions['text'] = `please click the verify button to verify your account`
    mailOptions['html'] = `<b> <a href= 'https://ticket-portal.onrender.com/verifyAccount?token=${token}' target= '_blank'>verify</b>`;
  }

  else if (emailType === "resestPasswordMail") {
    mailOptions['subject'] = "forget passowrd access";
    mailOptions['text'] = `
    your email is : "${emailCredentials.email}"
    your new password is : "${emailCredentials.newPassword}" `
  }

  else if (emailType === "ticketAnswer"){
    mailOptions['subject'] = `update for ticket ID : #${emailCredentials.ticketId}`;
    mailOptions['text'] = `Dear Mr.${emailCredentials.userName} ,
    
your inquiry has been answered kindly check your account 

regards.
    `
  }

  let result = await sendEmails(mailOptions);
  return result;

}

const sendEmails = async (mailOptions) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.MAIL}`,
      pass: `${process.env.PASS}`
    },
  });

  let obj = {
    statusCode: 200,
    message: "success and email was sent !"
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      obj.statusCode = 400,
      obj.message = "could not send your email"
    }
  })

  return obj;
}