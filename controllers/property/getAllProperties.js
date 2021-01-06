const Property = require('../../models/Property');

module.exports = {

  getAllProperties: async(req, res) => {

    let {
      sort,
      location,
      propertyType,
      furnish,
      contractLength,
      developer,
      bed,
      bathroom,
      amenities
    } = req.query
    console.log("AMN", req.query);
    console.log("AMN", req.query.amenities);
 
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
    if(propertyType) filterParam['propertyInfo.propertyType'] = propertyType;
    if(furnish) filterParam['propertyInfo.furnish'] = furnish;
    if(contractLength) filterParam['propertyInfo.contractLength'] = contractLength;
    if(developer) filterParam['propertyInfo.developer'] = developer;
    if(bed) filterParam['propertyInfo.bed'] = bed;
    if(bathroom) filterParam['propertyInfo.bathroom'] = bathroom;
    if(amenities && amenities.length > 0) {
      console.log("SPLIT",amenities[0].split(','));
      filterParam['propertyInfo.amenities'] = {$all: amenities[0].split(',')};
    }
    console.log(filterParam);
    // 'propertyInfo.amenities': { $all:[ 'Air Condition','Garage','CCTV' ]}
    try {
    
      const properties = await Property.find(
        Object.keys(filterParam).length !== 0 ? filterParam : null
      )
      .sort(sortParam);      
      console.log(properties)

      if(!properties) {
        return res.status(422).json({msg: 'No property result'})
      }

      res.json(properties);
    } catch (error) {
      res.status(500).send('Ooops something went wrong please try again later');
    }
  },
}