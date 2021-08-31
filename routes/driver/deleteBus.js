const router = require('express').Router();
const Bus = require('../../models/Bus');

router.delete('/', async (req, res) => {
  try {
    const bus = Bus.find({ id: req.body.busID });
    if (!bus) {
      res.status(404).send({
        success: false,
        message: 'Bus not found',
      });
    }
    const deletedBus = await bus.delete();
    res.status(204).send({
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
