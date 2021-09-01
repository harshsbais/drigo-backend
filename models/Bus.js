const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  source: {
    type: mongoose.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  destination: {
    type: mongoose.Types.ObjectId,
    ref: 'Place',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timeTakenInMinutes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Bus', BusSchema);
