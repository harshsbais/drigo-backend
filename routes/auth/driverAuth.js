const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DriverSchema = require('../../models/Driver');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const driver = await DriverSchema.findOne({ email });
    if (!driver) {
      res.status(404).send({
        success: false,
        message: 'Driver not found',
      });
    }
    const validPassword = await bcrypt.compare(password, driver.password);
    if (!validPassword) {
      res.status(401).send({
        success: false,
        message: 'Invalid Credentials',
      });
    }
    const token = jwt.sign({ id: driver.id }, process.env.TOKEN_SECRET);
    res.status(200).send({
      success: true,
      name: driver.name,
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
    const emailExists = await DriverSchema.findOne({ email });
    if (emailExists) {
      res.status(409).send({
        success: false,
        message: 'Email already exists',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const driver = new DriverSchema({
      name,
      email,
      password: hashPassword,
    });
    const savedDriver = await driver.save();
    if (savedDriver) {
      res.status(200).send({
        success: true,
        message: 'Driver Successfully Added',
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
