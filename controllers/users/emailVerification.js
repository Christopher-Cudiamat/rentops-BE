const JWT = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');

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
  emailVerification: async(req, res) => {
    
    const {token,insertedVerificationCode}  = req.body;

    if(token) {

      JWT.verify(token,config.get('jwtSecret'),(err,decodedToken) => {

        if(err) res.status(400).json({error:'Incorrect or Expired link.'});
   
        const {
          firstName,
          LastName,
          email,
          password,
          avatar,
          verificationCode
        } = decodedToken.data;

        if(insertedVerificationCode !== verificationCode.toString()){
          return res.status(422).json({error:'Invalid verification code.'});
        }

        const newUser = new User({
          method: "local",
          local:{
            firstName,
            lastName,
            email,
            password,
            avatar
          }
        }); 

        newUser.save();

        const newToken = signToken(newUser);

        res.status(200).json({newToken,email});

      });
    }
  }
}