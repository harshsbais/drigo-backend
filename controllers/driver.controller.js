const Purchase = require('../models/Purchase');
const Driver = require('../models/Driver');

exports.getProfile = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      driver: req.driver,
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
    const savedDriver = await Driver.findOneAndUpdate({ id: req.driver.id }, req.body);
    res.status(200).send({
      success: true,
      driver: savedDriver,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.getSales = async (req, res) => {
  try {
    let sales;
    if (req.body.busID) {
      sales = await Purchase.find({ $and: [{ bus: { $in: [req.body.busID] } }, { driver: { $in: [req.driver.id] } }] }).populate('customer driver bus');
    } else {
      sales = await Purchase.find({ driver: { $in: [req.driver.id] } }).populate('customer driver bus');
    }
    res.status(200).send({
      success: true,
      sales,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
