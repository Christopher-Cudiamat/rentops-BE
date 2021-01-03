const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  propertyInfo: {
    location:{
      type: String
    },
    price: {
      type: Number
    },
    size: {
      type: Number,
    },
    propertyType: {
      type: String,
    },
    contractLength: {
      type: String,
    },
    furnish: {
      type: String,
    },
    bed: {
      type: String,
    },
    bathroom: {
      type: String,
    },
    developer: {
      type: String,
    },
    amenities: [{
      type: String
    }]
  },
  propertyContact: {
    firstName:{
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
  propertyMedia: {
    propertyPhoto: [{
      type: String
    }],
    galleryPhotos : [{
      dataURL: String,
      file:  Object
    }]
  }
  
},{
  timestamps: true
});


module.exports = Property = mongoose.model('property', PropertySchema);