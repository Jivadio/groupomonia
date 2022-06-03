const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let loadedUser;

exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = userModel.create({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      })
      .then(() => {
        res.status(201).json({
          message: 'Utilisateur créé !'
        });

        loadedUser = user;
      })
      .catch(error => {
        res.status(500).json({
          message: "Erreur lors de la création de l'utilisateur"
        });
      });
  });
};

exports.login = (req, res, next) => {
  userModel.findOne({
      where: {
        pseudo: req.body.pseudo
      }
    }).then(user => {
      if (!user) {
        return res.status(401).json({
          message: "L'utilisateur n'existe pas"
        });
      }

      bcrypt.compare(req.body.password, user.password).then(valid => {
        if (!valid) {
          return res.status(401).json({
            message: "Mot de passe incorrect"
          });
        }

        loadedUser = user;

        const token = jwt.sign({
            userId: user.id,
            username: user.pseudo,
          },
          'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
          }
        )

        console.log(token);

        res.status(200).json({
          userId: user.id,
          token: token
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Erreur lors de la création de l'utilisateur"
      });
    });
}

exports.getUser = (req, res, next) => {
  res.status(200).json({
    user: {
      id: loadedUser._id,
      email: loadedUser.email,
      pseudo: loadedUser.pseudo,
    },
  });
}
