  
const Property = require('../../models/Property');

module.exports = {

  postAddProperty: async(req, res) => {

    const propertyFields = {
      user: req.user.id,
      propertyInfo: {
        ...req.body.propertyInfo
      },
      propertyContact: {
        ...req.body.propertyContact
      },
      propertyMedia: {
        ...req.body.propertyMedia
      }
    }

    try {  
      property = new Property(propertyFields);
      await property.save();
      res.status(200).json(property);
    } catch (error) {
      res.status(500).send('Ooops something went wrong try again later');
    }
  },
}