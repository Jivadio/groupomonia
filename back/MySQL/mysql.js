const { Sequelize } = require('sequelize');

const mysql = new Sequelize('groupomonia', 'root', 'root', {
  host: 'localhost',
  port: '8889',
  dialect: 'mysql',
});

const connecting = async () => {
	try {
		await mysql.authenticate();
		console.log('Database connected');
		return mysql;
	} catch {
		console.error('Database connection failed');
	}
};

module.exports = { connecting, mysql };
