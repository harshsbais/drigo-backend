const router = require('express').Router();
const { addPlace } = require('../controllers/place.controller');

router.post('/', addPlace);

module.exports = router;
