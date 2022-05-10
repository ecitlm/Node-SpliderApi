const orm = require('@/src/config/orm');
const { DataTypes } = require('sequelize');
const User = orm.define(
  'User',
  {
    // 在这里定义模型属性
    loginName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chineseName: {
      type: DataTypes.STRING
      // allowNull 默认为 true
    }
  },
  {
    tableName: 'user',
    deletedAt: false,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = User;
