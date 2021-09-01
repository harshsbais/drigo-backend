const router = require('express').Router();
const { addPlace, getPlaces } = require('../controllers/place.controller');

router.post('/', addPlace);
router.get('/', getPlaces);
module.exports = router;
