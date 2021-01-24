const router = require('express-promise-router')();
const {validateBody, schemas} = require('../../helper/routeHelper');
const passport = require('passport');
const AddPropertyController = require('../../controllers/property/addProperty');
const GetAddedPropertiesController = require('../../controllers/property/getAddedProperties');
const GetAllPropertiesController = require('../../controllers/property/getAllProperties');
const GetPropertyController = require('../../controllers/property/getProperty');

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

// @route   GET api/get-all-properties
// @desc    get list of properties 
// @access  public
router.get(
  '/get-all-properties',
  GetAllPropertiesController.getAllProperties
);

// @route   GET api/get-property
// @desc    get a property 
// @access  public
router.get(
  '/get-property',
  GetPropertyController.getProperty
);


module.exports = router;