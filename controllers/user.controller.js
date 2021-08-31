const User = require('../models/User');
const Purchase = require('../models/Purchase');

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
      purchases = await Purchase.findAll({ bus: req.body.busID });
    } else {
      purchases = await Purchase.findAll({ user: req.body.user.id });
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
