const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // brand_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "brand",
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
