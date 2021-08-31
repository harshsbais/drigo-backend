const router = require('express').Router();
const User = require('../../models/User');

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.body.id });
    if (!user) {
      res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).send({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
