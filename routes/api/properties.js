const router = require('express-promise-router')();
const {validateBody, schemas} = require('../../helper/routeHelper');
const passport = require('passport');
const AddPropertyController = require('../../controllers/property/addProperty');
const GetAddedPropertiesController = require('../../controllers/property/getAddedProperties');
const GetAllPropertiesController = require('../../controllers/property/getAllProperties');

// @route   POST api/users/add-property
// @desc    post a property to lease
// @access  private
router.post(
  '/add-property',
  // validateBody(schemas.signUpSchema),
  passport.authenticate('jwt',{session:false}),
  AddPropertyController.postAddProperty
);

// @route   GET api/added-properties
// @desc    get a property to lease
// @access  private
router.get(
  '/get-added-properties',
  passport.authenticate('jwt',{session:false}),
  GetAddedPropertiesController.getAddedProperties
);

router.get(
  '/get-all-properties',
  GetAllPropertiesController.getAllProperties
);


module.exports = router;