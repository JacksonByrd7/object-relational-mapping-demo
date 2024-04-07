const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // Define coloumns for the product_tag table
    id: {
      type: DataTypes.INTEGER, // Set the data types to INTEGER
      allowNull: false, //disallow null values
      primaryKey: true, //set the primary key
      autoIncrement: true, //automatically incremement the value for each new record
    },
    tag_id: {
      type: DataTypes.INTEGER, //set the data type to INTEGER
      references: {
        model: 'tag', // references the tag table
        key: 'id', //references the id coloumn in the tag table
      },
    },
  },
  product_id: {
    type: DataTypes.INTEGER, //set the data type to integer
    references: {
      model: 'product', //reference the product table
      key: 'id', //reference the id column in the product table
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;