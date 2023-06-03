const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Song = sequelize.define(
  'song',
  {
    // 在这里定义模型属性
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consuming: {
      type: DataTypes.INET,
    },
    created_at: {
      type: DataTypes.DATE,
      // allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      // allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    // 想要 updatedAt 但是希望名称叫做 updateTimestamp
    updatedAt: 'updated_at',
  }
);

module.exports = Song;

// test
// (async function () {
//     const jane = await Song.create({
//         title: 'aaa.mp3',
//         size: 2000,
//         url: '11111111',
//         consuming: 1000,
//     });
//
//     // await jane.save();
// })();
