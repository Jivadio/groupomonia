const commentModel = require('./Comment');
const postModel = require('./Post');
const userModel = require('./User');

const {
  mysql
} = require('../MySQL/mysql');

const loadModel = async () => {
  try {
    postModel.hasMany(commentModel);
    commentModel.belongsTo(postModel);

    mysql.sync();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {loadModel, userModel, postModel, commentModel};
