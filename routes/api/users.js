const router = require('express-promise-router')();
const {validateBody, schemas} = require('../../helper/routeHelper');
const UsersEmailVerificationController = require('../../controllers/users/emailVerification');
const UsersPostSignUpController = require('../../controllers/users/signUp');


// @route   GET api/users/sign-up
// @desc    post sign up a user
// @access  privater
router.post(
  '/sign-up',
  validateBody(schemas.userAuthSchema),
  UsersPostSignUpController.postSignUp
);

//@route   POST api/users
//@desc    Users emai is verified and save user to data base
//@access  Public
router.post(
  '/email-verification',
  UsersEmailVerificationController.emailVerification
);

module.exports = router;