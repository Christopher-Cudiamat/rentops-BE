const Property = require('../../models/Property');

module.exports = {

  getProperty: async(req, res) => {

    let {propertyId} = req.query

    try {
    
      const property = await Property.find({_id: propertyId})
      
      if(!property) {
        return res.status(422).json({msg: 'No property result'})
      }

      res.json(property[0]);
    } catch (error) {
      res.status(500).send('Ooops something went wrong please try again later');
    }
  },
}