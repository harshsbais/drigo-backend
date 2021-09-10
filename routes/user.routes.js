const router = require('express').Router();
const verifyUser = require('../middleware/verifyUser');
const {
  getProfile, updateProfile, getPurchases, getBusByUser,
} = require('../controllers/user.controller');

/**
 * @swagger
 * /api/user/profile:
 *  get:
 *   description: Get profile of the user
 *   responses:
 *    '200':
 *     description: Successfully get profile
 *   security:
 *    bearerAuth: []
 */

router.get('/profile', verifyUser, getProfile);
router.put('/profile', verifyUser, updateProfile);
router.get('/buses', verifyUser, getBusByUser);
router.get('/purchases', verifyUser, getPurchases);

module.exports = router;
