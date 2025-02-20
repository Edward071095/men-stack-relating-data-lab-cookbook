const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  pantry: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  foods: [foodSchema], // embedding the applicationSchema here

});

const User = mongoose.model('User', userSchema);

module.exports = User;
