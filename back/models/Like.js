const {
  mysql
} = require('../MySQL/mysql');
const {
  DataTypes
} = require('sequelize');

const Like = mysql.define('like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: mysql.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: mysql.literal('CURRENT_TIMESTAMP')
  }
});

module.exports = Like;
