const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    // define columns for the tag table
    id: {
      type: DataTypes.INTEGER, //set the data type to integer
      allowNull: false, // dissallow null values
      primaryKey: true, // set as the primary key
      autoIncrement: true, // automatically increment the value for each new record
    },
    tag_name: {
      type: DataTypes.STRING, // set the data type to string
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
