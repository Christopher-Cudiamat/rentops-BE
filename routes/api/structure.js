const router = require('express-promise-router')();
const StructureController = require('../../controllers/structure/structure');


// @route   GET api/structure/navigation
// @desc    get site navigation strucure
// @access  Public
router.get(
  '/navigation',
  StructureController.getNavigationStructure
);




module.exports = router;