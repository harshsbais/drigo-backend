const router = require('express').Router();
const verifyDriver = require('../middleware/verifyDriver');
const {
  getBus, getSales, editBus, deleteBus, addBus,
} = require('../controllers/driver.controller');

router.get('/bus', verifyDriver, getBus);
router.post('/bus', verifyDriver, addBus);
router.put('/bus', verifyDriver, editBus);
router.delete('/bus', verifyDriver, deleteBus);
router.get('/sales', verifyDriver, getSales);

module.exports = router;
