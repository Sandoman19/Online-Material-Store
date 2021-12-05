// const brandData = require("./brandData.json");
const productData = require("./productData.json");
const materialData = require("./materialData.json");
const userData = require("./userDate.json");

const sequelize = require("../config/connection");
const { Product, Material } = require("../models");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error(error);
  }

  try {
    await Product.bulkCreate(productData, {
      individualHooks: true,
      returning: true,
    });
  } catch (error) {
    console.error(error);
  }

  try {
    await Material.bulkCreate(materialData, {
      individualHooks: true,
      returning: true,
    });
  } catch (error) {
    console.error(error);
  }

  process.exit(0);
};

seedAll();
