// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Products belong in Categories
Product.belongsTo(Category, {
  foreignKey: 'category_id', // The foreign key in the product model
});

// a product belongs to many tags through the productTag model
Product.belongsToMany(Tag, {
  through: ProductTag, // the intermediate model
  foreignKey: 'product_id', // The foreign key in the product model
});

// A tag belongs to many products through the productTag model
Tag.belongsToMany(Product, {
  through: ProductTag, //the intermediate model
  foreignKey: 'tag_id', // The foreign key in the tag model
});

// A category has many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // the foreign key in the product model
});

//Export models
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
