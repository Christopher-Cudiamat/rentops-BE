const JWT = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const gravatar = require('gravatar');
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

  postSignUp: async(req, res,) => {

    let {
      firstName,
      lastName,
      email,
      password,
      termsAndCondition
    } = req.body;
    console.log(req.body)
    //Generate random verification code
    //BUG- figure out why email is not sending
    // let verificationCode = Math.floor(Math.random() * 100000) + 1;
    let verificationCode = 12345;

    const emailExistInLocalUser = await User.findOne({"local.email":email});

    if(emailExistInLocalUser) res.status(422).json({error: 'Email is already in use'});

    const avatar = gravatar.url(email,{
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    
    const token = signToken({
      firstName,
      lastName,
      email,
      password,
      avatar,
      termsAndCondition,
      verificationCode
    });

    const transporter = mailer.createTransport({
      service: 'gmail',
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
      viewPath: viewPath,
      extName: '.handlebars',
    }));

    let body =  {
      from: email,
      to: email,
      subject: 'Rentops account activation code',
      attachments: [{
        filename: 'emailverification.jpg',
        path: imageBannerPath,
        cid: 'banner'
      }],
      template: 'emailverification',
      context: {
        verificationCode,
        firstName,
      }
    }
 
    transporter.sendMail(body,(err) => {
      
      if(err) {false};
      
      return res.json({
        token,
        message: `Hi! ${firstName}, we sent you a verification code at ${email}. Please check your inbox to and continue signing up.`
      });
    });
  }

}