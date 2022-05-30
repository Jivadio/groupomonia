const express = require('express');
const app = express();

const cors = require('cors');
const { connecting } = require('./MySQL/mysql');

const userRoutes = require('./routes/auth');

require('dotenv').config();

connecting();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

app.use('/api/auth', userRoutes);

module.exports = app;
