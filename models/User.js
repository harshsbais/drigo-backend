const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    min: [8, 'Minimum password length should be 8'],
  },
});

module.exports = mongoose.model('User', UserSchema);
