// const brandData = require("./brandData.json");
const materialData = require("./materialData.json");
const productData = require("./productData.json");
const userData = require("./userDate.json");
const productMaterialData = require("./productMaterial.json");

const sequelize = require("../config/connection");
const {
  User,
  Brand,
  Material,
  Product,
  ProductMaterial,
} = require("../models");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // await Brand.bulkCreate(brandData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });
  await Material.bulkCreate(materialData, {
    individualHooks: true,
    returning: true,
  });

  await ProductMaterial.bulkCreate(productMaterialData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedAll();
