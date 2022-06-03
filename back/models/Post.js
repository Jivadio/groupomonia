const {
  mysql
} = require('../MySQL/mysql');
const {
  DataTypes
} = require('sequelize');

const Post = mysql.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createBy: {
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

Post.sync(); 

module.exports = Post;
