const JWT = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const mailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require('path');


viewPath = path.resolve("views/emails"); 
imageBannerPath = path.resolve("views/emails/images/emailverification.jpg"); 

const signToken = (user) => {
  return JWT.sign({
    iss: 'Rentops',
    data: user,
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  },config.get('jwtSecret'));
};

module.exports = {

  postSendOtp: async(req, res) => {
      
    const {firstName,lastName,email}  = req.body;
    let otpCode =  Math.floor(Math.random() * 100000) + 1;

    try {
      const user = await User.findOne({
        "local.firstName": firstName,
        "local.lastName": lastName,
        "local.email": email
      });

      if(!user) res.status(422).json({error: 'Invalid Credentials'});

      const generatedOtp = signToken({
        otpCode
      });

      const transporter = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth:{
            user: config.get('mailer'),
            pass: config.get('password')
        },
      });

      transporter.use('compile', hbs({
        viewEngine: {
            extName: '.handlebars',
            partialsDir: viewPath,
            layoutsDir: viewPath,
            defaultLayout: false,
            },
            viewPath:  viewPath,
            extName: '.handlebars',

      }));

      let body =  {
        from: "www.rentops.com",
        to: email,
        subject: 'Rentops change password',
        template: 'otpverification',
        context: {
          otpCode,
          path: imageBannerPath,
          firstName,
        }
      }

      transporter.sendMail(body,(err) => {
        if(err) return false;
        
        return res.json({
          generatedOtp,
          message: 'Hi! we sent you an OTP please check your email and copy the one time password to continue recover your password'
        });
      });
    } catch (error) {
      res.status(500).json({error: 'Oops something went wrong please try again later'});
    }
  }
}