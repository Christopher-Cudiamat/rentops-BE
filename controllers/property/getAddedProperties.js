const Property = require('../../models/Property');

module.exports = {
  getAddedProperties: async(req, res) => {
    try {
      const properties = await Property.find({user: req.user.id});

      if(!properties) {
        return res.status(422).json({msg: 'No property result'})
      }

      res.json(properties);
    } catch (error) {
      res.status(500).send('Ooops something went wrong please try again later');
    }
  },
}