const router = require('express').Router();
const Bus = require('../../models/Bus');

router.put('/', async (req, res) => {
  try {
    const savedBus = await Bus.findOneAndUpdate({ id: req.body.id }, req.body);
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
