const router = require('express-promise-router')();
const {validateBody, schemas} = require('../../helper/routeHelper');
const passport = require('passport');
const AddPropertyController = require('../../controllers/property/addProperty');
const GetAddedPropertiesController = require('../../controllers/property/getAddedProperties');
const GetAllPropertiesController = require('../../controllers/property/getAllProperties');
const GetPropertyController = require('../../controllers/property/getProperty');
const FavoritePropertyController = require('../../controllers/property/favoriteProperty');

// @route   POST api/property/add-property
// @desc    post a property to lease
// @access  private
router.post(
  '/add-property',
  // validateBody(schemas.signUpSchema),
  passport.authenticate('jwt',{session:false}),
  AddPropertyController.postAddProperty
);

// @route   POST api/property/favorite-property
// @desc    post add a favorite property
// @access  private
router.post(
  '/favorite-property',
  passport.authenticate('jwt',{session:false}),
  FavoritePropertyController.postFavoriteProperty
);

// @route   GET api/property/added-properties
// @desc    get a property to lease
// @access  private
router.get(
  '/get-added-properties',
  passport.authenticate('jwt',{session:false}),
  GetAddedPropertiesController.getAddedProperties
);

// @route   GET api/property/get-all-properties
// @desc    get list of properties 
// @access  public
router.get(
  '/get-all-properties',
  GetAllPropertiesController.getAllProperties
);

// @route   GET api/property/get-property
// @desc    get a property 
// @access  public
router.get(
  '/get-property',
  GetPropertyController.getProperty
);


module.exports = router;