const router = require('express').Router();
const Purchase = require('../../models/Purchase');

router.get('/purchases', async (req, res) => {
  try {
    let purchases;
    if (req.body.busID) {
      purchases = await Purchase.findAll({ bus: req.body.busID });
    } else {
      purchases = await Purchase.findAll({ user: req.body.user.id });
    }
    res.status(200).send({
      success: true,
      purchases,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
