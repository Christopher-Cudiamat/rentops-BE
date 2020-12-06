const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['local','google','facebook'],
    required: true
  },
  local: {
    firstName:{
      type: String,
    },
    lastName:{
      type: String,
    },
    email: {
      type: String,
      lowercaSe: true,
    },
    password: {
      type: String,
    },
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercaSe: true,
    }
  },
},{
  timestamps: true
});


UserSchema.pre('save', async function(next){
  try {

    if(this.method !== 'local') {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = bcrypt.hash(await this.local.password, salt);
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
})

UserSchema.methods.isValidPassword = async function(newPassword){
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = User = mongoose.model('users', UserSchema);