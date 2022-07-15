const userModel = require('../models/user');

exports.getUsers = (req, res, next) => {
  userModel.findAll({
      order: [
        ['id', 'DESC'],
      ],
    })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
    });
}
