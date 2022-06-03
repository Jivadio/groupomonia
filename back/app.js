const express = require('express');
const app = express();

const cors = require('cors');
const { connecting } = require('./MySQL/mysql');
const bodyParser = require('body-parser');

const path = require('path');

const userRoutes = require('./routes/auth');
const userPost = require('./routes/post');

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

app.use(bodyParser.json({limit: '50mb'}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use(express.urlencoded({
  extended: false
}));

app.use('/api/auth', userRoutes);
app.use('/api/post', userPost);


module.exports = app;
