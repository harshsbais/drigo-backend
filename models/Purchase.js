const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  driver: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  bus: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
