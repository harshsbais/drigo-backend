const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Driver = require('../models/Driver');

const getUserObjectWithPassword = async (token) => {
  if (!token) {
    return false;
  }
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const user = await User.findOne({ id: verified }).select('password email');
  return user;
};

const getDriverObjectWithPassword = async (token) => {
  if (!token) {
    return false;
  }
  const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  const driver = await Driver.findOne({ id: verified }).select('password email');
  return driver;
};

module.exports = { getUserObjectWithPassword, getDriverObjectWithPassword };
