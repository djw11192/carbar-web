const
  mongoose = require('mongoose'),
  bcrypt=require('bcrypt-nodejs')

// Set schema for users
  userSchema = mongoose.Schema({
    local: {
      first_name: {type: String},
      last_name: {type: String},
      email: {type: String, unique: true, required: true},
      password: {type: String, required: true},
      fullShipping: {type: String},
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone: {type: String},
      orders: [
        {order: {type: mongoose.Schema.Types.ObjectId, ref: 'Order'}}
      ],
      resetPasswordToken: String,
      resetPasswordExpires: Date
    }

  },
  {
    timestamps: true
  })
// end of model


userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}

//** rehash password when edit update complete
userSchema.pre('save', function(next){
  if(!this.isModified('local.password')) return next()
  this.local.password = this.generateHash(this.local.password)
  next()
})


// Save the schema as a model
const User = mongoose.model('User', userSchema)

module.exports = User
