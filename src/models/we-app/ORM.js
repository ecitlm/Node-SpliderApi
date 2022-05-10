const orm = require('@/src/config/orm');
const { DataTypes } = require('sequelize');
const wxUser = orm.define(
  'wxUser',
  {
    avatarUrl: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    province: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    nickName: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    language: {
      type: DataTypes.STRING
    },
    openid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'wx_user',
    deletedAt: false,
    createdAt: true,
    updatedAt: false
  }
);

module.exports = wxUser;
