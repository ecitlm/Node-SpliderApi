const starDetailOrm = require('@/src/config/orm');
const { DataTypes } = require('sequelize');
const starDetail = starDetailOrm.define(
  'starDetail',
  {
    date: {
      type: DataTypes.STRING
    },
    consName: {
      type: DataTypes.STRING
    },
    today: {
      type: DataTypes.TEXT
    },
    tomorrow: {
      type: DataTypes.TEXT
    },
    week: {
      type: DataTypes.TEXT
    },
    month: {
      type: DataTypes.TEXT
    },
    year: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'star_detail',
    deletedAt: false,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = starDetail;
