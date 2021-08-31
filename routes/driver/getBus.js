const router = require('express').Router();
const Bus = require('../../models/Bus');

router.get('/get', async (req, res) => {
  try {
    const buses = await Bus.findAll({ driver: req.body.driver.id });
    res.status(200).send({
      success: true,
      buses,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
