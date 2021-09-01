const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  driver: {
    type: mongoose.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  bus: {
    type: mongoose.Types.ObjectId,
    ref: 'Bus',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Purchase', PurchaseSchema);
