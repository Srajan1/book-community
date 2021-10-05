const nodemailer = require("nodemailer");
require('dotenv').config();
exports.sendEmail = async (mailId, subject, body) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const options = {
        from: process.env.EMAIL_ID,
        to: mailId,
        subject: subject,
        text: body
    };
    transporter.sendMail(options, (err, info) => {
        if(err){
            console.log(err);
        }
        console.log(info.response);
    })
}