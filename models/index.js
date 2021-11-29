const User = require("./User");
const Product = require("./Product");
const Brand = require("./Brand");
const Material = require("./Material");
const ProductMaterial = require("./ProductMaterial");

// Brand.hasMany(Product, {
//   foreignKey: "brand_id",
// });

// Product.belongsTo(Brand, {
//   foreignKey: "brand_id",
// });

Product.hasMany(Material, {
  foreignKey: "product_id",
});

Material.belongsToMany(Product, {
  through: {
    model: ProductMaterial,
    unique: false,
  },
  as: "product_material",
});

module.exports = { User, Product, Material, ProductMaterial };
