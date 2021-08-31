const jwt = require('jsonwebtoken');
const Driver = require('../models/Driver');

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(403).send({
      success: false,
      message: 'Access Denied',
    });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const driver = await Driver.findOne({ id: verified });
    req.body.driver = driver;
    next();
  } catch (err) {
    res.status(403).send({
      success: false,
      message: 'Access Denied',
    });
  }
};
