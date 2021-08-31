const router = require('express').Router();
const verifyUser = require('../middleware/verifyUser');
const { getProfile, updateProfile, getPurchases } = require('../controllers/user.controller');

router.get('/profile', verifyUser, getProfile);
router.put('/profile', updateProfile);
router.get('/purchases', verifyUser, getPurchases);

module.exports = router;
