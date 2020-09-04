const express = require('express');
const { protect } = require('../controllers/userController');
const router = express.Router();
// @route   GET api/v1/auth
// @desc    test route
// @access  Public
router.get('/', protect, (req, res) => res.send('auth route'));

module.exports = router;
