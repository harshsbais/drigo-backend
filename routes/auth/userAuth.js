const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = require('../../models/User');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).send({
        success: false,
        message: 'Invalid Credentials',
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    res.status(200).send({
      success: true,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const emailExists = await UserSchema.findOne({ email });
    if (emailExists) {
      res.status(409).send({
        success: false,
        message: 'Email already exists',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new UserSchema({
      name,
      email,
      password: hashPassword,
    });
    const savedUser = await user.save();
    if (savedUser) {
      res.status(200).send({
        success: true,
        message: 'User Successfully Added',
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
