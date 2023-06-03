const { Sequelize } = require('sequelize');

//     storage: 'cloud_bs:^_$123Clouder#?@tcp(43.143.226.131:3306)/cloud_bs?charset=utf8mb4&parseTime=true&loc=Local'
const sequelize = new Sequelize({
  dialect: 'mysql',
  dialectOptions: {
    host: '', // 43.0.0.131
    port: 3306,
    user: '',
    database: '',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
});

// test connect
(async function () {
  try {
    await sequelize.authenticate();
    console.log('Mysql Connection has been established successfully.');
  } catch (error) {
    console.error('Mysql Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
