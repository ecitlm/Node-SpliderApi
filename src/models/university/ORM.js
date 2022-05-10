const orm = require('@/src/config/orm');
const { DataTypes } = require('sequelize');
// eslint-disable-next-line no-unused-vars
const University = orm.define(
  'university',
  {
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    schoolname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    department: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    link: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'university',
    deletedAt: false,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = University;
