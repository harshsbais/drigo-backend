const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
    const user = await User.findOne({ id: verified });
    req.body.user = user;
    next();
  } catch (err) {
    res.status(403).send({
      success: false,
      message: 'Access Denied',
    });
  }
};
