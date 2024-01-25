const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    //define the 'id' coloumn
    id: {
      type: DataTypes.INTEGER, //Set the data type ot INTEGER
      allowNull: false, //does not allow NULL vlaues
      primaryKey: true, //set the primary key
      autoIncrement: true, //Automatically increment the value for each new record
    },
    // Define the 'category_name' coloumn
    category_name: {
      type: DataTypes.STRING, //set the data type to STRING
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
