const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address'],
    select: false,
  },
  password: {
    type: String,
    required: true,
    min: [8, 'Minimum password length should be 8'],
    select: false,
  },
});

module.exports = mongoose.model('Driver', DriverSchema);
