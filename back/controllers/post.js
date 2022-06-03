const postModel = require('../models/post');
const userModel = require('../models/user');
const fs = require('fs');
const base64Img = require('base64-img');
const jwt = require('jsonwebtoken');

exports.getAllPost = (req, res, next) => {
  postModel.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: "Erreur lors de la récupération des posts",
        error: error
      });
    });
}

exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  const pseudo = decodedToken.username;

  const image = req.body.image;
  const content = req.body.content;

  if (!image) {
    const post = postModel.create({
        content: req.body.content,
        createBy: pseudo,
      })
      .then(() => {
        res.status(201).json({
          message: 'Post créé !',
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Erreur lors de la création du post",
          error: error
        });
      });
  } else {
    base64Img.img(image, './images/', Date.now(), function (err, filepath) {
      const pathArr = filepath.split('/');
      const fileName = pathArr[pathArr.length - 1];
      const url = 'http://localhost:3001/images/' + fileName;

      const post = postModel.create({
          content: req.body.content,
          createBy: pseudo,
          image: url
        })
        .then(() => {
          res.status(201).json({
            message: 'Post créé !',
            url: url
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Erreur lors de la création du post",
            error: error
          });
        });
    });
  }
}
