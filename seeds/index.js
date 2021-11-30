// const brandData = require("./brandData.json");
const materialData = require("./materialData.json");
const productData = require("./productData.json");
const userData = require("./userDate.json");
const productMaterialData = require("./productMaterial.json");

const sequelize = require("../config/connection");
const {
  User,
  // Brand,
  Material,
  Product,
  ProductMaterial,
} = require("../models");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error(error);
  };

  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  } catch (error) {
    console.error(error);
  };

  // await Brand.bulkCreate(brandData, {
  //   individualHooks: true,
  //   returning: true,
  // });
  try{
    await Product.bulkCreate(productData, {
      individualHooks: true,
      returning: true,
    });;
  } catch (error) {
    console.error(error);
  };

  try{
    await Material.bulkCreate(materialData, {
      individualHooks: true,
      returning: true,
    });
  } catch (error) {
    console.error(error);
  };

  try{
    await ProductMaterial.bulkCreate(productMaterialData, {
      individualHooks: true,
      returning: true,
    });
  } catch (error) {
    console.error(error);
  };
  
  process.exit(0);
};

seedAll();
