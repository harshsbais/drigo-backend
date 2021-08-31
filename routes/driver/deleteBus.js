const router = require('express').Router();
const Bus = require('../../models/Bus');

router.delete('/', async (req, res) => {
  try {
    const bus = Bus.findOneAndDelete({ id: req.body.busID });
    res.status(200).send({
      success: true,
      message: 'Bus deleted successfully',
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
