  
const Property = require('../../models/Property');
const User = require('../../models/User');

module.exports = {

  postFavoriteProperty: async(req, res) => {
    console.log(req.body)
    let {
      propertyId,
      userId
    } = req.body

    try {  

      await Property.update(
        { 
          _id: propertyId ,
          'likes.likersUserId': {$ne: req.user.id}
        },
        { 
          $push: { 
            likes:{
              likersUserId:  userId
            }
          }
        },
        { new: true }
      );

      await User.update(
        { 
          user: userId,
          'likes.likersUserId': {$ne: userId},
          'likes.seriesLikedId': {$ne: propertyId},
        },
        { 
          $push: { 
          likes:{ 
              likersUserId:  userId,
              seriesLikedId: seriesId 
            }
          }
        },
        { new: true }
      );
      
      res.json({msg:"WORKING"});

      // return res.end()
      
    } catch (error) {
      res.status(500).send('Ooops something went wrong try again later');
    }
  },
}