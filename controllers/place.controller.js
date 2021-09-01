const Place = require('../models/Place');

exports.addPlace = async (req, res) => {
  try {
    const savedPlace = await Place.findOneAndUpdate({ name: req.body.name }, { name: req.body.name }, { new: true, upsert: true });
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

exports.getPlaces = async (req, res) => {
  try {
    const places = await Place.find({});
    res.status(200).send({
      success: true,
      message: 'Place saved successfully',
      places,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
