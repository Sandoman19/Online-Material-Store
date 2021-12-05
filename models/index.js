const User = require("./User");
const Product = require("./Product");
const Material = require("./Material");

Product.hasMany(Material, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});

Material.belongsTo(Product, {
  foreignKey: "product_id",
});

module.exports = { User, Product, Material };
