const db = require("../../../models/index");
const { apiResponse } = require("../../helper/apiResponse");
const message = require("./message");
const { sendEmail } = require("../../helper/sendEmail");
const bcryptjs = require("bcryptjs");
const otpGenerator = require("otp-generator");

exports.signUp = async function (req, res) {
  const data = req.body;
  try {
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    data.otp = otp;
    const salt = await bcryptjs.genSalt(10);
    data.password = await bcryptjs.hash(data.password, salt);
    const user = await db.User.create(data);
    sendEmail(data.email, "OTP for book community", `${otp} is you otp`);
    res.status(200).send(apiResponse(1, message.USER_CREATED, { User: user }));
  } catch (err) {
    res
      .status(500)
      .send(apiResponse(0, message.INTERNAL_ERROR, { error: err.errors[0].message }));
  }
};

exports.otpVerification = async function(req, res) {
    const data = req.body;
    try{
      const user = await db.User.findOne({where: {email: data.email}});
      const {isVerified} = user.dataValues;
      if(isVerified === 1){
        res
        .status(422)
        .send(apiResponse(0, message.ALREADY_VERIFIED, { error: 'You can go and sign in directly, no need to sign in' }));
      }else{
        const {otp} = user.dataValues;
        if(data.otp === otp){
          const updation = {isVerified: 1, otp: ""};
          await db.User.update(updation, {where: {email: data.email}});
          res.status(200).send(apiResponse(1, message.USER_CREATED, { User: 'user is now verified' }));
        }else{
          res
          .status(401)
          .send(apiResponse(0, message.INVALID_OTP, { error: 'Please enter the correct OTP' }));  
        }
      }
    }catch(err){
      res
      .status(500)
      .send(apiResponse(0, message.INTERNAL_ERROR, { error: err }));
    }
}