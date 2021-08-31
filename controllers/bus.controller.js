const Bus = require('../models/Bus');

exports.addBus = async (req, res) => {
  const {
    source, timeTakenInMinutes, destination, price,
  } = req.body;
  try {
    const bus = new Bus({
      source, timeTakenInMinutes, destination, price, driver: req.body.driver.id,
    });
    const savedBus = await bus.save();
    res.status(200).send({
      success: true,
      bus: savedBus,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findOneAndDelete({ id: req.body.busID });
    res.status(200).send({
      success: true,
      message: 'Bus deleted successfully',
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

exports.getBus = async (req, res) => {
  try {
    const buses = await Bus.find({ driver: { $in: [req.body.driver.id] } });
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
};

exports.editBus = async (req, res) => {
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
};
