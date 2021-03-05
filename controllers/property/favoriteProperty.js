  
const Property = require('../../models/Property');
const User = require('../../models/User');

module.exports = { 

  postFavoriteProperty: async(req, res) => {
   
    let {
      propertyId,
      userId
    } = req.body


    try {  


      const userAlreadyLiked = await User.find({
        _id: userId,
        'local.likes':{
          $in: {
            likersUserId: userId,
            propertyLikedId: propertyId
          }
        }
      })


      if(userAlreadyLiked.length > 0){

        await User.update(
          { 
            _id: userId,
          },
          { 
            $pull: { 
            'local.likes':{ 
                likersUserId:  userId,
                propertyLikedId: propertyId
              }
            }
          },
          { new: true }
        );

        await Property.update(
          { 
            _id: propertyId 
          },
          { 
            $pull: { 
              likes:{
                likersUserId:  userId,
              }
            }
          },
          { new: true }
        );

      } else {

        await User.update(
          { 
            _id: userId,
          },
          { 
            $push: { 
            'local.likes':{ 
                likersUserId:  userId,
                propertyLikedId: propertyId
              }
            }
          },
          { new: true }
        ); 

        await Property.update(
          { 
            _id: propertyId 
          },
          { 
            $push: { 
              likes:{
                likersUserId:  userId,
              }
            }
          },
          { new: true }
        );
      }

      const user = await User.findOne({
        _id: userId
      })
      
      res.json({likes: user.local.likes});

    } catch (error) {
      res.status(500).send('Ooops something went wrong try again later');
    }
  },
}