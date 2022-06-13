const commentModel = require('./Comment');
const postModel = require('./Post');
const userModel = require('./User');
const likeModel = require('./Like');

const {
  mysql
} = require('../MySQL/mysql');

const loadModel = async () => {
  try {
    postModel.hasMany(commentModel);
    commentModel.belongsTo(postModel);

    postModel.hasMany(likeModel);
    likeModel.belongsTo(postModel);

    mysql.sync();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {loadModel, userModel, postModel, commentModel, likeModel};
