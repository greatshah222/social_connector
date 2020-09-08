const express = require('express');

const { check } = require('express-validator');

const {
  signup,
  login,
  logout,
  isLoggedIn,
} = require('../controllers/userController');

const router = express.Router();
router.post(
  '/signup',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please provide a Valid Email').isEmail(),
    check(
      'password',
      'Please enter a password of at-least 8 Character'
    ).isLength({ min: 8 }),
  ],
  signup
);
router.post(
  '/login',
  [
    check('email', 'Please provide a Valid Email').isEmail(),
    check('password', 'Please enter a password').exists(),
  ],
  login
);
router.get('/logout', logout);
router.get('/token', isLoggedIn);

module.exports = router;
