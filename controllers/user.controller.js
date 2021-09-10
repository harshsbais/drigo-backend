const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Bus = require('../models/Bus');
const { getUserObjectWithPassword } = require('../helpers/auth.helper');

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
    const token = req.header('Authorization');
    const user = await getUserObjectWithPassword(token);
    if (req.body.password) {
      const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!validPassword) {
        res.status(401).send({
          success: false,
          message: 'Invalid Old Password',
        });
      } else {
        const savedUser = await User.findOneAndUpdate({ id: user.id }, req.body);
        res.status(200).send({
          success: true,
          user: savedUser,
        });
      }
    } else {
      const savedUser = await User.findOneAndUpdate({ id: user.id }, req.body);
      res.status(200).send({
        success: true,
        user: savedUser,
      });
    }
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
      purchases = await Purchase.find({ $and: [{ bus: { $in: [req.body.busID] } }, { customer: { $in: [req.user.id] } }] }).populate('customer driver bus');
    } else {
      purchases = await Purchase.find({ user: { $in: [req.user.id] } }).populate('customer driver bus');
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
  await Bus.populate(buses, {
    path: 'driver source destination',
    populate: {
      path: 'driver source destination',
    },
  });
  res.status(200).send({
    buses,
  });
};
