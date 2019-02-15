'use strict';

// modules
const express = require('express'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  app = express(),
  session = require('express-session'),
// define routes
  clients = require('./routes/clients'),
  admin = require('./routes/admin'),
  auth = require('./routes/auth');

/* 
  middlewares
*/
// session
app.use(session({
  secret: 'hello-world',
	resave: false,
	saveUninitialized: false,
  // httpOnly: true,
  secure: false,
  maxAge: null
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.use('/clients', clients);
app.use('/admin', admin);
app.use('/auth', auth);

/* 
  errors
*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not-found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});

module.exports = app;
