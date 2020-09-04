const express = require('express');
require('express-async-errors');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRouter');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/posts', postRouter);

module.exports = app;
