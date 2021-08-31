const router = require('express').Router();
const verifyDriver = require('../middleware/verifyDriver');
const {
  getBus, getSales, editBus, deleteBus, addBus,
} = require('../controllers/driver.controller');

router.get('/', verifyDriver, getBus);
router.post('/', verifyDriver, addBus);
router.put('/', verifyDriver, editBus);
router.delete('/', verifyDriver, deleteBus);
router.get('/sales', verifyDriver, getSales);

module.exports = router;
