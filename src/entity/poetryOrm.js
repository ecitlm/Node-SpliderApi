const poetryOrm = require('@/src/config/orm');
const { DataTypes } = require('sequelize');
const Tang300 = poetryOrm.define(
  'Tang300',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'tang300',
    deletedAt: false,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Tang300;
