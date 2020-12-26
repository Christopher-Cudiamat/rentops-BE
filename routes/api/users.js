const router = require('express-promise-router')();
const {validateBody, schemas} = require('../../helper/routeHelper');
const UsersEmailVerificationController = require('../../controllers/users/emailVerification');
const UsersPostSignUpController = require('../../controllers/users/signUp');
const UsersPostSignInController = require('../../controllers/users/signIn');
const UsersPostSendOtpController = require('../../controllers/users/sendOtp');
const UsersPostOtpVerificationController = require('../../controllers/users/otpVerification');
const UsersPostChangePasswordController = require('../../controllers/users/changePassword');


// @route   POST api/users/sign-up
// @desc    post sign up a user
// @access  privater
router.post(
  '/sign-up',
  validateBody(schemas.signUpSchema),
  UsersPostSignUpController.postSignUp
);

//@route   POST api/users/email-verification
//@desc    Users emai is verified and save user to data base
//@access  Public
router.post(
  '/email-verification',
  UsersEmailVerificationController.emailVerification
);

// @route   POST api/users/sign-in
// @desc    post sign in a user
// @access  private
router.post(
  '/sign-in',
  validateBody(schemas.signInSchema),
  UsersPostSignInController.postSignIn
);

// @route   POST api/users/send-otp
// @desc    post send an otp to recover or change password 
// @access  public
router.post(
  '/send-otp',
  validateBody(schemas.sendOtpSchema),
  UsersPostSendOtpController.postSendOtp
);

// @route   POST api/users/verify-otp
// @desc    post send an otp to recover or change password 
// @access  private
router.post(
  '/verify-otp',
  UsersPostOtpVerificationController.postOtpVerification
);

// @route   POST api/users/change-password
// @desc    post change user passwird
// @access  private
router.post(
  '/change-password',
  validateBody(schemas.changePassword),
  UsersPostChangePasswordController.postChangePassword
);

module.exports = router;