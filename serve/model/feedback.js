const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedback = sequelize.define(
  'feedback',
  {
    // 在这里定义模型属性
    feedback_id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = Feedback;

//test
// (async function () {
//     const jane = await Feedback.create({
//         comment: 'aaaa',
//     });
//
//     // await jane.save();
// })();
