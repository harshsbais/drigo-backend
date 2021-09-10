const bcrypt = require('bcryptjs');
const Purchase = require('../models/Purchase');
const Driver = require('../models/Driver');
const { getDriverObjectWithPassword } = require('../helpers/auth.helper');

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
    const token = req.header('Authorization');
    const driver = await getDriverObjectWithPassword(token);
    if (req.body.password) {
      const validPassword = await bcrypt.compare(req.body.oldPassword, driver.password);
      if (!validPassword) {
        res.status(401).send({
          success: false,
          message: 'Invalid Old Password',
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(driver.password, salt);
        req.body.password = hashPassword;
        const savedDriver = await Driver.findOneAndUpdate({ id: driver.id }, req.body);
        res.status(200).send({
          success: true,
          driver: savedDriver,
        });
      }
    } else {
      const savedDriver = await Driver.findOneAndUpdate({ id: driver.id }, req.body);
      res.status(200).send({
        success: true,
        driver: savedDriver,
      });
    }
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
