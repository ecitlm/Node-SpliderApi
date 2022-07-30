const idiomOrm = require('@/src/config/orm');
const { DataTypes } = require('sequelize');

const idiom = idiomOrm.define(
  'idiom',
  {
    derivation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    example: {
      type: DataTypes.STRING,
      allowNull: false
    },
    explanation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pinyin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    word: {
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'idiom',
    deletedAt: false,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = idiom;
