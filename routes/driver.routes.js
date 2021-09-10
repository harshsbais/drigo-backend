const router = require('express').Router();
const verifyDriver = require('../middleware/verifyDriver');
const {
  getSales, getProfile, updateProfile,
} = require('../controllers/driver.controller');

router.get('/profile', verifyDriver, getProfile);
router.put('/profile', verifyDriver, updateProfile);
router.get('/sales', verifyDriver, getSales);

module.exports = router;
