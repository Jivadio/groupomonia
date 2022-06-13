const {
  postModel,
  commentModel,
  likeModel
} = require('../models/Model');
const fs = require('fs');
const base64Img = require('base64-img');
const jwt = require('jsonwebtoken');
const fileSystem = require('fs');

exports.getAllPost = (req, res, next) => {
  postModel.findAll({
      include: [commentModel, likeModel],
      order: [
        ['id', 'DESC'],
      ],
    })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
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

exports.getComments = (req, res, next) => {
  const postId = req.body.postId;
  commentModel.findAll({
      where: {
        postId: postId
      },
      order: [
        ['id', 'DESC'],
      ],
    })
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      console.log(error);
    });
}

exports.createComment = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const pseudo = decodedToken.username;

  const postId = req.body.postId;
  const content = req.body.content;

  const comment = commentModel.create({
      content: content,
      createBy: pseudo,
      postId: postId,
    })
    .then(() => {
      res.status(201).json({
        message: 'Commentaire créé !',
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Erreur lors de la création du commentaire",
        error: error
      });
    });
}

exports.createLike = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const pseudo = decodedToken.username;

  const postId = req.body.postId;
  const typeLike = req.body.type;

  switch (typeLike) {
    case 1:
      const like = likeModel.create({
          userId: pseudo,
          postId: postId,
        })
        .then(() => {
          res.status(201).json({
            message: 'Like créé !',
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Erreur lors de la création du like",
            error: error
          });
        });
      break;

    case 0:
      likeModel.destroy({
          where: {
            userId: pseudo,
            postId: postId,
          }
        })
        .then(() => {
          res.status(201).json({
            message: 'Like supprimé !',
          });
        })
        .catch(error => {
          res.status(500).json({
            message: "Erreur lors de la suppression du like",
            error: error
          });
        });
      break;

    default:
      break;
  }
}

exports.getLike = (req, res, next) => {
  const postId = req.body.postId;
  likeModel.findAll({
      where: {
        postId: postId
      },
      order: [
        ['id', 'DESC'],
      ],
    })
    .then(like => {
      res.status(200).json(like);
    })
    .catch(error => {
      console.log(error);
    });
}

exports.deletePost = (req, res, next) => {
  const postId = req.body.postId;
  let imgLink = '';

  postModel.findOne({
      where: {
        id: postId
      }
    })
    .then(post => {
      if (post.image) {
        imgLink = post.image.split('/images/')[1];
      }
      postModel.destroy({
          where: {
            id: postId
          }
        })
        .then(() => {
          commentModel.destroy({
              where: {
                postId: postId
              }
            })
            .then(() => {
              likeModel.destroy({
                  where: {
                    postId: postId
                  }
                })
                .then(() => {
                  res.status(201).json({
                    message: 'Post supprimé !',
                  });
                  if (imgLink) {
                    fileSystem.unlink('./images/' + imgLink, (err) => {
                      if (err) {
                        console.log(err);
                      }
                    });
                  }
                })
                .catch(error => {
                  res.status(500).json({
                    message: "Erreur lors de la suppression du post",
                    error: error
                  });
                });
            })
            .catch(error => {
              res.status(500).json({
                message: "Erreur lors de la suppression du post",
                error: error
              });
            });
        })
        .catch(error => {
          res.status(500).json({
            message: "Erreur lors de la suppression du post",
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Erreur lors de la suppression du post",
        error: error
      });
    });
}

exports.editPost = (req, res, next) => {
  const postId = req.body.postId;
  const content = req.body.content;
  const image = req.body.image;

  if (image) {
    base64Img.img(image, './images/', Date.now(), function (err, filepath) {
      const pathArr = filepath.split('/');
      const fileName = pathArr[pathArr.length - 1];
      const url = 'http://localhost:3001/images/' + fileName;

      postModel.findOne({
          where: {
            id: postId
          }
        })
        .then(post => {
          if (post.image) {
            fileSystem.unlink('./images/' + post.image.split('/images/')[1], (err) => {
              if (err) {
                console.log(err);
              }
            });
          }
          postModel.update({
              content: content,
              image: url
            }, {
              where: {
                id: postId
              }
            })
            .then(() => {
              res.status(201).json({
                message: 'Post modifié !',
                url: url
              });
            })
            .catch(error => {
              res.status(500).json({
                message: "Erreur lors de la modification du post",
                error: error
              });
            });
        });
    });
  } else {
    postModel.update({
        content: content
      }, {
        where: {
          id: postId
        }
      })
      .then(() => {
        res.status(201).json({
          message: 'Post modifié !',
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Erreur lors de la modification du post",
          error: error
        });
      });
  }
}
