const router = require('express').Router();
const Bus = require('../../models/Bus');

router.post('/', async (req, res) => {
  const {
    source, timeTakenInMinutes, destination, price,
  } = req.body;
  try {
    const bus = new Bus({
      source, timeTakenInMinutes, destination, price, driver: req.driver.id,
    });
    const savedBus = await bus.save();
    res.status(200).send({
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
