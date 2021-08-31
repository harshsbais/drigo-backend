const router = require('express').Router();
const Bus = require('../../models/Bus');

router.put('/', async (req, res) => {
  try {
    let bus = await Bus.find({ id: req.body.id });
    bus = { ...bus, ...req.body };
    const savedBus = await bus.save();
    res.status(204).send({
      success: true,
      savedBus,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
