const router = require('express').Router();
const Purchase = require('../../models/Purchase');

router.get('/sales', async (req, res) => {
  try {
    let sales;
    if (req.body.busID) {
      sales = await Purchase.findAll({ bus: req.body.busID });
    } else {
      sales = await Purchase.findAll({ driver: req.body.driver.id });
    }
    res.status(200).send({
      success: true,
      sales,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
