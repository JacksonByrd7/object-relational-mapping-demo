// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // Define coloumns for the product table
    id: {
      type: DataTypes.INTEGER, // Set the data type to INTEGER
      allowNull: false, // Does not allow null values
      primaryKey: true, // Set as the primary key
      autoIncrement: true, // Automatically increment the vlaue for each new record
    },
    product_name: {
      type: DataTypes.STRING, //Set the data type to STRING
      allowNull: false, // Does not allow nul values
    },
    price: {
      type: DataTypes.STRING, //set the data type to STRING
      allowNull: false, //does not allow null values
      validate: {
        isDecimal: true, // Validate that the value is a numeric value
      },
    },
    category_id: {
      type: DataTypes.INTEGER, //set the data type to INTEGER
      references: {
        model: 'category', //reference the 'category' table
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
