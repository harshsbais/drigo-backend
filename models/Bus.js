const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  source: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  destination: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  prices: {
    type: Number,
    required: true,
  },
  timeTakenInMinutes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Bus', BusSchema);
