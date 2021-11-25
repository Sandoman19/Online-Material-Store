const User = require('./User');
const Product = require('./Product');
const Brand = require('./Brand');
const Material = require('./Material');

Product.hasMany(Brand, {
  foreignKey: 'product_id',
});

Brand.hasMany(Material, {
  foreignKey: 'product_id',
});

Brand.belongsTo(Product, {
  foreignKey: 'brand_id',
});

Material.belongsTo(Brand, {
  foreignKey: 'brand_id',
});

module.exports = { User, Product, Material, Brand };