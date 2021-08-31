const Place = require('../models/Place');

exports.addPlace = async (req, res) => {
  try {
    const place = new Place({
      name: req.body.name,
    });
    const savedPlace = await place.save();
    res.status(200).send({
      success: true,
      message: 'Place saved successfully',
      place: savedPlace,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};