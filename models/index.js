const User = require("./User");
const Product = require("./Product");
const Brand = require("./Brand");
const Material = require("./Material");

// Brand.hasMany(Product, {
//   foreignKey: "brand_id",
// });

// Product.belongsTo(Brand, {
//   foreignKey: "brand_id",
// });

Product.hasMany(Material, {
  foreignKey: "product_id",
  onDelete: "CASCADE"
});

Material.belongsTo(Product, {
  foreignKey: "product_id",
});

module.exports = { User, Product, Material };
