const mongoose = require('mongoose');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Bus = require('../models/Bus');

exports.getProfile = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      user: req.user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const savedUser = await User.findOneAndUpdate({ id: req.body.id }, req.body);
    res.status(200).send({
      success: true,
      savedUser,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.getPurchases = async (req, res) => {
  try {
    let purchases;
    if (req.body.busID) {
      purchases = await Purchase.find({ $and: [{ bus: { $in: [req.body.busID] } }, { customer: { $in: [req.body.user.id] } }] }).populate('customer driver bus');
    } else {
      purchases = await Purchase.find({ user: { $in: [req.body.user.id] } }).populate('customer driver bus');
    }
    res.status(200).send({
      success: true,
      purchases,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.getBusByUser = async (req, res) => {
  const buses = await Bus.aggregate([
    {
      $graphLookup: {
        from: 'buses',
        startWith: '$source',
        connectFromField: 'destination',
        connectToField: 'source',
        as: 'connections',
      },
    },
  ]);
  res.status(200).send({
    buses,
  });
};
