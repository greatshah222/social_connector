const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const User = require('../modals/userModal');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  const { name, email, password, passwordConfirm } = req.body;
  // if there is any error from the validation we will get this in our array
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let user = await User.findOne({ email });
  if (user) {
    // matching error with expres--validator
    return res.status(400).json({
      errors: [{ msg: 'User already exists' }],
    });
  }
  // s means size, r(pg) means no naked image and d means it will give u some default value if the there is no avatar
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm',
  });
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    avatar,
  });
  createSendToken(newUser, 201, res);
};
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.checkUserAndDBPassword(password, user.password))) {
    return res.status(400).json({
      errors: [{ msg: 'Invalid Credential' }],
    });
  }
  createSendToken(user, 200, res);
};
exports.protect = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      msg: 'please log in to have access',
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      msg: 'the user no longer exists',
    });
  }
  req.user = currentUser;
  next();
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 0.2 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};
