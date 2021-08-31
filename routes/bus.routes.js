const router = require('express').Router();
const verifyDriver = require('../middleware/verifyDriver');
const {
  getBus, editBus, deleteBus, addBus,
} = require('../controllers/bus.controller');

router.get('/', verifyDriver, getBus);
router.post('/', verifyDriver, addBus);
router.put('/', verifyDriver, editBus);
router.delete('/', verifyDriver, deleteBus);

module.exports = router;
