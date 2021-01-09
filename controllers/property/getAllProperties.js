const Property = require('../../models/Property');

module.exports = {

  getAllProperties: async(req, res) => {

    let {
      sort,
      location,
      propertyType,
      furnish,
      contractLength,
      bed,
      bathroom,
      amenities,
      priceMin,
      priceMax,
      sizeMax,
      sizeMin
    } = req.query
 
    var sortParam = {};
    var filterParam = {};

    switch(sort) {
      case 'newest':
        sortParam = {createdAt: 'desc'}
        break;
      case 'oldest':
        sortParam = {createdAt: 'asc'}
        break;
      case 'biggest':
        sortParam = {'propertyInfo.size': 'desc'}
        break;
      case 'smallest':
        sortParam = {'propertyInfo.size': 'asc'}
        break;
      case 'expensive':
        sortParam = {'propertyInfo.price': 'desc'}
        break;
      case 'cheapest':
        sortParam = {'propertyInfo.price': 'asc'}
        break;
      default:
        sortParam = {createdAt: 'desc'}
    }
   
    if(location) filterParam['propertyInfo.location'] = location;

    if(propertyType && propertyType.length > 0) {
      filterParam['propertyInfo.propertyType'] = {$in: propertyType[0].split(',')};
    }

    if(furnish && furnish.length > 0) {
      filterParam['propertyInfo.furnish'] = {$in: furnish[0].split(',')};
    }

    if(contractLength && contractLength.length > 0) {
      filterParam['propertyInfo.contractLength'] = {$in: contractLength[0].split(',')};
    }

    if(bed) filterParam['propertyInfo.bed'] = bed;

    if(bathroom) filterParam['propertyInfo.bathroom'] = bathroom;

    if(amenities && amenities.length > 0) {
      filterParam['propertyInfo.amenities'] = {$all: amenities[0].split(',')};
    }

    if(priceMax && priceMin) {
      filterParam['propertyInfo.price'] = {
        $gte :  priceMin,
        $lte :  priceMax
      }
    }

    if(sizeMax && sizeMin) {
      filterParam['propertyInfo.size'] = {
        $gte :  sizeMin,
        $lte :  sizeMax
      }
    }

    try {
    
      const properties = await Property.find(
        Object.keys(filterParam).length !== 0 ? filterParam : null
      )
      .sort(sortParam);      

      if(!properties) {
        return res.status(422).json({msg: 'No property result'})
      }

      res.json(properties);
    } catch (error) {
      res.status(500).send('Ooops something went wrong please try again later');
    }
  },
}