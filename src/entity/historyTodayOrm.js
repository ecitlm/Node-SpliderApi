const historyTodayOrm = require('@/src/config/orm');
const { DataTypes } = require('sequelize');
const HisToday = historyTodayOrm.define(
  'HisToday',
  {
    date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rich_text: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'his_today',
    deletedAt: false,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = HisToday;
