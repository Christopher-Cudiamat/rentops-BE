const JWT = require('jsonwebtoken');
const config = require('config');

module.exports = {

  postOtpVerification: async(req, res) => {
  
    const {generatedOtp,userOtp}  = req.body;
    try {
      if(generatedOtp) {
        JWT.verify(generatedOtp,config.get('jwtSecret'),(err,decodedToken) => {
          const {otpCode} = decodedToken.data;
          if(otpCode.toString() !== userOtp || err) return res.status(422).json({error:'Invalid verification code.'});
  
          return res.status(200).json({message: "Success"});
        });
      }
    } catch {
      return res.status(500).json({error: 'Oops something went wrong please try again later'});
    }
  }
}