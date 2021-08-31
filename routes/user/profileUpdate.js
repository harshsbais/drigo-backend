const router = require('express').Router();
const User = require('../../models/User');

router.put('/profile', async (req, res) => {
  try {
    const savedUser = await User.findOneAndUpdate({ id: req.body.id }, req.body);
    res.status(200).send({
      success: true,
      savedUser,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
