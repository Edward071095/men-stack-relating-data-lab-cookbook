const mongoose = require('mongoose');

const pantrySchema = new mongoose.Schema({
  food: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  seasoning: {
    type: String,
    required: true,
  },
  drinkWith: {
    type: String,
    enum: ['milk', 'juice', 'water'],
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
  pantry: [pantrySchema], // embedding the applicationSchema here

});

const User = mongoose.model('User', userSchema);

module.exports = User;
